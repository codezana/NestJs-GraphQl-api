import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Level } from 'src/levels/entities/level.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'parts' })
export class Part {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ناسێنەری تایبەت بۆ بەش' })
  id: number;

  @Column()
  @Field(() => String, { description: 'ناونیشانی بەش' })
  title: string;

  @Column('text')
  @Field(() => String, { description: 'وەسفی بەش' })
  description: string;

  @Column()
  @Field(() => String, { description: 'وێنۆچکەی بەش' })
  icon: string;

  @Column({ default: true })
  @Field(() => Boolean, { description: 'ئایا بەشەکە چالاکە' })
  is_active: boolean;

  @OneToMany(() => Level, (level) => level.part)
  @Field(() => [Level], { description: 'ئاستەکانی ئەم بەشە' ,nullable:true})
  levels?: Level[];

  @CreateDateColumn()
  @Field(() => Date, { description: 'بەرواری دروستکردنی بەش' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'دوا بەرواری نوێکردنەوەی بەش' })
  updatedAt: Date;
}
