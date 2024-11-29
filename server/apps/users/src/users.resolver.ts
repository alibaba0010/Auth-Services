import { BadRequestException, UseFilters } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { LoginResponse, RegisterResponse } from './types/users.types';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { Response } from 'express';
import { User } from './entities/user.entity';

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
    const user = await this.usersService.register(registerDto, context.res);
    return { user };
  }

  // login user
  @Mutation(() => LoginResponse)
  async loginUser(
    @Args('loginInput') loginDto: LoginDto,
  ): Promise<LoginResponse> {
    const user = await this.usersService.login(loginDto);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return { user };
  }
  @Query(() => [User])
  async getUsers() {
    const users = await this.usersService.getUsers();
    return { users };
  }
}
