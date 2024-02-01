import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import bcrypt from 'bcrypt';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('register')
  async register(@Body() body){
    if(!body.username || !body.email || !body.password){
      return {status:400,message:"All fields are required"}
    }
    if(body.password.length<6){
      return {status:400,message:"Password must be atleast 6 characters"}
    }
    if(body.password !== body.confirmPassword){ 
      return {status:400,message:"Password and Confirm Password must be same"}
     }
    // const hashedPassword =  bcrypt.hash(body.password, 12);
    // console.log(hashedPassword,"hashedPassword");
    return await this.authService.save({
      username: body.username,
      email: body.email,
      password: body.password,
    });
  }
   @Post('login')

  

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
