import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizUsersService } from './quiz-users.service';
import { QuizUser } from './entities/quiz-user.entity';
import { CreateQuizUserInput } from './dto/create-quiz-user.input';
import { UpdateQuizUserInput } from './dto/update-quiz-user.input';
import { QuizUserResponse } from 'src/response/responses';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => QuizUser)
export class QuizUsersResolver {
  constructor(private readonly quizUsersService: QuizUsersService) {}

 
  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => [QuizUser], { name: 'IndexQuizUser' })
  findAll() {
    return this.quizUsersService.findAll();
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => QuizUser, { name: 'ShowQuizUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quizUsersService.findOne(id);
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => QuizUserResponse)
 async updateQuizUser(@Args('id',{type:()=>Int} )id:number,@Args('input') input: UpdateQuizUserInput) {
  try {
    const result =await this.quizUsersService.update(id, input);

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
  @Mutation(() => QuizUserResponse)
 async removeQuizUser(@Args('id', { type: () => Int }) id: number) {
  try {
    const result=await this.quizUsersService.remove(id);
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
