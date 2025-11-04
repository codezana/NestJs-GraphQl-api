import { CreateProjectRegistrationInput } from './create-project-registration.input';
import { InputType,PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectRegistrationInput extends PartialType(CreateProjectRegistrationInput) {}
