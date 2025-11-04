import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
@InputType()
export class CreateProjectUserAnswerInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  registrationId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  questionId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  selectedChoiceId: number;

}
