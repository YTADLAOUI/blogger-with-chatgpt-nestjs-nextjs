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
  async findAll(){
    return await this.commentModel.find();
  }
  async findOne(id){
    return await this.commentModel.findOne({ _id: id });
  }
  async update(id,options){
    return await this.commentModel.updateOne({ _id: id },options);
  }

}
