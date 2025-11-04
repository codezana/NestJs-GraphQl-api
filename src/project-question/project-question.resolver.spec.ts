import { Test, TestingModule } from '@nestjs/testing';
import { ProjectQuestionResolver } from './project-question.resolver';
import { ProjectQuestionService } from './project-question.service';

describe('ProjectQuestionResolver', () => {
  let resolver: ProjectQuestionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectQuestionResolver, ProjectQuestionService],
    }).compile();

    resolver = module.get<ProjectQuestionResolver>(ProjectQuestionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
