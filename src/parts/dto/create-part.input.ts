import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty, MinLength } from 'class-validator';
@InputType()
export class CreatePartInput {
  @Field(() => String, { description: 'ناونیشانی بەش' })
  @IsString({message: 'ناونیشان دەبێت نووسین بێت'})
  @IsNotEmpty({message: 'ناونیشان نابێت بەتاڵ بێت'})
  @MinLength(3, {message: 'ناونیشان دەبێت لانیکەم ٣ پیت بێت'})
  title: string;

  @Field(() => String, { description: 'وەسفی بەش' })
  @IsString({message: 'وەسف دەبێت نووسین بێت'})
  @IsNotEmpty({message: 'وەسف نابێت بەتاڵ بێت'})
  @MinLength(10, {message: 'وەسف دەبێت لانیکەم ١٠ پیت بێت'})
  description: string;

  @Field(() => String, { description: 'وێنۆچکەی بەش' })
  @IsString({message: 'وێنۆچکە دەبێت نووسین بێت'})
  @IsNotEmpty({message: 'وێنۆچکە نابێت بەتاڵ بێت'})
  icon: string;

  @Field(() => Boolean, { description: 'چالاکی بەش', defaultValue: true })
  @IsBoolean({message: 'چالاکی دەبێت بەڵێ/نەخێر بێت'})
  is_active: boolean;
}
