import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors,  } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    
  ) {}
  @Post('saveArticle')
  async saveArticle(@Body() body:any){
    console.log('body',body)
        if(!body.title || !body.des || !body.content || !body.tags || !body.author){
              return {error: 'All fields are required'};
        }
    return await this.articlesService.save(body);
  }
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('banner'))
  async uploadImage(@UploadedFile() file: Express.Multer.File){
    return await this.articlesService.createImage(file);
  }
  @Get('getArticles')
  async getArticles(){
    return await this.articlesService.findAll();
  }
  @Get('getArticle/:id')
  async getArticle(@Param('id') id: string){
    return await this.articlesService.findOne({ _id: id });
  }
  @Post('updateArticle/:id')
  async updateArticle(@Param('id') id: string, @Body() body:any){
    return await this.articlesService.update(id,body);
  }
  // @Post('deleteArticle/:id')
  // async deleteArticle(@Param('id') id: string){
  //   return await this.articlesService.delete(id);
  // }
}
