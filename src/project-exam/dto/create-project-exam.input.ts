import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateProjectExamInput {
  @Field()
  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  title: string; 

  @Field()
  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  description: string; 

  @Field(() => Int)
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  total_degree: number;
  
  @Field({ nullable: true})
  @IsBoolean({ message: 'تکایە دەبێت بەڵێ یان نەخێر بێت' }) // Must be boolean
  @IsOptional({ message: 'ئەم بەشە ئارەزوومەندانەیە' }) // This field is optional
  isActive?: boolean;

  @Field(() => Int, {nullable: true })
  @Min(1)
  projectId?: number;
}
