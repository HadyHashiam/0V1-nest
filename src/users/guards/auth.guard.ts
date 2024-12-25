import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JWTPayLoadType } from '../../../dist/utils/types';
import { CURRENT_USER_KEY } from 'src/utils/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (token) {
      try {
        const payload: JWTPayLoadType = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('JWT_SECRET'),
          },
        );
        // req.user = payload
        //CURRENT_USER_KEY = "user"
        request[CURRENT_USER_KEY] = payload;
      } catch (error) {}
    } else {
      return false;
    }

    return true;
  }
}
