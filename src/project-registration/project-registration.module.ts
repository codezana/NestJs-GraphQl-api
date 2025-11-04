import { Module } from '@nestjs/common';
import { ProjectRegistrationService } from './project-registration.service';
import { ProjectRegistrationResolver } from './project-registration.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { QuizUser } from 'src/quiz-users/entities/quiz-user.entity';
import { ProjectRegistration } from './entities/project-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project,QuizUser,ProjectRegistration])],
  providers: [ProjectRegistrationResolver, ProjectRegistrationService],
})
export class ProjectRegistrationModule {}
