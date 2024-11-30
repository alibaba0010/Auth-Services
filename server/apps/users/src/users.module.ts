import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { UsersResolvers } from './users.resolver';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    EmailModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    PrismaService,
    UsersResolvers,
    EmailService,
  ],
})
export class UsersModule {}
