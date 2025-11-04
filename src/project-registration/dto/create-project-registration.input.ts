import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProjectRegistrationInput {
  @Field(() => Int)
  @IsInt({ message: 'ناسێنەری پرۆژە پێویستە ژمارەیەکی دروست بێت' })
  @IsNotEmpty({ message: 'ناسێنەری پرۆژە نابێت بەتاڵ بێت' })
  projectId: number;
}
