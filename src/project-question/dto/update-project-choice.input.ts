import { CreateProjectChoiceInput } from './create-project-choice.input';
import { InputType,PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectChoiceInput extends PartialType(CreateProjectChoiceInput) {}
