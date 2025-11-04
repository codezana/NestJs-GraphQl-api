import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('project_question')
export class ProjectQuestion {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column({nullable:true,type:'int'})
  @Field(() => Int,{nullable:true})
  degree: number;

  @ManyToOne(() => ProjectExam, (projectExam) => projectExam.projectQuestions)
  @Field(() => ProjectExam, { nullable: true })
  projectExam?: ProjectExam;


  @OneToMany(() => ProjectChoice, (projectChoice) => projectChoice.projectQuestion)
  @Field(() => [ProjectChoice], { nullable: true })
  projectChoice?: ProjectChoice[];

  @OneToMany(() => ProjectUserAnswer, answer => answer.question)
  @Field(() => [ProjectUserAnswer], { nullable: true })
  userAnswers?: ProjectUserAnswer[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

}
