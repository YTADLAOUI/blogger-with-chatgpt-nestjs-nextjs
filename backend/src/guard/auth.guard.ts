import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface CustomRequest extends Request {
  user_id?: string; 
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest<CustomRequest>();
    if (!request.headers['cookie']) {
      console.log(request.headers)
      throw new HttpException('Authorization header not found', HttpStatus.FORBIDDEN);
    }
    const accessToken = request.headers['cookie'].split('accessToken=')[1]
    try {
      const { id } = await this.jwtService.verifyAsync(accessToken);
      if (!id) {
        throw new HttpException('Access token is not valid', HttpStatus.UNAUTHORIZED);
      }
      request.user_id = id;
      return true;
    } catch (e) {
      throw new HttpException('Access token is not valid', HttpStatus.UNAUTHORIZED);
    }
  }
}
