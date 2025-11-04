import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Part } from 'src/parts/entities/part.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
@ObjectType()
@Entity({ name: 'levels' })
export class Level {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ناسێنەری تایبەت بۆ ئاستەکان' })
  id: number;

  @Column()
  @Field(() => String, { description: 'ناونیشانی ئاستەکان' })
  title: string;

  @Column()
  @Field(() => Int, { description: 'ژمارەی ئاستەکان' })
  level_key: number;


  @Column({ default: true })
  @Field(() => Boolean, { description: 'ئایا ئاستەکە چالاکە' })
  is_active: boolean;

  @ManyToOne(() => Part, (part) => part.levels)
  @Field(() => Part,{nullable:true})
  part?: Part;
  
  @OneToMany(() => Question, (question) => question.level)
  @Field(() => [Question], { nullable: true })
  questions?: Question[];
  
  
  @CreateDateColumn()
  @Field(() => Date, { description: 'بەرواری دروستکردنی هەڵبژاردن' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'دوا بەرواری نوێکردنەوەی هەڵبژاردن' })
  updatedAt: Date;
}
