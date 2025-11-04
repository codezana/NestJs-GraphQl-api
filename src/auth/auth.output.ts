// auth/auth.output.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}

// ✅ Output of login mutation: token + user.