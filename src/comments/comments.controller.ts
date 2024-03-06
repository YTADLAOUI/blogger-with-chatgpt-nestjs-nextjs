import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService:CommentsService) {}

  @Post('saveComment')
  async saveComment(@Body() body:any){
    if(!body.article_id || !body.comment || !body.article_author || !body.commented_by ){

      return {error: 'All fields are required'};
    }
    return await this.commentsService.save(body);
  }
}
