import { Test, TestingModule } from '@nestjs/testing';
import { QuizUsersResolver } from './quiz-users.resolver';
import { QuizUsersService } from './quiz-users.service';

describe('QuizUsersResolver', () => {
  let resolver: QuizUsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizUsersResolver, QuizUsersService],
    }).compile();

    resolver = module.get<QuizUsersResolver>(QuizUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
