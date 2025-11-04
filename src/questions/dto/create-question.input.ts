import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, Min, IsArray } from 'class-validator';
import { Level } from 'src/levels/entities/level.entity';
import { CreateChoiceInput } from './create-choice.input';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: 'ناونیشانی پرسیارەکە' })
  @IsString({ message: 'تکایە دەبێت ناونیشان نووسراو بێت' })
  @IsNotEmpty({ message: 'تکایە ناونیشان بەتاڵ نەبێت' })
  title: string;

  @Field(() => Int, {nullable: true })
  @Min(1)
  levelId?: number;

  @Field(() => [CreateChoiceInput]) // Define choices as an array
  @IsArray()
  choices: CreateChoiceInput[];

  @Field(() => Int, { description: 'نمرەی پرسیارەکان' ,nullable:true})
  degree: number;
}
