import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsEmail, IsPhoneNumber, IsIP, IsNotEmpty } from 'class-validator';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
@ObjectType()
@Entity('quiz_users')
export class QuizUser {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => String)
  ipAddress: string;

  @OneToMany(() => ProjectRegistration, reg => reg.quizUser)
  registrations: ProjectRegistration[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
