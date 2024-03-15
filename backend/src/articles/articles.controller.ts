import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors,  } from '@nestjs/common';
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
  @Post('getArticles')
  async getArticles(@Body() body:any){
        const {page} = body;
    return await this.articlesService.findAll(page);
  }
  @Get('getTrendingArticles')
  async getTrendingArticles(){
    return await this.articlesService.trendingBlogs();
  }
    @Post('searchArticles')
  async searchArticles(@Body() body:any){
    const {tag,page} = body;
    console.log(tag)
    const returnData =await this.articlesService.search(tag,page);
    console.log('returnData',returnData)
    return returnData
  }
  @Post('all-latest-blogs')
  async allLatestBlogs(@Body() body:any ,@Res() res:any){
    const count = await this.articlesService.allLatestBlogs();
    return res.status(200).json({totalDocs:count});
  }
  @Post('search-blogs-count')
  async searchBlogsCount(@Body() body:any ,@Res() res:any){
    console.log('body',body)
    const {query} = body;
    const count = await this.articlesService.serchCount(query);
    console.log('count',count)
    return res.status(200).json({totalDocs:count});
  }
  @Get('getArticle/:id')
  async getArticle(@Param('id') id: string){
    return await this.articlesService.findOne({ _id: id });
  }
  @Post('updateArticle/:id')
  async updateArticle(@Param('id') id: string, @Body() body:any){
    return await this.articlesService.update(id,body);
  }
  @Post('articleByAuthor')



  async articleByAuthor(@Body() body:any){
    const {author,page} = body;
    return await this.articlesService.findAutourBlogs('65bb2b207976daa7d11e5140',page);
  }
  @Post('countArticlesAuthor')

  async countArticlesAuthor(@Body() body:any ,@Res() res:any ){
    const {author} = body;
    const count = await this.articlesService.countArticlesAuthor(author);
    return res.status(200).json({totalDocs:count})
  }


  // @Post('deleteArticle/:id')
  // async deleteArticle(@Param('id') id: string){
  //   return await this.articlesService.delete(id);
  // }
}
