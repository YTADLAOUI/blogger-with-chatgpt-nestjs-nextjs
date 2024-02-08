export class CreateAuthDto {}
export class RegisterAuth{
  username:string
  email:string
  password:string
  confirmPassword:string
}

export class LoginAuthDto {
  email: string;
  password: string;
}