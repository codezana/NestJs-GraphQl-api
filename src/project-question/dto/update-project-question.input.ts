import { CreateProjectQuestionInput } from './create-project-question.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectQuestionInput extends PartialType(CreateProjectQuestionInput) {}
