// src/about/about.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutService } from './about.service';
import { AboutResolver } from './about.resolver';
import { About } from './entities/about.entity';
import { SocialMediaModule } from './social-media.module';
import { SocialMedia } from './entities/social-media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([About,SocialMedia]),
    SocialMediaModule,
  ],
  providers: [AboutService, AboutResolver],
  exports: [AboutService],
})
export class AboutModule {}
