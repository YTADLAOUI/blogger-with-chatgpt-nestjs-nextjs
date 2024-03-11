import { BadRequestException, Injectable } from '@nestjs/common';
import { Article } from './models/article.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { extname } from 'path';


@Injectable()
export class ArticlesService {

  constructor(@InjectModel(Article.name) private articleModel:Model<Article>,private readonly cloudinaryService: CloudinaryService ) {}
  async save(body:any){
    const createdArticle= new this.articleModel(body);
    await createdArticle.save();
    return createdArticle;
  }
  
  async findAll() {
    try {
      let maxLimit = 5;
      const blogs = await this.articleModel
        .find({ draft: false })
        .populate('author',"name email")
        .sort({ publishedAt: -1 })
        .select('title des content tags activity comments id._id publishedAt')
        .limit(maxLimit);

      return blogs ;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching articles:', error);
      // return res.status(500).json({ error: 'Internal Server Error' });
    }
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


   async createImage(file: Express.Multer.File) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const fileExtension = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        'Invalid file type. Only image files are allowed.',
      );
    }

    const result = await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type vbvbvbvb.');
    });
    console.log(result);
    return result.url;
  }
    // async delete(id: string){
    //   return await this.articleModel.deleteOne({ _id: id });
    // }

}
