import { Test, TestingModule } from '@nestjs/testing';
import { AboutResolver } from './about.resolver';
import { AboutService } from './about.service';

describe('AboutResolver', () => {
  let resolver: AboutResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutResolver, AboutService],
    }).compile();

    resolver = module.get<AboutResolver>(AboutResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
