import { Injectable } from '@nestjs/common';
import { Article } from './models/article.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ArticlesService {

  constructor(@InjectModel(Article.name) private articleModel:Model<Article> ) {}
  async save(body:any){
    const createdArticle= new this.articleModel(body);
    await createdArticle.save();
    return createdArticle;
  }
  async findAll(){
    return await this.articleModel.find().populate('author');
  }
  async findOne(id){
    try {
    let incrmentVal = 1;

    return await this.articleModel.findOneAndUpdate(id,{$inc:{"activity.total_reads":incrmentVal}}).populate('author',"name email").select('title des content tags activity comments id._id')
    
        }catch(e){
      console.log('error',e)
    } 
  }


   async update(id,options){
    return await this.articleModel.updateOne({ _id: id },options);
   }
    // async delete(id: string){
    //   return await this.articleModel.deleteOne({ _id: id });
    // }

}
