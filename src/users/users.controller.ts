import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { CURRENT_TIMESTAMP } from '../utils/constant';
import { CURRENT_USER_KEY } from 'src/utils/constant';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // POST /api/users/auth/register
  @Post('auth/register') // 201
  public register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  // POST /api/users/auth/login
  @Post('auth/login')
  @HttpCode(HttpStatus.OK) // 200
  public login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  // GET ~/api/users/current-User
  @Get('current-user')
  @UseGuards(AuthGuard)
  public getCurrentUser(@Req() request: any) {
    const payload = request[CURRENT_USER_KEY];
    return this.userService.getCurrentUser(payload.id);
  }


}
