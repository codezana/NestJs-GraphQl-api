import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsResolver } from './parts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { Level } from 'src/levels/entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part,Level])],

  providers: [PartsResolver, PartsService],
})
export class PartsModule {}
