import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Choice } from 'src/questions/entities/choice.entity';
import { ChoicesModule } from './choices.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Level, Choice]),
    ChoicesModule
  ],
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule { }
