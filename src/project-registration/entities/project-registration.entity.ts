import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { QuizUser } from 'src/quiz-users/entities/quiz-user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';

@ObjectType()
@Entity('project_registrations')
export class ProjectRegistration {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => QuizUser, { eager: true })
  @JoinColumn({ name: 'quizUserId' })
  @Field(() => QuizUser)
  quizUser: QuizUser;

  @ManyToOne(() => Project, project => project.registrations, { eager: true })
  @JoinColumn({ name: 'projectId' })
  @Field(() => Project)
  project: Project;

  @OneToMany(() => ProjectUserAnswer, answer => answer.registration)
  @Field(() => [ProjectUserAnswer], { nullable: true })
  userAnswers?: ProjectUserAnswer[];

  @CreateDateColumn()
  @Field(() => Date)
  registeredAt: Date;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  totalScore?: number;

}
