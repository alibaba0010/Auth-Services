import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  id: string;
  name: string;
  email: string;
}
@ObjectType()
export class Errortype {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;

  //   statusCode: number;
}

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
