import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User , userSchema} from './models/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Token, tokenSchema } from './models/token.schema';
import { TokenService } from './token/token.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name: User.name, schema: userSchema },{name:Token.name,schema:tokenSchema}]),CloudinaryModule, ArticlesModule,
  JwtModule.register({
    global: true,
    secret: 'secret',
    signOptions: { expiresIn: '1w' },
  }),
 
],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports:[AuthService]
})
export class AuthModule {}
