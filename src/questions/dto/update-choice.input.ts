import { CreateChoiceInput } from '../../questions/dto/create-choice.input';
import { InputType,PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChoiceInput extends PartialType(CreateChoiceInput) {}
