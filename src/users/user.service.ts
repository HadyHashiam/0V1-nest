import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayLoadType } from '../utils/types';
import { AccessTokenType } from '../utils/types';
import { CURRENT_TIMESTAMP } from './../utils/constant';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * generate JSON WEB Token   JWT
   * @param payload  JWT payload
   * @returns token
   */
  private generateJwt(payload: JWTPayLoadType): Promise<string> {
    return this.jwtService.signAsync(payload);
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // let to can create token // to rewrite in the variable
    let newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    newUser = await this.usersRepository.save(newUser);
    // generate token
    // const payload: JWTPayLoadType = {
    //   id: newUser.id,
    //   userType: newUser.userType,
    // };
    // const accessToken = await this.jwtService.signAsync(payload);

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
  public async getCurrentUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  //  */
  // public async getCurrentUser(headerToken: string) {
  //   console.log('fun on ');
  //   console.log(headerToken);

  //   const [type, token] = headerToken.split(' ');
  //   console.log(token);

  //   console.log('fun on 2');
  //   console.log(token);

  //   const payload = await this.jwtService.verifyAsync(token, {
  //     secret: this.config.get<string>('JWT_SECRET'),
  //   });
  //   console.log(payload);
  //   const user = await this.usersRepository.findOne({
  //     where: { id: payload.id },
  //   });
  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }
  //   return user;
  // }

  // public GetAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }
  /*
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

  // /**
  //  * GetOne Spacific User
  //  */
  // public async GetSingleOne(id: number) {
  //   console.log(id);
  //   const User = this.usersRepository.findOne({ where: { id: id } });
  //   if (!User) {
  //     throw new NotFoundException(`no User found for User id ${id}`);
  //   }
  //   return await User;
  // }

  // /**
  //  * Update User
  //  */
  // public async UpdateOne(id: number, body: any) {
  //   const User = await this.GetSingleOne(id);
  //   // User.title = body.title ?? product.title;
  //   // product.description = body.description ?? product.description;
  //   // product.price = body.price ?? product.price;
  //   return await this.usersRepository.save(User);

  //   // if (!User) {
  //   //   throw new NotFoundException(`no User found for User id ${id}`);
  //   // }
  // }

  // /**
  //  * Delete User
  //  */
  // // Delete : ~/api/Users/:id

  // public async DeleteOne(id: any) {
  //   const User = await this.GetSingleOne(id);
  //   await this.usersRepository.remove(User);
  //   return { message: 'User Deleted Successfully' };

  //   // delete the User
  // }
}
