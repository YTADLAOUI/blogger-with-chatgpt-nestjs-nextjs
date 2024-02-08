import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { LoginAuthDto, RegisterAuth } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService:JwtService) {}
@Post('register')
  async register(@Body() body:RegisterAuth){
    if(!body.username || !body.email || !body.password){
      return {status:400,message:"All fields are required"}
    }
    if(body.password.length<6){
      return {status:400,message:"Password must be atleast 6 characters long"}
    }
    if(body.password !== body.confirmPassword){ 
      return {status:400,message:"Password and Confirm Password must be same"}
     }
    return await this.authService.save({
      username: body.username,
      email: body.email,
      password:await  bcrypt.hash(body.password, 10),
    });
  }
   @Post('login')

  async login(@Body() body:LoginAuthDto,@Res({passthrough:true}) res:Response){
    if(!body.email || !body.password){
      return {status:400,message:"All fields are required"}
    }
    const user = await this.authService.findOne(body.email);
    if(!user){
      return {status:400,message:"User not found"}
    }
    
    const match = await bcrypt.compare(body.password, user.password);
    if(!match){
      return {status:400,message:"Invalid credentials"}
    }
    const accessToken = await this.jwtService.signAsync({id:user._id},{expiresIn:'30s'});
    const refreshToken = this.jwtService.signAsync({id:user._id}); 
    res.status(200);
    res.cookie('refreshToken',refreshToken,{httpOnly:true,maxAge:1000*60*60*24*7});

    return {token:accessToken}
  }
  @Get('user')
   async user(@Req() req:Request ,@Res({passthrough:true}) res:Response){ 
    try{
      
    const accessToken = req.headers['authorization'].replace('Bearer','');
    const {id} = await this.jwtService.verifyAsync(accessToken);
    return await this.authService.findOne(id);
   } catch(e){
    throw new Error('Invalid token');
   }
  }

  
}
