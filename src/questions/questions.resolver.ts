import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { QuestionResponse } from 'src/response/responses';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => QuestionResponse)
 async createQuestion(@Args('input') input: CreateQuestionInput) {
  try {
    const result = await this.questionsService.createWithChoices(input);

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
  @Query(() => [Question], { name: 'IndexQuestion' })
  findAll() {
    return this.questionsService.findAll();
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Query(() => Question, { name: 'ShowQuestion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard,RolesGuard)
  @Roles('admin')
  @Mutation(() => QuestionResponse)
 async updateQuestion(@Args('id',{type:()=>Int} )id:number,@Args('input') input: UpdateQuestionInput) {
  try {
    const result =await this.questionsService.updateWithChoices(id, input);

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
  @Mutation(() => QuestionResponse)
 async removeQuestion(@Args('id', { type: () => Int }) id: number) {
  try {
    const result=await this.questionsService.removeWithChoices(id);
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
