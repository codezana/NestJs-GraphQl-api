import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectRegistration } from './entities/project-registration.entity';
import { CreateProjectRegistrationInput } from './dto/create-project-registration.input';
import { UpdateProjectRegistrationInput } from './dto/update-project-registration.input';
import { QuizUser } from 'src/quiz-users/entities/quiz-user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { CreateQuizUserInput } from 'src/quiz-users/dto/create-quiz-user.input';

@Injectable()
export class ProjectRegistrationService {
  constructor(
    @InjectRepository(ProjectRegistration)
    private readonly registrationRepo: Repository<ProjectRegistration>,

    @InjectRepository(QuizUser)
    private readonly quizUserRepo: Repository<QuizUser>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) { }
  async create(input: CreateProjectRegistrationInput, quizUserInput: CreateQuizUserInput) {
    const project = await this.projectRepo.findOneBy({ id: input.projectId });
    if (!project) {
      throw new NotFoundException('پرۆژەی هەڵبژێراو نەدۆزرایەوە');
    }
  
    // Step 1: Create the quiz user
    const quizUser = this.quizUserRepo.create({
      name: quizUserInput.name,
      phone: quizUserInput.phone,
      email: quizUserInput.email,
      city: quizUserInput.city,
      ipAddress: quizUserInput.ipAddress,
    });
    const savedQuizUser = await this.quizUserRepo.save(quizUser);
  
    // Step 2: Register the user to the project
    const registration = this.registrationRepo.create({
      quizUser: savedQuizUser,
      project: project,
    });
    const savedRegistration = await this.registrationRepo.save(registration);
  
    return {
      status: 200,
      message: 'تۆمارکردنی یوزەر بۆ پرۆژە بە سەرکەوتوویی ئەنجامدرا',
      data: savedRegistration,
    };
  }
  
  

  async findAll() {
    const list = await this.registrationRepo.find({
      relations: [
        'project',
        'project.projectExam',
        'project.projectExam.projectQuestions',
        'project.projectExam.projectQuestions.projectChoice',
        'quizUser',
        'userAnswers',
        'userAnswers.question',
        'userAnswers.selectedChoice', // ✅ To show selected choice detail
      ],
      order: {
        id: 'DESC',
      },
    });
    return list;
  }

  async findOne(id: number) {
    const found = await this.registrationRepo.findOne({ 
      where: { id },
      relations: [
        'project',
        'project.projectExam',
        'project.projectExam.projectQuestions',
        'project.projectExam.projectQuestions.projectChoice',
        'quizUser'
      ],
     });
    if (!found) {
      throw new NotFoundException('تۆمارکراوی داواکراو نەدۆزرایەوە');
    }
    return found;
  }
  async update(id: number, input: UpdateProjectRegistrationInput) {
    const found = await this.registrationRepo.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('تۆمارکراوی داواکراو نەدۆزرایەوە');
    }
    const updated = await this.registrationRepo.save({ ...found, ...input });
    return {
      status: 200,
      message: 'تۆمارکراو نوێکرایەوە ',
      data: updated,
    }
  }

  async remove(id: number) {
    const found = await this.registrationRepo.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('تۆمارکراوی داواکراو نەدۆزرایەوە');
    }
    await this.registrationRepo.remove(found);
    return {
      status: 200,
      message: 'تۆمارکراو سڕایەوە',
    };
  }


 
  
}
