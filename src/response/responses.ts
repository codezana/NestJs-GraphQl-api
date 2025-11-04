import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Part } from '../parts/entities/part.entity';
import { Level } from '../levels/entities/level.entity';
import { Question } from '../questions/entities/question.entity';
import { Choice } from '../questions/entities/choice.entity';
import { About } from 'src/about/entities/about.entity';
import { SocialMedia } from 'src/about/entities/social-media.entity';
import { QuizUser } from 'src/quiz-users/entities/quiz-user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';

@ObjectType()
export class PartResponse {
  @Field(() => Part, { nullable: true })
  data?: Part;

  @Field()
  message: string;

  @Field(() => Int)
  status: number;
}

@ObjectType()
export class LevelResponse {
  @Field(() => Level, { nullable: true })
  data?: Level;

  @Field()
  message: string;

  @Field(() => Int)
  status: number;
}

@ObjectType()
export class QuestionResponse {
  @Field(() => Question, { nullable: true })
  data?: Question;

  @Field()
  message: string;

  @Field(() => Int)
  status: number;
}

@ObjectType()
export class ChoiceResponse {
  @Field(() => Choice, { nullable: true })
  data?: Choice;

  @Field()
  message: string;

  @Field(() => Int)
  status: number;
}

@ObjectType()
export class AboutResponse {
 @Field(() => About, { nullable: true })
 data?: About; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}

@ObjectType()
export class SocialResponse {
 @Field(() => SocialMedia, { nullable: true })
 data?: SocialMedia; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}

@ObjectType()
export class QuizUserResponse {
 @Field(() => QuizUser, { nullable: true })
 data?: QuizUser; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}

@ObjectType()
export class ProjectResponse {
 @Field(() => Project, { nullable: true })
 data?: Project; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}

@ObjectType()
export class ProjectRegistrationResponse {
 @Field(() => ProjectRegistration, { nullable: true })
 data?: ProjectRegistration; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}

@ObjectType()
export class ProjectQuestionResponse {
 @Field(() => ProjectQuestion, { nullable: true })
 data?: ProjectQuestion; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}

@ObjectType()
export class ProjectChoiceResponse {
 @Field(() => ProjectChoice, { nullable: true })
 data?: ProjectChoice; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}
@ObjectType()
export class ProjectExamResponse {
 @Field(() => ProjectExam, { nullable: true })
 data?: ProjectExam; 

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
}
@ObjectType()
export class ProjectUserAnswerResponse {
 @Field(() => ProjectUserAnswer, { nullable: true })
 data?: ProjectUserAnswer;

 @Field()
 message: string;

 @Field(() => Int)
 status: number;
 
}

