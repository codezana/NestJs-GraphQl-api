import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { SocialMedia } from './social-media.entity';

@ObjectType()
@Entity({ name: 'about' })
export class About {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  logo: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.about)
  @Field(() => [SocialMedia], { nullable: true })  // Make sure it's an array
  social: SocialMedia[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
