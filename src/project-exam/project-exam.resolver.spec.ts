import { Test, TestingModule } from '@nestjs/testing';
import { ProjectExamResolver } from './project-exam.resolver';
import { ProjectExamService } from './project-exam.service';

describe('ProjectExamResolver', () => {
  let resolver: ProjectExamResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectExamResolver, ProjectExamService],
    }).compile();

    resolver = module.get<ProjectExamResolver>(ProjectExamResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
