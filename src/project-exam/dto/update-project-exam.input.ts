import { CreateProjectExamInput } from './create-project-exam.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectExamInput extends PartialType(CreateProjectExamInput) {}
