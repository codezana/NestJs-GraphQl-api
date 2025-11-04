import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  title: string; 

  @Field()
  @IsString({ message: 'تکایە دەبێت نووسین بێت' }) // Must be string
  @IsNotEmpty({ message: 'تکایە نابێت بەتاڵ بێت' }) // Must not be empty
  description: string; 

  @Field({ nullable: true})
  @IsBoolean({ message: 'تکایە دەبێت بەڵێ یان نەخێر بێت' }) // Must be boolean
  @IsOptional({ message: 'ئەم بەشە ئارەزوومەندانەیە' }) // This field is optional
  isActive?: boolean;
}
