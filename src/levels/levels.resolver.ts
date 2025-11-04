import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LevelsService } from './levels.service';
import { Level } from './entities/level.entity';
import { CreateLevelInput } from './dto/create-level.input';
import { UpdateLevelInput } from './dto/update-level.input';
import { LevelResponse } from 'src/response/responses';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => Level)
export class LevelsResolver {
  constructor(private readonly levelsService: LevelsService) { }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => LevelResponse)
  async createLevel(@Args('input') input: CreateLevelInput) {
    try {
      const result = await this.levelsService.create(input);
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


  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Query(() => [Level], { name: 'IndexLevel' })
  findAll() {
    return this.levelsService.findAll();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Query(() => Level, { name: 'ShowLevel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.levelsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => LevelResponse)
  async updateLevel(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateLevelInput) {
    try {

      const result = await this.levelsService.update(id, input);

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

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => LevelResponse)
  async removeLevel(@Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.levelsService.remove(id);

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
