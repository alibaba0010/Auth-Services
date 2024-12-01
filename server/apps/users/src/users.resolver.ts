import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  ActivationResponse,
  LoginResponse,
  RegisterResponse,
} from './types/users.types';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { Response } from 'express';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';

@Resolver('User')
// @UseFilters
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}
  @Mutation(() => RegisterResponse)
  async registerUser(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill all fields');
    }
    const { activation_token } = await this.usersService.register(
      registerDto,
      context.res,
    );
    return { activation_token };
  }
  z;
  // acctivate user
  @Mutation(() => ActivationResponse)
  async activateUserAccount(
    @Args('activationInput') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.usersService.activateUserAccount(
      activationDto,
      context.res,
    );
  }
  // login user
  @Mutation(() => LoginResponse)
  async loginUser(
    @Args('loginInput') loginDto: LoginDto,
  ): Promise<LoginResponse> {
    return await this.usersService.login(loginDto);
  }
  // get current user
  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async currentUser(@Context() context: { req: Request }) {
    return await this.usersService.getCurrentUser(context.req);
  }
  @Query(() => [User])
  async getUsers() {
    const users = await this.usersService.getUsers();
    return { users };
  }
}
