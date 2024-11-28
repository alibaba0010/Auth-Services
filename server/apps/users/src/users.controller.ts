import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getHello(request: Request, response: Response): object {
    return await this.usersService.register();
  }
}
