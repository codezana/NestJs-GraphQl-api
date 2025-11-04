import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Choice } from 'src/questions/entities/choice.entity';
import { Level } from 'src/levels/entities/level.entity';
import { CreateChoiceInput } from './dto/create-choice.input';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) { }


  async createWithChoices(input: CreateQuestionInput) {
    const queryRunner = this.questionRepository.manager.connection.createQueryRunner();

    // Start a transaction
    await queryRunner.startTransaction();
    try {
      const level = await this.levelRepository.findOne({ where: { id: input.levelId } });
      if (!level) throw new NotFoundException('ئاستەکە نەدۆزرایەوە');
      // Step 1: Create Project Question
      const question = this.questionRepository.create({
        ...input,
        level: level,
      });
      const savedQuestion = await queryRunner.manager.save(Question, question);

      if (!savedQuestion.id) {
        throw new Error("دروستکردنی پرسیارەکە سەرکەوتوو نەبوو. هیچ ئایدیەک نەگەڕایەوە");
      }

      // Step 2: Create Project Choices associated with the question
      const choices = input.choices.map((choiceInput: CreateChoiceInput) => {
        const choice = this.choiceRepository.create({
          ...choiceInput,
          question: savedQuestion,
        });
        return choice;
      });

      await queryRunner.manager.save(Choice, choices);

      const fullQuestion = await queryRunner.manager.findOne(Question, {
        where: { id: savedQuestion.id },
        relations: ['choices'],
      });
      
      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        status: 200,
        message: 'پرسیار و هەڵبژاردنەکان بە سەرکەوتوویی دروستکراون',
        data: fullQuestion
      };
    } catch (error) {
      // Rollback if an error occurs
      await queryRunner.rollbackTransaction();
      throw error; // Rethrow error to be handled in the resolver
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const questions = await this.questionRepository.find({
      relations: ['choices']
    });

    return questions;
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['choices']
    });

    if (!question) {
      throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
    }

    return question;
  }

  async updateWithChoices(id: number, input: UpdateQuestionInput) {
    const queryRunner = this.questionRepository.manager.connection.createQueryRunner();
  
    await queryRunner.startTransaction();
  
    try {
      // Step 1: Find the existing Project Question with correct relation
      const existingQuestion = await queryRunner.manager.findOne(Question, {
        where: { id },
        relations: ['choices'], // ✅ Correct relation name
      });
  
      if (!existingQuestion) {
        throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
      }
  
      // Step 2: Update Project Question fields manually (avoid merging relations)
      if (input.title) {
        existingQuestion.title = input.title;
      }
      if (input.levelId) {
        const level = await this.levelRepository.findOne({ where: { id: input.levelId } });
        if (!level) throw new NotFoundException('ئاستەکە نەدۆزرایەوە');
        existingQuestion.level = level;
      }
  
      const updatedQuestion = await queryRunner.manager.save(Question, existingQuestion);
  
      // Step 3: Replace Choices if provided
      if (input.choices) {
        // Delete old choices
        await queryRunner.manager.delete(Choice, { question: updatedQuestion });
  
        // Create and save new choices
        const newChoices = input.choices.map(choice => {
          return this.choiceRepository.create({
            ...choice,
            question: updatedQuestion,
          });
        });
  
        await queryRunner.manager.save(Choice, newChoices);
      }
  
      // Step 4: Reload updated question with choices
      const question = await this.questionRepository.findOne({
        where: { id },
        relations: ['choices'], // Ensure you include choices for return
      });
  
      if (!question) throw new NotFoundException('Question not found');
  
      // Step 5: Commit and return
      await queryRunner.commitTransaction();
  
      return {
        status: 200,
        message: 'پرسیار و هەڵبژاردنەکان بە سەرکەوتوویی نوێکرانەوە',
        data: question,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  

  async removeWithChoices(id: number) {
    const queryRunner = this.questionRepository.manager.connection.createQueryRunner();

    // Start a transaction
    await queryRunner.startTransaction();
    try {
      // Step 1: Find the existing Project Question
      const existingQuestion = await queryRunner.manager.findOne(Question, {
        where: { id },
        relations: ['choices'], // Include choices in the query
      });
      if (!existingQuestion) {
        throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
      }

      // Step 2: Remove the associated Project Choices
      await queryRunner.manager.delete(Choice, { question: existingQuestion });

      // Step 3: Remove the Project Question
      await queryRunner.manager.delete(Question, id);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        status: 200,
        message: 'پرسیار و هەڵبژاردنەکان بە سەرکەوتوویی سڕانەوە',
      };
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
  
}
