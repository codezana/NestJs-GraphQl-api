import { CreateAboutInput } from './create-about.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAboutInput extends PartialType(CreateAboutInput) {}
