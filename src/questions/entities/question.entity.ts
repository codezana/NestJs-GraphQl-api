import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Choice } from 'src/questions/entities/choice.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
@ObjectType()
@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ناسێنەری تایبەت بۆ پرسیارەکان' })
  id: number;

  @Column()
  @Field(() => String, { description: 'ناونیشانی پرسیارەکان' })
  title: string;

  @Column({nullable:true})
  @Field(() => Int, { description: 'نمرەی پرسیارەکان' ,nullable:true})
  degree: number;
  
  @ManyToOne(() => Level, (level) => level.questions)
  @Field(() => Level,{nullable:true})
  level?: Level;
  
  @OneToMany(() => Choice, (choice) => choice.question)
  @Field(() => [Choice],{nullable:true})
  choices?: Choice[];

  @CreateDateColumn()
  @Field(() => Date, { description: 'بەرواری دروستکردنی هەڵبژاردن' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'دوا بەرواری نوێکردنەوەی هەڵبژاردن' })
  updatedAt: Date;
}
