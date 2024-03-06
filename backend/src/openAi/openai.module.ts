import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAi, openAiSchema } from './models/openai.schema';
@Module({
imports: [MongooseModule.forFeature([{ name: OpenAi.name, schema: openAiSchema }])],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
