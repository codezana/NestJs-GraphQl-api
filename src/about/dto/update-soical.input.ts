import {CreateSocialMediaInput } from './create-soical.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSocialMediaInput extends PartialType(CreateSocialMediaInput) {}
