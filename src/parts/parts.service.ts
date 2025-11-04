import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartInput } from './dto/create-part.input';
import { UpdatePartInput } from './dto/update-part.input';
import { Part } from './entities/part.entity';
import { PartResponse } from 'src/response/responses';
import { Level } from 'src/levels/entities/level.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) { }

  async create(input: CreatePartInput) {
    const part = this.partRepository.create(input);
    const saved = await this.partRepository.save(part);
    return {
      status: 201,
      message: 'بەش بە سەرکەوتوویی دروستکرا',
      data: saved,
    };
  }

  async findAll() {
    return this.partRepository.find({
      relations: [
        'levels',
        'levels.questions',
        'levels.questions.choices'
      ],
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    const part = await this.partRepository.findOne({
      where: { id },
      relations: [
        'levels',
        'levels.questions',
        'levels.questions.choices'
      ],
      order: {
        id: 'ASC'
      }
    });
    if (!part) {
      throw new NotFoundException(`بەشی داواکراو نەدۆزرایەوە`);
    }
    return part;
  }

  async update(id: number, input: UpdatePartInput,) {
    const part = await this.findOne(id);
    Object.assign(part, input);
    const saved = await this.partRepository.save(part);
    return {
      status: 200,
      message: 'بەش بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }

  async remove(id: number) {
    const part = await this.findOne(id);
    const levels = await this.levelRepository.count({ where: { part: { id } } });

    if (levels > 0) {
      return {
        status: 400,
        message: 'ناتوانرێت ئەم بەشە بسڕدرێت چونکە ئاست لەسەری دروستکراوە'
      };
    }

    await this.partRepository.remove(part);
    return {
      status: 200,
      message: 'بەش بە سەرکەوتوویی سڕایەوە'
    };
  }

}