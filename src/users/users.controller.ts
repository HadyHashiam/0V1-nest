import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { AuthRolesGuard } from './guards/auth-roles.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JWTPayLoadType } from 'src/utils/types';
import { Roles } from './decorators/user-role.decorator';
import { UserType } from '../utils/enums';
import { UpdateUsertDto } from './dtos/update-user.dto';
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
  @UseGuards(AuthGuard) // to verfiy token only
  public getCurrentUser(@CurrentUser() payload: JWTPayLoadType) {
    return this.userService.getCurrentUser(payload.id);
  }

  // GET :  ~/api/users
  @Get()
  @Roles(UserType.ADMIN) // admins only
  @UseGuards(AuthRolesGuard) // must come after @Roles => to verify token and check role type
  public async getAllUsers() {
    const users = await this.userService.getAll(); // Fetch all users
    const length = users.length; // Calculate the length of the users array
    return { length, users }; // Return both users and their count
  }

  // PUT ~/api/users/:id
  @Put()
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  @UseGuards(AuthRolesGuard)
  public updateUser(
    @CurrentUser() payload: JWTPayLoadType,
    @Body() body: UpdateUsertDto,
  ) {
    return this.userService.updateUser(payload.id, body);
  }

  // Delete ~/api/users/:id
  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  @UseGuards(AuthRolesGuard)
  public deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: JWTPayLoadType,
  ) {
    return this.userService.deleteUser(id, payload);
  }
}
