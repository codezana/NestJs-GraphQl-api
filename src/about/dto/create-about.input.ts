import { InputType, Field} from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateAboutInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'لۆگۆ نابێت بەتاڵ بێت' })
  @IsString({ message: 'لۆگۆ دەبێت نوسین بێت' })
  logo: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'وەسف نابێت بەتاڵ بێت' })
  @IsString({ message: 'وەسف دەبێت نووسین بێت' })
  description: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'ژمارەی مۆبایل نابێت بەتاڵ بێت' })
  phone: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'ئیمەیڵ نابێت بەتاڵ بێت' })
  @IsEmail({}, { message: 'فۆرماتی ئیمەیڵ هەڵەیە' })
  email: string;
}
