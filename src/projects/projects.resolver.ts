import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectResponse } from 'src/response/responses';
import { Roles } from 'src/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}


  @Query(() => [Project], { name: 'IndexProject' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'ShowProject' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => ProjectResponse)
  async createproject(@Args('input') input: CreateProjectInput) {
    try {
      const result = await this.projectsService.create(input);
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
  // UPDATE
  @Mutation(() => ProjectResponse)
  async updateproject(
    @Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateProjectInput) {

    try {
      const result = await this.projectsService.update(id, input);
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
  // DELETE
  @Mutation(() => ProjectResponse)
  async removeproject(
    @Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.projectsService.remove(id);
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
