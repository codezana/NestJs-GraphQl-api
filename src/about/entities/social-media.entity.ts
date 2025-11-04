import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { About } from './about.entity';

@ObjectType()
@Entity({ name: 'social_media' })
export class SocialMedia {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  icon: string;  // Icon name or URL

  @Column()
  @Field(() => String)
  url: string;  // The URL of the social media profile

  @ManyToOne(() => About, (about) => about.social)
  @Field(() => About, { nullable: true })
  about?: About;  // Relation to the About entity
}
