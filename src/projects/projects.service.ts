import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  async create(input: CreateProjectInput) {
    const project = this.projectRepository.create(input);
    const saved = await this.projectRepository.save(project);
    return {
      status: 201,
      message: 'پڕۆژە بە سەرکەوتوویی دروستکرا',
      data: saved,
    };
  }

  async findAll() {
    return this.projectRepository.find({
      relations:[
        'projectExam',
        'projectExam.projectQuestions',
        'projectExam.projectQuestions.projectChoice',
      ],
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      order: {
        id: 'ASC'
      }
    });
    if (!project) {
      throw new NotFoundException(`پڕۆژەی داواکراو نەدۆزرایەوە`);
    }
    return project;
  }

  async update(id: number, input: UpdateProjectInput) {
    const project = await this.findOne(id);
    Object.assign(project, input);
    const saved = await this.projectRepository.save(project);
    return {
      status: 200,
      message: 'پڕۆژە بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
    return {
      status: 200,
      message: 'پڕۆژە بە سەرکەوتوویی سڕایەوە'
    };
  }
}
