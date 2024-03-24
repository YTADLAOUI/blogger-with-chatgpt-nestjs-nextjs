import { Body, Controller, Get, Post, Req, Request, Res, Response, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from 'src/guard/auth.guard';
import CustomRequest from 'src/interface/CustomRequest';
import { use } from 'passport';


@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService:NotificationsService) {}
  @UseGuards(AuthGuard)
  @Post('findNotification')
  async findNotifictaion(@Request() req:CustomRequest){
    return await this.notificationService.findAll({notification_for:req.user_id});
  }

}
