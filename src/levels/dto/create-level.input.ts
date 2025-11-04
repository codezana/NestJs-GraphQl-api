import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsNotEmpty, MinLength, MaxLength, Min, Max } from 'class-validator';

@InputType()
export class CreateLevelInput {
  @Field(() => String, { description: 'ناونیشانی ئاستەکان' })
  @IsNotEmpty({ message: 'تکایە ناونیشانی ئاستەکە بنووسە' })
  @IsString({ message: 'ناونیشانی ئاستەکە دەبێت نووسین بێت' })
  @MinLength(3, { message: 'ناونیشانی ئاستەکە دەبێت لە ٣ پیت کەمتر نەبێت' })
  @MaxLength(100, { message: 'ناونیشانی ئاستەکە دەبێت لە ١٠٠ پیت زیاتر نەبێت' })
  title: string;

  @Field(() => Int, { description: 'ژمارەی ئاستەکە' })
  @IsNotEmpty({ message: 'تکایە ژمارەی ئاستەکە بنووسە' })
  @Min(1, { message: 'ژمارەی ئاستەکە دەبێت لە ١ گەورەتر بێت' })
  @Max(9, { message: 'ژمارەی ئاستەکە دەبێت لە ٩ بچووکتر بێت' })
  level_key: number;

  @Field(() => Boolean, { description: 'ئایا ئاستەکە چالاکە', defaultValue: true })
  @IsBoolean({ message: 'دۆخی چالاکی دەبێت ڕاست یان هەڵە بێت' })
  is_active: boolean;

  @Field(() => Int, { description: 'ناسنامەی ئەو بەشەی ئەم ئاستە سەر بە...', nullable: true })
  @Min(1)
  partId?: number;
}
