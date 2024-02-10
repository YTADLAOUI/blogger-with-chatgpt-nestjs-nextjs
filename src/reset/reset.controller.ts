import { Body, Controller, Post } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller()
export class ResetController {
  constructor(private resetService:ResetService) {}
  @Post('forgot')
  async forgotPassword(@Body('email') email: string) {
    const token = Math.random().toString(36).substring(2, 15);
    await this.resetService.save({ email, token });
    await ResetService.sendEmail(email, 'Reset Password', `http://localhost:3000/api/reset/${token}`);
    return { message: 'Reset link has been sent to your email' };
  }
}
