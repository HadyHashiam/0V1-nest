import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JWTPayLoadType } from '../../../dist/utils/types';
import { CURRENT_USER_KEY } from 'src/utils/constant';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/utils/enums';
import { UsersService } from '../user.service';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // to catch from decorator
    const roles: UserType[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) return false;

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
        const user = await this.usersService.getCurrentUser(payload.id);
        if (!user) return false;
        // if user include role > return true
        if (roles.includes(user.userType)) {
          request[CURRENT_USER_KEY] = payload;
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException('access denied , invalid token');
      }
    } else {
      throw new UnauthorizedException('access denied , no token provided ');
    }
    return false;
  }
}
