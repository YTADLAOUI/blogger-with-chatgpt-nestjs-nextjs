import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OpenAi } from './models/openai.schema';
import { Model } from 'mongoose';
import {OpenAI} from "openai";


@Injectable()
export class OpenaiService {
  constructor(
     @InjectModel(OpenAi.name) private readonly openAiModel: Model<OpenAi>,
  ) {}
  
  async openAi(prompt: string) {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
  
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });
  
      console.log(completion.choices);
      console.log(completion.choices[0]);
  
      return completion.choices[0].message.content;
    } catch (error) {
      console.log("first")
      if (error.response && error.response.status === 429) {
        
        console.error('Rate limit exceeded. Waiting and retrying...');
        await new Promise(resolve => setTimeout(resolve, 60000)); 
        return this.openAi(prompt); 
      } else {
        console.error('Error:', error.message);
        throw error;
      }
    }
  }
  



  async save(body:any){
    const createdOpenAi= new this.openAiModel(body);
    await createdOpenAi.save();
    return createdOpenAi;
  }
}
