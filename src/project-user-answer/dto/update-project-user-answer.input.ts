import { CreateProjectUserAnswerInput } from './create-project-user-answer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectUserAnswerInput extends PartialType(CreateProjectUserAnswerInput) {
}
