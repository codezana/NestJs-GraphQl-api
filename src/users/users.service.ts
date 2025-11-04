// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async onModuleInit() {
    const adminExists = await this.userRepo.findOne({ where: { username: 'admin' } });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin@admin', 10); // Change to strong pass in prod
      const admin = this.userRepo.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await this.userRepo.save(admin);
    }
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }
}

// ✅ User service with method to find all users.