import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    // private readonly usersRepository: UsersRepository,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    // register users
  }
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password } = registerDto;
    console.log(`Name: ${name} email: ${email} password: ${password}`);
    // check email exists
    const existingUser = await this.prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    // hash password
    // const hashedPassword = await this.configService.get('HASH_SECRET').then(
    //   (secret) => bcrypt.hash(password, secret),
    // );
    // create new user in database and return user data and response object
    // const user = await this.usersRepository.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // response.status(201).json({ message: 'User created successfully' });
    // return { user, response };
    const user = await this.prisma.users.create({
      data: { name, email, password },
    });
    console.log('User created successfully:', user);
    return { user, response };
  }
  // LOGIN USER
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    // const user = await this.validateUser(email, password);
    // if (!user) {
    //   throw new Error('Invalid credentials');
    // }
    const user = { email, password };
    // const accessToken = await this.jwtService.sign({ id: user.id });
    return { user };
  }
  // get all users
  async getUsers() {
    return this.prisma.users.findMany({});
  }
}
