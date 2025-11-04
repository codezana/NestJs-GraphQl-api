import { Module } from '@nestjs/common';
import { ProjectUserAnswerService } from './project-user-answer.service';
import { ProjectUserAnswerResolver } from './project-user-answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUserAnswer } from './entities/project-user-answer.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUserAnswer,ProjectRegistration,ProjectQuestion,ProjectChoice])],
  providers: [ProjectUserAnswerResolver, ProjectUserAnswerService],
})
export class ProjectUserAnswerModule {}
