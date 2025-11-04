import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, Length, Matches, Min } from 'class-validator';

@InputType()
export class CreateProjectChoiceInput {
  @Field(() => String, { description: 'کلیلی هەڵبژاردن (A, B, C, D)' })
  @IsNotEmpty({ message: 'کلیلی هەڵبژاردن نابێت بەتاڵ بێت' })
  @IsString({ message: 'کلیلی هەڵبژاردن دەبێت نووسە بێت' })
  @Length(1, 1, { message: 'کلیلی هەڵبژاردن دەبێت تەنها یەک پیت بێت' })
  @Matches(/^[A-D]$/, { message: 'کلیلی هەڵبژاردن دەبێت یەکێک بێت لە (A, B, C, D)' })
  choiceKey: string;

  @Field(() => String, { description: 'ناوەڕۆکی دەقی هەڵبژاردن' })
  @IsNotEmpty({ message: 'ناوەڕۆکی دەقی هەڵبژاردن نابێت بەتاڵ بێت' })
  @IsString({ message: 'ناوەڕۆکی دەقی هەڵبژاردن دەبێت نووسە بێت' })
  choiceText: string;

  @Field(() => Boolean, { description: 'ئایا ئەم هەڵبژاردنە ڕاستە', defaultValue: false })
  @IsBoolean({ message: 'دەبێت بەهای ڕاست یان هەڵە بێت' })
  isCorrect: boolean;
}
