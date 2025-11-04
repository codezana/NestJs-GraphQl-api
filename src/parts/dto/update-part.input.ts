import { CreatePartInput } from './create-part.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePartInput extends PartialType(CreatePartInput) {

}
