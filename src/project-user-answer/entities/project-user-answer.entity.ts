import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';

@ObjectType()
@Entity('project_user_answers')
export class ProjectUserAnswer {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ManyToOne(() => ProjectRegistration, registration => registration.userAnswers, { onDelete: 'CASCADE' })
    @Field(() => ProjectRegistration,{ nullable: true})
    registration: ProjectRegistration;

    @ManyToOne(() => ProjectQuestion, question => question.userAnswers, { onDelete: 'CASCADE' })
    @Field(() => ProjectQuestion,{ nullable: true})
    question: ProjectQuestion;

    @ManyToOne(() => ProjectChoice, choice => choice.userAnswers, { onDelete: 'CASCADE' })
    @Field(() => ProjectChoice,{ nullable: true})
    selectedChoice: ProjectChoice;

    @CreateDateColumn()
    @Field(() => Date)
    answeredAt: Date;

    // ✅ Computed Field — not stored in DB
    @Column({ nullable: true })
    @Field(() => Boolean,{ nullable: true})
    isCorrect: boolean;
}
