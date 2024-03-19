import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService:CommentsService) {}

  @Post('saveComment')
  async saveComment(@Body() body:any){
    try{
      if(!body.article_id || !body.comment || !body.article_author || !body.commented_by ){
  
        return {error: 'All fields are required'};
      }
      return await this.commentsService.save(body);
    }catch(e){
      return {error: e.message};
    }
  }
  @Post('getComments')
  async getComments(@Body() body:any){
    try{
      if(!body.article_id){
        return {error: 'Article id is required'};
      }
      return await this.commentsService.findAll(body);
    }catch(e){
      return {error: e.message};
    }
  }
  @Post('deleteComment')
  async deleteComment(@Body() body:any){
    try{
      if(!body.id){
        return {error: 'Comment id is required'};
      }
      return await this.commentsService.delete(body.id);
    }catch(e){
      return {error: e.message};
    }
  }
}
