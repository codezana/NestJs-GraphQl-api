import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectQuestionInput } from './dto/create-project-question.input';
import { UpdateProjectQuestionInput } from './dto/update-project-question.input';
import { ProjectChoice } from './entities/project-choice.entity';
import { ProjectQuestion } from './entities/project-question.entity';
import { CreateProjectChoiceInput } from './dto/create-project-choice.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectExam } from 'src/project-exam/entities/project-exam.entity';

@Injectable()
export class ProjectQuestionService {
  constructor(
    @InjectRepository(ProjectQuestion)
    private readonly projectQuestionRepository: Repository<ProjectQuestion>,
    @InjectRepository(ProjectChoice)
    private readonly projectChoiceRepository: Repository<ProjectChoice>,
    @InjectRepository(ProjectExam)
    private readonly projectExamRepository: Repository<ProjectExam>,
  ) { }


  async createWithChoices(input: CreateProjectQuestionInput) {
    const queryRunner = this.projectQuestionRepository.manager.connection.createQueryRunner();

    // Start a transaction
    await queryRunner.startTransaction();
    try {
      const exam = await this.projectExamRepository.findOne({ where: { id: input.projectExamId } });
      if (!exam) throw new NotFoundException('تاقیکردنەوەکە نەدۆزرایەوە');
      // Step 1: Create Project Question
      const question = this.projectQuestionRepository.create({
        ...input,
        projectExam: exam,
      });
      const savedQuestion = await queryRunner.manager.save(ProjectQuestion, question);

      if (!savedQuestion.id) {
        throw new Error("دروستکردنی پرسیارەکە سەرکەوتوو نەبوو. هیچ ئایدیەک نەگەڕایەوە");
      }

      // Step 2: Create Project Choices associated with the question
      const choices = input.choices.map((choiceInput: CreateProjectChoiceInput) => {
        const choice = this.projectChoiceRepository.create({
          ...choiceInput,
          projectQuestion: savedQuestion,
        });
        return choice;
      });

      await queryRunner.manager.save(ProjectChoice, choices);

      const fullQuestion = await queryRunner.manager.findOne(ProjectQuestion, {
        where: { id: savedQuestion.id },
        relations: ['projectChoice'],
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
    const questions = await this.projectQuestionRepository.find({
      relations: ['projectChoice'], // Load associated choices for each question
      order: { id: 'ASC' },   // Optionally, you can specify ordering
    });

    return questions;
  }

  async findOne(id: number) {
    const question = await this.projectQuestionRepository.findOne({
      where: { id },
      relations: ['projectChoice'], // Load associated choices
    });

    if (!question) {
      throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
    }

    return question;
  }

  async updateWithChoices(id: number, input: UpdateProjectQuestionInput) {
    const queryRunner = this.projectQuestionRepository.manager.connection.createQueryRunner();
  
    await queryRunner.startTransaction();
  
    try {
      // Step 1: Find the existing Project Question with correct relation
      const existingQuestion = await queryRunner.manager.findOne(ProjectQuestion, {
        where: { id },
        relations: ['projectChoice'], // ✅ Correct relation name
      });
  
      if (!existingQuestion) {
        throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
      }
  
      // Step 2: Update Project Question fields manually (avoid merging relations)
      if (input.title) {
        existingQuestion.title = input.title;
      }
      if (input.projectExamId) {
        const exam = await this.projectExamRepository.findOne({ where: { id: input.projectExamId } });
        if (!exam) throw new NotFoundException('تاقیکردنەوەکە نەدۆزرایەوە');
        existingQuestion.projectExam = exam;
      }
  
      const updatedQuestion = await queryRunner.manager.save(ProjectQuestion, existingQuestion);
  
      // Step 3: Replace Choices if provided
      if (input.choices) {
        // Delete old choices
        await queryRunner.manager.delete(ProjectChoice, { projectQuestion: updatedQuestion });
  
        // Create and save new choices
        const newChoices = input.choices.map(choice => {
          return this.projectChoiceRepository.create({
            ...choice,
            projectQuestion: updatedQuestion,
          });
        });
  
        await queryRunner.manager.save(ProjectChoice, newChoices);
      }
  
      // Step 4: Reload updated question with choices
      const question = await this.projectQuestionRepository.findOne({
        where: { id },
        relations: ['projectChoice'], // Ensure you include choices for return
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
    const queryRunner = this.projectQuestionRepository.manager.connection.createQueryRunner();

    // Start a transaction
    await queryRunner.startTransaction();
    try {
      // Step 1: Find the existing Project Question
      const existingQuestion = await queryRunner.manager.findOne(ProjectQuestion, {
        where: { id },
        relations: ['projectChoice'], // Include choices in the query
      });
      if (!existingQuestion) {
        throw new NotFoundException(`پرسیارەکە نەدۆزرایەوە`);
      }

      // Step 2: Remove the associated Project Choices
      await queryRunner.manager.delete(ProjectChoice, { projectQuestion: existingQuestion });

      // Step 3: Remove the Project Question
      await queryRunner.manager.delete(ProjectQuestion, id);

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
