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
  user: User | any;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}
@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  message?: string;
  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}
@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  passwordResetToken?: string;
  @Field(() => Errortype, { nullable: true })
  error?: Errortype;
}
