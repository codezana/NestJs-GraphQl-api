import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PartsService } from './parts.service';
import { Part } from './entities/part.entity';
import { CreatePartInput } from './dto/create-part.input';
import { UpdatePartInput } from './dto/update-part.input';
import { PartResponse } from 'src/response/responses';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => Part)
export class PartsResolver {
  constructor(private readonly partsService: PartsService) { }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => PartResponse)
  async createPart(@Args('input') input: CreatePartInput) {
    try {
      const result = await this.partsService.create(input);
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
  @Mutation(() => PartResponse)
  async updatePart(
    @Args('id', { type: () => Int }) id: number, @Args('input') input: UpdatePartInput) {

    try {
      const result = await this.partsService.update(id, input);
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
  @Mutation(() => PartResponse)
  async removePart(
    @Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.partsService.remove(id);
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


  @Query(() => [Part], { name: 'IndexPart' })
  findAll() {
    return this.partsService.findAll();
  }

  @Query(() => Part, { name: 'ShowPart' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.partsService.findOne(id);
  }
}
