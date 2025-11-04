import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRegistrationResolver } from './project-registration.resolver';
import { ProjectRegistrationService } from './project-registration.service';

describe('ProjectRegistrationResolver', () => {
  let resolver: ProjectRegistrationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectRegistrationResolver, ProjectRegistrationService],
    }).compile();

    resolver = module.get<ProjectRegistrationResolver>(ProjectRegistrationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
