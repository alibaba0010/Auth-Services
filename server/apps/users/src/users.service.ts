import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from 'prisma/prisma.service';

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
  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const user = {
      name,
      email,
      password,
      // role: 'user',
    };
    return user;
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
