import { CreateQuizUserInput } from './create-quiz-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuizUserInput extends PartialType(CreateQuizUserInput) {}
