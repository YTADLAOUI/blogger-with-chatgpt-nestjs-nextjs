import { Body, Controller, Post } from '@nestjs/common';
import { ResetService } from './reset.service';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcryptjs';
@Controller()
export class ResetController {
  constructor(private resetService:ResetService, private authService: AuthService) {}
  @Post('forgot')
  async forgotPassword(@Body('email') email: string) {
    const token = Math.random().toString(36).substring(2, 15);
    await this.resetService.save({ email, token });
    await ResetService.sendEmail(email, 'Reset Password', `http://localhost:3000/api/reset/${token}`);
    return { message: 'Reset link has been sent to your email' };
  }
  @Post('reset')
  async resetPassword(@Body('token') token: string, @Body('password') password: string, @Body('confirmPassword') confirmPassword: string){

    if(password !== confirmPassword){
      return {status:400,message:"Password and Confirm Password must be same"}
    }
    const reset = await this.resetService.findOne({token});
    const user = await this.authService.findOne(reset.email);
      if(!user){
        return {status:400,message:"User not found"}
      }
      await this.authService.update(user._id,
        {password:await bcrypt.hash(password, 10)
        });

    return { message: 'Password reset successfully' };
  }
}
