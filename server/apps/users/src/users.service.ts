import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { EmailService } from './email/email.service';
import { AuthToken } from './utils/sendToken';
interface UserData {
  name: string;
  email: string;
  contact: number;
  password: string;
}
@Injectable()
export class UsersService {
  constructor(
    // private readonly usersRepository: UsersRepository,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {
    // register users
  }
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, contact, password } = registerDto;
    // check email exists
    const existingUser = await this.prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    // check contact number exists
    const existingContact = await this.prisma.users.findUnique({
      where: { contact },
    });
    if (existingContact) {
      throw new BadRequestException('Contact number already exists');
    }

    // hash password
    // const hashedPassword = await this.configService.get('HASH_SECRET').then(
    //   (secret) => bcrypt.hash(password, secret),
    // );
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user in database and return user data and response object
    // const user = await this.usersRepository.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    // response.status(201).json({ message: 'User created successfully' });
    const user = { name, email, contact, password: hashedPassword };
    const { token, activationToken } = await this.createToken(user);
    const emailOptions = {
      email,
      subject: 'Activate your account with this token',
      name,
      activationToken,
      template: './activation-email',
    };
    await this.emailService.sendEmail(emailOptions);
    console.log('Activation token: ' + activationToken);
    // await this.prisma.users.create({ user });
    return { activation_token: token, response };
  }
  // activate user account
  async activateUserAccount(activationDto: ActivationDto, response: Response) {
    const { token, activationToken } = activationDto;
    const newUser: { user: UserData; activationToken: string } =
      await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SEC'),
      });
    if (newUser.activationToken !== activationToken) {
      throw new BadRequestException('Invalid Activation Token ');
    }
    const { name, email, contact, password } = newUser.user;
    const user = await this.prisma.users.create({
      data: { name: name, email, contact, password },
    });

    return { user, response };
  }
  // CREATE ACTIVATION TOKEN
  private async createToken(user: UserData) {
    const activationToken = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      { user, activationToken },
      {
        secret: this.configService.get<string>('JWT_SEC'),
        // expiresIn: this.configService.get<number>('JWT_LIFETIME'),
        expiresIn: '5m',
      },
    );
    return { token, activationToken };
  }
  // LOGIN USER
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    // check if the email exist
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: { message: 'Invalid email' },
      };
    }
    // check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: { message: 'Invalid password' },
      };
    }
    // create access token
    const { accessToken } = new AuthToken(
      this.configService,
      this.jwtService,
    ).accessToken(user);
    const { refreshToken } = new AuthToken(
      this.configService,
      this.jwtService,
    ).accessToken(user);

    // const accessToken = await this.jwtService.sign({ id: user.id });
    return { user, accessToken, refreshToken };
  }
  // get current user
  async getCurrentUser(req: any) {
    const { user, accessToken, refreshToken } = req;
    console.log('getCurrentUser: ', { user, accessToken, refreshToken });
    return { user, accessToken, refreshToken };
  }
  // get all users
  async getUsers() {
    return this.prisma.users.findMany({});
  }
}
