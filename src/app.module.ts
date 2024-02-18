import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ResetModule } from './reset/reset.module';
import { OpenaiModule } from './openAi/openai.module';
@Module({
  imports: [AuthModule,ResetModule,OpenaiModule,MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.MONGODB_URI,
      dbName: process.env.MONGODB_DB,
    }),
  }),
  ConfigModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
