// src/social-media/social-media.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from './entities/social-media.entity';
import { SocialMediaService } from './social.service';
import { AboutModule } from 'src/about/about.module';  // Import AboutModule with forwardRef()
import { About } from './entities/about.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialMedia,About]),
    forwardRef(() => AboutModule),  // Use forwardRef() to resolve circular dependency
  ],
  providers: [SocialMediaService],
  exports: [SocialMediaService],  // Export SocialMediaService for use in other modules
})
export class SocialMediaModule {}
