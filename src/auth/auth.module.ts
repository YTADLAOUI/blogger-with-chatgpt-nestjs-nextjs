import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User , userSchema} from './models/user.schema';
// import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  JwtModule.register({
    global: true,
    secret: 'secret',
    signOptions: { expiresIn: '1w' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
