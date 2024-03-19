import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable(
)
export class CommentsService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async save(body:any){
    const createdComment= new this.commentModel(body);
    await createdComment.save();
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

}
