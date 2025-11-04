import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectUserAnswer } from 'src/project-user-answer/entities/project-user-answer.entity';
import { CreateProjectUserAnswerInput } from './dto/create-project-user-answer.input';
import { ProjectRegistration } from 'src/project-registration/entities/project-registration.entity';
import { ProjectQuestion } from 'src/project-question/entities/project-question.entity';
import { ProjectChoice } from 'src/project-question/entities/project-choice.entity';

@Injectable()
export class ProjectUserAnswerService {
  constructor(
    @InjectRepository(ProjectUserAnswer)
    private readonly answerRepo: Repository<ProjectUserAnswer>,

    @InjectRepository(ProjectRegistration)
    private readonly registrationRepo: Repository<ProjectRegistration>,

    @InjectRepository(ProjectQuestion)
    private readonly questionRepo: Repository<ProjectQuestion>,

    @InjectRepository(ProjectChoice)
    private readonly choiceRepo: Repository<ProjectChoice>,
  ) { }

  async create(createAnswerInput: CreateProjectUserAnswerInput) {
    const { registrationId, questionId, selectedChoiceId } = createAnswerInput;
  
    const registration = await this.registrationRepo.findOne({
      where: { id: registrationId },
      relations: ['project.projectExam'],
    });
  
    if (!registration) {
      throw new Error('تۆمارکردن نەدۆزرایەوە');
    }
  
    const question = await this.questionRepo.findOneByOrFail({ id: questionId });
    const choice = await this.choiceRepo.findOneByOrFail({ id: selectedChoiceId });
  
    const isCorrect = choice.isCorrect === true;
  
    const newAnswer = this.answerRepo.create({
      registration,
      question,
      selectedChoice: choice,
      isCorrect,
    });
  
    await this.answerRepo.save(newAnswer);
  
    // Get all answers for the user + load question degrees
    const userAnswers = await this.answerRepo.find({
      where: { registration: { id: registration.id } },
      relations: ['question'],
    });
  
    // Calculate score from correct answers
    let score = 0;
    for (const answer of userAnswers) {
      if (answer.isCorrect) {
        score += answer.question.degree ?? 0;
      }
    }
  
    // Prevent score from exceeding exam total_degree
    const maxScore = registration.project?.projectExam?.[0]?.total_degree ?? 100;
    if (score > maxScore) {
      score = maxScore;
    }
  
    await this.registrationRepo.update(registration.id, { totalScore: score });
  
    return {
      status: 200,
      message: 'وەڵام بە سەرکەوتوویی دروستکرا',
      data: newAnswer,
    };
  }
  


  async findAll() {
    const findall = await this.answerRepo.find({ relations: ['registration', 'question', 'selectedChoice'] });
    return findall;
  }

  async findOne(id: number) {
    const userAnswers = await this.answerRepo.findOne({
      where: { id },
      relations: ['registration', 'question', 'selectedChoice'],
    });
    return userAnswers;
  }
}
