import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('project_exam')
export class ProjectExam {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  description: string;


  @Column({ nullable: true, type: 'int' })
  @Field(() => Int, { nullable: true })
  total_degree: number;

  @Column({ type: 'boolean', default: true, nullable: true })
  @Field(() => Boolean, { nullable: true })
  isActive: boolean;

  @ManyToOne(() => Project, (project) => project.projectExam)
  @Field(() => [Project], { nullable: true })
  project?: Project;

  @OneToMany(() => ProjectQuestion, (projectQuestion) => projectQuestion.projectExam)
  @Field(() => [ProjectQuestion], { nullable: true })
  projectQuestions?: ProjectQuestion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
