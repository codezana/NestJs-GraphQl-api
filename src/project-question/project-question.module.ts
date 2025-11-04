import { Module } from '@nestjs/common';
import { ProjectQuestionService } from './project-question.service';
import { ProjectQuestionResolver } from './project-question.resolver';
import { ProjectChoice } from './entities/project-choice.entity';
import { ProjectQuestion } from './entities/project-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectChoiceModule } from './project-choice.module';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectQuestion, ProjectChoice,ProjectExam]),
    ProjectChoiceModule
  ],
  providers: [ProjectQuestionResolver, ProjectQuestionService],
})
export class ProjectQuestionModule { }
