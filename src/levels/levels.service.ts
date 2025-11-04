import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLevelInput } from './dto/create-level.input';
import { UpdateLevelInput } from './dto/update-level.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';
import { Part } from 'src/parts/entities/part.entity';
import { Question } from 'src/questions/entities/question.entity';

@Injectable()
export class LevelsService {

  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
    @InjectRepository(Part)
    private partRepository: Repository<Part>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) { }

  async create(input: CreateLevelInput) {
    // 1. Find the Part
    const part = await this.partRepository.findOne({ where: { id: input.partId } });
    if (!part) {
      throw new NotFoundException(`بەشی داواکراو نەدۆزرایەوە`);
    }

    // 2. Create the Level and assign the relation
    const level = this.levelRepository.create({
      title: input.title,
      level_key: input.level_key,
      is_active: input.is_active,
      part,               // <— assign the Part entity here
    });

    // 3. Save and return
   const saved= await this.levelRepository.save(level);

    return {
      status: 200,
      message: 'ئاست بە سەرکەوتوویی دروستکرا',
      data: saved, 
    }
  }

  async findAll() {
    const levels = await this.levelRepository.find({
      relations: ['questions'],
      order: {
        id: 'ASC'
      }
    });
    return levels;
  }

  async findOne(id: number) {
    const level = await this.levelRepository.findOne({
      where: {
        id: id
      },
      relations: ['questions'],
      order: {
        id: 'ASC'
      }
    });
    if (!level) {
      throw new NotFoundException(`ئاستی داواکراو نەدۆزرایەوە`);
    }
    return level;
  }

  async update(id: number, updateLevelInput: UpdateLevelInput) {
    const level = await this.findOne(id);
    Object.assign(level, updateLevelInput);
  
    // If partId is updated and you want to update the associated part's title in the level:
    if (updateLevelInput.partId && updateLevelInput.partId !== level.part?.id) {
      const newPart = await this.partRepository.findOne({ where: { id: updateLevelInput.partId } });
      if (!newPart) {
        throw new NotFoundException('بەشی داواکراو نەدۆزرایەوە');
      }
      level.part = newPart;
    }
  
    const saved = await this.levelRepository.save(level);
    return {
      status: 200,
      message: 'ئاست بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }
  
  

  async remove(id: number) {
    const level = await this.findOne(id);
    const questions = await this.questionRepository.count({ where: { level: { id } } });
  
    if (questions > 0) {
      return {
        status: 400,
        message: 'ناتوانرێت ئەم ئاستە بسڕدرێت چونکە پرسیارەکان لەسەری دروستکراون'
      };
    }
  
    await this.levelRepository.remove(level);
    return {
      status: 200,
      message: 'ئاست بە سەرکەوتوویی سڕایەوە'
    };
  }
  
}
