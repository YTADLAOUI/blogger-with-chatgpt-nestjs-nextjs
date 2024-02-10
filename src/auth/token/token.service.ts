import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../models/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  async save(body:any){
    const createdToken= new this.tokenModel(body);
    console.log('reer',createdToken)
    await createdToken.save();
    return createdToken;
  }
  async findOne(options){
    const Token = await this.tokenModel.findOne(options);
    return Token;
  }
  async delete(options){
    const Token = await this.tokenModel.deleteOne(options);
    return Token;
  }
}
