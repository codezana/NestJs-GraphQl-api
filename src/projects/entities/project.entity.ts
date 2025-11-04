import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  description: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  @Field(() => Boolean, { nullable: true })
  isActive: boolean;

  @OneToMany(() => ProjectRegistration, reg => reg.project)
  registrations: ProjectRegistration[];

  @OneToMany(() => ProjectExam, (projectExam) => projectExam.project)
  @Field(() => [ProjectExam], { nullable: true })
  projectExam?: ProjectExam[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
