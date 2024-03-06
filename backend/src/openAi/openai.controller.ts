import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('')
export class OpenaiController {
    constructor(private openAiService:OpenaiService,) {}

    @Post('openai')
    async openAi(@Body('prompt') prompt: string)
    {
      console.log(prompt)
        return this.openAiService.openAi(prompt);
    }

}
