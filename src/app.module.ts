import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsModule } from './parts/parts.module';
import { LevelsModule } from './levels/levels.module';
import { QuestionsModule } from './questions/questions.module';
import { ChoicesModule } from './questions/choices.module';
import { AboutModule } from './about/about.module';
import { QuizUsersModule } from './quiz-users/quiz-users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectRegistrationModule } from './project-registration/project-registration.module';
import { ProjectQuestionModule } from './project-question/project-question.module';
import { ProjectChoiceModule } from './project-question/project-choice.module';
import { ProjectExamModule } from './project-exam/project-exam.module';
import { ProjectUserAnswerModule } from './project-user-answer/project-user-answer.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Load .env globally

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // auto-generate schema
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production', // 👈 disables in production
      introspection: process.env.NODE_ENV !== 'production',
      path: '/graphql',

      // ✅ place formatError here
      formatError: (error) => {
        const { message, extensions } = error;

        return {
          message,
          extensions: {
            code: extensions?.code || 'INTERNAL_SERVER_ERROR',
            statusCode: extensions?.statusCode || 500,
            messages: extensions?.messages || [message],
          },
        };
      },

    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: config.get('DB_SYNC') === 'true',
      }),
    }),


    PartsModule,


    LevelsModule,


    QuestionsModule,


    ChoicesModule,


    AboutModule,


    QuizUsersModule,


    ProjectsModule,
    AuthModule,
    
    UsersModule,

    ProjectRegistrationModule,


    ProjectQuestionModule,


    ProjectChoiceModule,


    ProjectExamModule,


    ProjectUserAnswerModule,


  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule { }
