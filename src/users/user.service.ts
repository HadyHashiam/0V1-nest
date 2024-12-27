import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayLoadType } from '../utils/types';
import { AccessTokenType } from '../utils/types';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { UpdateUsertDto } from './dtos/update-user.dto';
import { UserType } from 'src/utils/enums';
import { console } from 'node:inspector/promises';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /*
   * generate JSON WEB Token (JWT)
   * @param payload => JWT payload
   * @returns token
   */
  private generateJwt(payload: JWTPayLoadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  /**
   *  Hashing password
   * @param password plain text => password
   * @returns   hashedPassword
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Create new User
   * @param {RegisterDto} registerDto  data for create new user  // {} if javascript
   * @returns    JWT (access token )
   */
  public async register(registerDto: RegisterDto): Promise<AccessTokenType> {
    const { email, password, username } = registerDto;

    const userFormDb = await this.usersRepository.findOne({ where: { email } });
    if (userFormDb) throw new BadRequestException('User already exists');
    // hash password
    const hashedPassword = await this.hashPassword(password);
    // let to can create token // to rewrite in the variable
    let newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    newUser = await this.usersRepository.save(newUser);

    const accessToken = await this.generateJwt({
      id: newUser.id,
      userType: newUser.userType,
    });
    return { accessToken };
  }

  /**
   * login user
   * @param loginDto data for login
   * @returns JWT (access token)
   */
  public async login(loginDto: LoginDto): Promise<AccessTokenType> {
    const { email, password } = loginDto;
    console.log(`loginDto: ${JSON.stringify(loginDto)}`);
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('not found email or password');
    //check input data
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      throw new BadRequestException('Invalid email or password');
    // generate token
    const accessToken = await this.generateJwt({
      id: user.id,
      userType: user.userType,
    });
    return { accessToken };
  }

  /**
   *  Get CURRENT_User info ( logged in user)
   * @param id id of the logged in user
   * @returns  the user from db
   */
  public async getCurrentUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /**
   * Get all users from db
   * @returns array of users
   */
  public getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // update user
  public async updateUser(id: number, updateUsertDto: UpdateUsertDto) {
    const { password, username } = updateUsertDto;
    const user = await this.usersRepository.findOne({ where: { id } });

    user.username = username ?? user.username;
    if (password) {
      user.password = await this.hashPassword(password);
    }
    return this.usersRepository.save(user);
  }

  /**
   * Delete user
   * @param userId id of the user
   * @param payload  JWTPayLoad
   * @returns a success message
   */
  public async deleteUser(userId: number, payload: JWTPayLoadType) {
    const user = await this.getCurrentUser(userId);
    console.log(JSON.stringify(user));
    if (user.id === payload?.id || payload?.userType === UserType.ADMIN) {
      await this.usersRepository.remove(user);
      return { message: 'User has been deleted successfully' };
    }
    throw new ForbiddenException('You are not allowed to delete this user');
  }

  /*
   *
   *
   *
   *
   */
}
