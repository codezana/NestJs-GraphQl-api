import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizUserInput } from './dto/create-quiz-user.input';
import { UpdateQuizUserInput } from './dto/update-quiz-user.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizUser } from './entities/quiz-user.entity';

@Injectable()
export class QuizUsersService {
  constructor(
    @InjectRepository(QuizUser)
    private readonly quizRepository: Repository<QuizUser>,
  ) { }

  async findAll() {
    return this.quizRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      order: {
        id: 'ASC'
      }
    });
    if (!quiz) {
      throw new NotFoundException(`پرسیاری یوزەرەکانی داواکراو نەدۆزرایەوە`);
    }
    return quiz;
  }

  async update(id: number, input: UpdateQuizUserInput) {
    const quiz = await this.findOne(id);
    Object.assign(quiz, input);
    const saved = await this.quizRepository.save(quiz);
    return {
      status: 200,
      message: 'پرسیاری یوزەرەکان بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }

  async remove(id: number) {
    const quiz = await this.findOne(id);
    await this.quizRepository.remove(quiz);
    return {
      status: 200,
      message: 'پرسیاری یوزەرەکان بە سەرکەوتوویی سڕایەوە'
    };
  }
}
