import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectExamService } from './project-exam.service';
import { ProjectExam } from './entities/project-exam.entity';
import { CreateProjectExamInput } from './dto/create-project-exam.input';
import { UpdateProjectExamInput } from './dto/update-project-exam.input';
import { ProjectExamResponse } from 'src/response/responses';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Resolver(() => ProjectExam)
export class ProjectExamResolver {
  constructor(private readonly projectExamService: ProjectExamService) {}

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => [ProjectExam], { name: 'IndexProjectExam' })
  findAll() {
    return this.projectExamService.findAll();
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => ProjectExam, { name: 'ShowProjectExam' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectExamService.findOne(id);
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectExamResponse)
  async createProjectExam(@Args('input') input: CreateProjectExamInput) {
    try {
      const result = await this.projectExamService.create(input);
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


  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectExamResponse)
  async updateProjectExam(
    @Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateProjectExamInput) {

    try {
      const result = await this.projectExamService.update(id, input);
      return {
        status: result.status,
        message: result.message,
        data: result.data
      };

    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectExamResponse)
  async removeProjectExam(
    @Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.projectExamService.remove(id);
      return {
        status: result.status,
        message: result.message
      };

    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error: ' + error.message,
      };
    }
  }


}
