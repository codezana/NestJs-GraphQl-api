import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSocialMediaInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'ئایکۆن نابێت بەتاڵ بێت' })
  @IsString({ message: 'ئایکۆن دەبێت نووسین بێت' })
  icon: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'بەستەرەکە نابێت بەتاڵ بێت'})
  @IsString({ message: 'بەستەرەکە دەبێت نووسین بێت'})
  url: string;  // URL of the social media profile

  @Field(() => Int)
  @IsNotEmpty()
  aboutId: number;  // ID of the associated About entity
}
