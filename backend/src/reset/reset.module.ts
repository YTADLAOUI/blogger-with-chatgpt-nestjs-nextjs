import { Module } from '@nestjs/common';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reset, resetSchema } from './models/reset.schma';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  imports: [MongooseModule.forFeature([{ name: Reset.name , schema: resetSchema }]),AuthModule],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
