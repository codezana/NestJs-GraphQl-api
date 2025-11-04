// auth/auth.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;
}

// ✅ Input for GraphQL mutations.