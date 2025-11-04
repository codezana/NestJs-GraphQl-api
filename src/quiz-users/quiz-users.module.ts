import { Module } from '@nestjs/common';
import { QuizUsersService } from './quiz-users.service';
import { QuizUsersResolver } from './quiz-users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizUser } from './entities/quiz-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizUser])],
  providers: [QuizUsersResolver, QuizUsersService],
})
export class QuizUsersModule {}
