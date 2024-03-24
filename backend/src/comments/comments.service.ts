import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticlesService } from 'src/articles/articles.service';
import { DeleteResult } from 'mongodb';
import { NotificationsService } from 'src/notifications/notifications.service';
@Injectable(
)
export class CommentsService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>,private readonly articleService:ArticlesService,private notificationService:NotificationsService) {}

  async save(body:any){
    const createdComment= new this.commentModel(body);
    await createdComment.save();
    await this.articleService.update(body.article_id,{$inc:{"activity.total_comments":1}});
    await this.notificationService.saveNotification({type:"comment",article:body.article_id,notification_for:body.article_author,user:body.commented_by,comment:createdComment._id});
    return createdComment;
  }
  async findAll({id_article}){
    let maxLimit = 5;
    let page = 1;
    return await this.commentModel.find(id_article).populate('commented_by','username email _id profile_img createdAt').sort({ createdAt: -1 })

    .skip((page - 1) * maxLimit)
    .limit(maxLimit);
  }

  async findOne(id){
    return await this.commentModel.findOne({ _id: id });
  }
  async update(id,options){
    return await this.commentModel.updateOne({ _id: id },options);
  }

  async delete(body): Promise<DeleteResult>{
    console.log("gg",body,'ggg')
   const fn= await this.commentModel.deleteOne({ _id: body.id_comment });
   const incr=await this.articleService.update(body.article_id,{$inc:{"activity.total_comments":-1}});
   console.log("gg",incr,'ggg')
   return fn;
  }
  

}
