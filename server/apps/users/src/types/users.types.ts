import { Field, ObjectType } from '@nestjs/graphql';
import { Errortype, User } from '../entities/user.entity';

@ObjectType()
export class RegisterResponse {
  @Field()
  activation_token: string;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}

// activation response
@ObjectType()
export class ActivationResponse {
  @Field(() => User)
  user?: User | unknown;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}
@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}
