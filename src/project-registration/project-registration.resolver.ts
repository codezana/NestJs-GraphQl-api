import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectRegistrationService } from './project-registration.service';
import { ProjectRegistration } from './entities/project-registration.entity';
import { CreateProjectRegistrationInput } from './dto/create-project-registration.input';
import { UpdateProjectRegistrationInput } from './dto/update-project-registration.input';
import { ProjectRegistrationResponse } from 'src/response/responses';
import { CreateQuizUserInput } from 'src/quiz-users/dto/create-quiz-user.input';
import { Roles } from 'src/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Resolver(() => ProjectRegistration)
export class ProjectRegistrationResolver {
  constructor(private readonly projectRegistrationService: ProjectRegistrationService) { }


  @Mutation(() => ProjectRegistrationResponse)
  async createProjectRegistration(@Args('input') input: CreateProjectRegistrationInput, @Args('quizinput') quizinput: CreateQuizUserInput) {
    try {
      const result = await this.projectRegistrationService.create(input, quizinput);

      return {
        status: result.status,
        message: result.message,
        data: result.data
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => [ProjectRegistration], { name: 'IndexProjectRegistration' })
  findAll() {
    return this.projectRegistrationService.findAll();
  }

  @Query(() => ProjectRegistration, { name: 'ShowProjectRegistration' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectRegistrationService.findOne(id);
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectRegistrationResponse)
  async updateProjectRegistration(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateProjectRegistrationInput) {
    try {
      const result = await this.projectRegistrationService.update(id, input);

      return {
        status: result.status,
        message: result.message,
        data: result.data
      }

    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectRegistrationResponse)
  async removeProjectRegistration(@Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.projectRegistrationService.remove(id);
      return {
        status: result.status,
        message: result.message
      }

    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }


}
