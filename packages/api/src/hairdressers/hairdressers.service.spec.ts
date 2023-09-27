import { Test, TestingModule } from '@nestjs/testing';
import { HairdressersService } from './hairdressers.service';

describe('HairdressersService', () => {
  let service: HairdressersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HairdressersService],
    }).compile();

    service = module.get<HairdressersService>(HairdressersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
