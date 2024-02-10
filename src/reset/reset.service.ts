import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reset } from './models/reset.schma';
import { Model } from 'mongoose';

@Injectable()
export class ResetService {
  constructor(
    @InjectModel(Reset.name) private resetModel: Model<Reset>,
  ) {}
  async save(body:any){
    const createdReset= new this.resetModel(body);
    await createdReset.save();
    return createdReset;
  }
   
}
