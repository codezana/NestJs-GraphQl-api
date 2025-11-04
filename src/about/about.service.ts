import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutInput } from './dto/create-about.input';
import { UpdateAboutInput } from './dto/update-about.input';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from './entities/about.entity';
import { Repository } from 'typeorm';
import { SocialMedia } from './entities/social-media.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
    @InjectRepository(SocialMedia)
    private socialRepository: Repository<SocialMedia>,
  ) { }

  async create(input: CreateAboutInput) {
    const about = this.aboutRepository.create(input);
   const saved= await this.aboutRepository.save(about);

    return {
      status: 200,
      message: 'دەربارە بە سەرکەوتوویی دروستکرا',
      data: saved, 
    }
  }

  async findAll() {
    const about = await this.aboutRepository.findOne({
      relations: ['social'],
      order: {
        id: 'ASC'
      }
    });
    return about;
  }

  async findOne(id: number) {
    const about = await this.aboutRepository.findOne({
      where: {
        id: id
      },
      relations: ['social'],
      order: {
        id: 'ASC'
      }
    });
    if (!about) {
      throw new NotFoundException(`دەربارەی داواکراو نەدۆزرایەوە`);
    }
    return about;
  }

  async update(id: number, updateaboutInput: UpdateAboutInput) {
    const about = await this.findOne(id);
    Object.assign(about, updateaboutInput);
    const saved = await this.aboutRepository.save(about);
    return {
      status: 200,
      message: 'دەربارە بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }
  
  

  async remove(id: number) {
    const about = await this.findOne(id);
    const social = await this.aboutRepository.count({ where: { social: { id } } });
  
    if (social > 0) {
      return {
        status: 400,
        message: 'ناتوانرێت ئەم دەربارەیە بسڕدرێت چونکە سۆشیال لەسەری دروستکراون'
      };
    }
  
    await this.aboutRepository.remove(about);
    return {
      status: 200,
      message: 'دەربارە بە سەرکەوتوویی سڕایەوە'
    };
  }
}
