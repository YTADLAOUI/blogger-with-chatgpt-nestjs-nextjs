import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
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
  @Patch('updateComment')
  async updateComment(@Body() body:any){
    try{
      if(!body.id_comment){
        return {error: 'Comment id is required'};
      }
      if(!body.comment){  
        return {error: 'Comment is required'};
      }
      console.log("gg",body,'ggg')
      return await this.commentsService.update(body.id_comment,{comment:body.comment});
    }catch(e){
      return {error: e.message};
    }
  }
  @Post('deleteComment')
  async deleteComment(@Body() body:any){
    try{
      if(!body.id_comment){
        return {error: 'Comment id is required'};
      }
      return await this.commentsService.delete(body);
    }catch(e){
      return {error: e.message};
    }
  }
}
