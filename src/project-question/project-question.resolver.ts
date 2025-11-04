import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectQuestionService } from './project-question.service';
import { ProjectQuestion } from './entities/project-question.entity';
import { CreateProjectQuestionInput } from './dto/create-project-question.input';
import { UpdateProjectQuestionInput } from './dto/update-project-question.input';
import { ProjectQuestionResponse } from 'src/response/responses';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => ProjectQuestion)
export class ProjectQuestionResolver {
  constructor(private readonly projectQuestionService: ProjectQuestionService) { }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectQuestionResponse)
  async createProjectQuestion(@Args('input') input: CreateProjectQuestionInput) {
    try {
      const result = await this.projectQuestionService.createWithChoices(input);


      return {
        status: result.status,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Query(() => [ProjectQuestion], { name: 'IndexProjectQuestion' })
  findAll() {
    return this.projectQuestionService.findAll();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Query(() => ProjectQuestion, { name: 'ShowProjectQuestion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectQuestionService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectQuestionResponse)
  async updateProjectQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProjectQuestionInput,
  ) {
    try {
      const result = await this.projectQuestionService.updateWithChoices(id, input);

      return {
        status: result.status,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectQuestionResponse)
  async removeProjectQuestion(@Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.projectQuestionService.removeWithChoices(id);

      return {
        status: result.status,
        message: result.message,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }
}
