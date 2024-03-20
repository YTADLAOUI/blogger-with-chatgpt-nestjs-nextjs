import { Body, Controller, Get, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors,  } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guard/auth.guard';
import CustomRequest from 'src/interface/CustomRequest';
import { use } from 'passport';


@Controller('')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('saveArticle')
  async saveArticle(@Body() body:any ,@Req() req:CustomRequest ,@Res({passthrough:true}) res:Response){
    console.log('body',body)
    console.log('user_id', req.user_id);
    if(!body.title || !body.des || !body.content || !body.tags || !body.author){
      return {error: 'All fields are required'};
    }
    try{
      return await this.articlesService.save(body);
    }catch(e){
      console.log("first")
      return {error: e.message};
    }
  }
  @UseGuards(AuthGuard)
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
  @Post('getArticle')
  async getArticle(@Body() body:any){
    const {id,edit,id_user} = body;
    console.log(id_user,"fghjk")
    return await this.articlesService.findOne({ _id: id },edit,id_user);
  }
  @UseGuards(AuthGuard)
  @Patch('updateArticle')
  async updateArticle( @Body() body:any,@Req() req:Request ,@Res({passthrough:true}) res:Response){
    console.log('body',body)
    const {_id,title,banner,content,tags,des,author} = body;
    return await this.articlesService.update(_id,{title,banner,content,tags,des,author});
  }
  @Post('articleByAuthor')
  async articleByAuthor(@Body() body:any){
    const {author,page} = body;
    console.log('author',author)
    return await this.articlesService.findAutourBlogs(author,page);
  }
  @Post('countArticlesAuthor')
  async countArticlesAuthor(@Body() body:any ,@Res() res:any ){
    const {author} = body;
    const count = await this.articlesService.countArticlesAuthor(author);
    return res.status(200).json({totalDocs:count})
  }
  @UseGuards(AuthGuard)
  @Post('likeArticle')
  async likeArticle(@Body() body:any,@Req() req:CustomRequest ,@Res({passthrough:true}) res:Response){
    const {id_blog,isLike} = body;
    const id_user= req.user_id;
    return await this.articlesService.likeArticle(id_blog,isLike,id_user);
  }
  @UseGuards(AuthGuard)
  @Post('deleteArticle/:id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articlesService.delete(id);
  }
}
