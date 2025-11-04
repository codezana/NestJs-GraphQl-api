import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateProjectChoiceInput } from './create-project-choice.input';

@InputType()
export class CreateProjectQuestionInput {
  @Field(() => String, { description: 'ناونیشانی پرسیارەکە' })
  @IsString({ message: 'تکایە دەبێت ناونیشان نووسراو بێت' })
  @IsNotEmpty({ message: 'تکایە ناونیشان بەتاڵ نەبێت' })
  title: string;

  @Field(() => Int, { description: 'نمرەی پرسیارەکە'})
  @Min(1, { message: 'نمرەی پرسیارەکە نابێت کەمتر بێت لە یەک ' })
  degree: number;

  @Field(() => Int, {nullable: true })
  @Min(1)
  projectExamId?: number;

  @Field(() => [CreateProjectChoiceInput]) // Define choices as an array
  @IsArray()
  choices: CreateProjectChoiceInput[];
}
