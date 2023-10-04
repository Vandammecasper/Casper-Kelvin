import { Test, TestingModule } from '@nestjs/testing';
import { VacationsResolver } from './vacations.resolver';
import { VacationsService } from './vacations.service';

describe('VacationsResolver', () => {
  let resolver: VacationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacationsResolver, VacationsService],
    }).compile();

    resolver = module.get<VacationsResolver>(VacationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
