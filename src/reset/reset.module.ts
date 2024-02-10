import { Module } from '@nestjs/common';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reset, resetSchema } from './models/reset.schma';


@Module({
  imports: [MongooseModule.forFeature([{ name: Reset.name , schema: resetSchema }])],
  controllers: [ResetController],
  providers: [ResetService]
})
export class ResetModule {}
