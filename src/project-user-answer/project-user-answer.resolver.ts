import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectUserAnswerService } from './project-user-answer.service';
import { ProjectUserAnswer } from './entities/project-user-answer.entity';
import { CreateProjectUserAnswerInput } from './dto/create-project-user-answer.input';
import { UpdateProjectUserAnswerInput } from './dto/update-project-user-answer.input';
import { ProjectUserAnswerResponse } from 'src/response/responses';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => ProjectUserAnswer)
export class ProjectUserAnswerResolver {
  constructor(private readonly projectUserAnswerService: ProjectUserAnswerService) { }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectUserAnswerResponse)
  async createProjectUserAnswer(@Args('Input') Input: CreateProjectUserAnswerInput) {
    try {
      const result = await this.projectUserAnswerService.create(Input);

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
  @Query(() => [ProjectUserAnswer], { name: 'IndexProjectUserAnswer' })
  findAll() {
    return this.projectUserAnswerService.findAll();
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => ProjectUserAnswer, { name: 'ShowProjectUserAnswer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectUserAnswerService.findOne(id);
  }


}
