import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'choices' })
export class Choice {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ناسێنەری تایبەت بۆ هەڵبژاردن' })
  id: number;

  @Column()
  @Field(() => String, { description: 'کلیلی هەڵبژاردن (A, B, C, D)' })
  choiceKey: string;

  @Column('text')
  @Field(() => String, { description: 'ناوەڕۆکی دەقی هەڵبژاردن' })
  choiceText: string;

  @Column({ default: false })
  @Field(() => Boolean, { description: 'ئایا ئەم هەڵبژاردنە ڕاستە', defaultValue: false })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.choices)
  @Field(() => Question,{nullable:true})
  @JoinColumn({ name: 'questionId' })
  question?: Question;

  @CreateDateColumn()
  @Field(() => Date, { description: 'بەرواری دروستکردنی هەڵبژاردن' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'دوا بەرواری نوێکردنەوەی هەڵبژاردن' })
  updatedAt: Date;
}
