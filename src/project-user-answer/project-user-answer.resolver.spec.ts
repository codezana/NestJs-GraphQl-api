import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUserAnswerResolver } from './project-user-answer.resolver';
import { ProjectUserAnswerService } from './project-user-answer.service';

describe('ProjectUserAnswerResolver', () => {
  let resolver: ProjectUserAnswerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectUserAnswerResolver, ProjectUserAnswerService],
    }).compile();

    resolver = module.get<ProjectUserAnswerResolver>(ProjectUserAnswerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
