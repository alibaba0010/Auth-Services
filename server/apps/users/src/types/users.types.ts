import { Field, ObjectType } from '@nestjs/graphql';
import { Errortype, User } from '../entities/user.entity';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;

  @Field()
  accessToken: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}
