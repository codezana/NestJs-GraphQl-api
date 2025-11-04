import { CreateLevelInput } from './create-level.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLevelInput extends PartialType(CreateLevelInput) {}
