import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsResolver } from './levels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Part } from 'src/parts/entities/part.entity';
import { Question } from 'src/questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level,Part,Question])],
  providers: [LevelsResolver, LevelsService],
})
export class LevelsModule {}
