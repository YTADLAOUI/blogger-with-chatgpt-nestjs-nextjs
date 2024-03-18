import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './models/notification.schema';


@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports:[MongooseModule.forFeature([{name:Notification.name,schema:NotificationSchema}])],
  exports:[NotificationsService]
})
export class NotificationsModule {}
