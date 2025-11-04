import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('project_choice')
export class ProjectChoice {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  choiceKey: string;

  @Column('text')
  @Field(() => String)
  choiceText: string;

  @Column({ default: false })
  @Field(() => Boolean, {  defaultValue: false })
  isCorrect: boolean;

  @ManyToOne(() => ProjectQuestion, (question) => question.projectChoice)
  @Field(() => ProjectQuestion,{nullable:true})
  @JoinColumn({ name: 'projectQuestionId' })
  projectQuestion?: ProjectQuestion;

  @OneToMany(() => ProjectUserAnswer, answer => answer.selectedChoice)
  @Field(() => [ProjectUserAnswer], { nullable: true })
  userAnswers?: ProjectUserAnswer[]; 
  
  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
