import { Test, TestingModule } from '@nestjs/testing';
import { HairdressersResolver } from './hairdressers.resolver';
import { HairdressersService } from './hairdressers.service';

describe('HairdressersResolver', () => {
  let resolver: HairdressersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HairdressersResolver, HairdressersService],
    }).compile();

    resolver = module.get<HairdressersResolver>(HairdressersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
