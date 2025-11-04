import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsPhoneNumber, IsIP, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuizUserInput {

  @Field(() => String)
  @IsString({ message: 'تکایە تەنها پیت بەکاربێنە' })
  @IsNotEmpty({ message: 'تکایە ناو پڕبکەرەوە' })
  name: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'تکایە ژمارەی مۆبایل پڕبکەرەوە' })
  phone: string;

  @Field(() => String)
  @IsEmail({}, { message: 'تکایە ئیمەیڵ بە دروستی بنووسە' })
  @IsNotEmpty({ message: 'تکایە ئیمەیڵ پڕبکەرەوە' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'تکایە تەنها پیت بەکاربێنە' })
  @IsNotEmpty({ message: 'تکایە شار پڕبکەرەوە' })
  city: string;

  @Field(() => String)
  @IsIP('4', { message: 'تکایە ناونیشانی ئایپی بە دروستی بنووسە' })  // For IPv4
  @IsNotEmpty({ message: 'تکایە ناونیشانی ئایپی پڕبکەرەوە' })
  ipAddress: string;
}
