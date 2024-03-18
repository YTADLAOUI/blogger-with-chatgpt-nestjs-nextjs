import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './models/notification.schema';
// import { DeleteWriteOpResultObject } from 'mongoose/node_modules/mongodb';
import { DeleteResult } from 'mongodb';

import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private  notificationModel:Model<Notification>) {}

  async saveNotification(body:any){
    console.log(body)
    const createdNotification= new this.notificationModel(body);
    await createdNotification.save();
    return createdNotification;
  }
  async findOne(query:any){
    return await this.notificationModel.findOne(query);
  }
  async removeNotification(query: any) : Promise<DeleteResult> {
    try {
        const result = await this.notificationModel.deleteOne(query);
        console.log(result); 
        return result;
    } catch (error) {
        console.error("Error while removing notification:", error);
        throw error; 
    }
}
}
