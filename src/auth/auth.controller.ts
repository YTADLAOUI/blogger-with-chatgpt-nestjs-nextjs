import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import {  RegisterAuth } from './dto/register-auth.dto';
import {  LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenService } from './token/token.service';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService:JwtService,private tokenService:TokenService) {}
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
    const accessToken = await this.jwtService.signAsync({id:user._id},{expiresIn:'60s'});
    const refreshToken =await this.jwtService.signAsync({id:user._id}); 
    const expire_at = new Date(Date.now() + 7*24*60*60*1000);
    await this.tokenService.save({
      user_id:user._id,
      token:refreshToken,
      expire_at
    });
    res.status(200);
    res.cookie('refreshToken',refreshToken,{httpOnly:true,maxAge:7*24*60*60*1000});

    return {token:accessToken}
  }
  @Get('user')
   async user(@Req() req:Request ,@Res({passthrough:true}) res:Response){ 
    try{
      // console.log(req.headers['authorization'].replace('Bearer ',''));
    const accessToken = req.headers['authorization'].replace('Bearer ','');
    const {id} = await this.jwtService.verifyAsync(accessToken);
    
    const user = await this.authService.findOneById(id)
    return {email:user.email,username:user.username};
   } catch(e){
    throw new Error('Invalid token');
   }
  }
  @Post('refresh')
  async refresh(@Req() req:Request,@Res({passthrough:true}) res:Response){
  try{
    const refreshToken =req.cookies['refreshToken'];
     const {id} = await this.jwtService.verifyAsync(refreshToken);
     const tokenEntity = await this.tokenService.findOne({user_id:id,expire_at:{$gte:Date.now()}});
     if(!tokenEntity){
       throw new Error('Invalid token');
     }
     const accessToken = await this.jwtService.signAsync({id},{expiresIn:'60s'});
      res.status(200);
    return {token:accessToken};
  }catch(e){
    throw new Error('Invalid token');
  }
  }
  // @Post('logout')
  // async logout(@Req() req:Request,@Res({passthrough:true}) res:Response){

  //   const refreshToken =req.cookies['refreshToken'];
  //   await this.tokenService.delete({token:refreshToken});
  //   res.clearCookie('refreshToken');
  //   return {message:"Logged out"};
  // }
  
}
