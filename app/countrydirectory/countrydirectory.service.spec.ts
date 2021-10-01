import { Test, TestingModule } from '@nestjs/testing';
import { CountrydirectoryService } from './countrydirectory.service';

describe('CountrydirectoryService', () => {
  let service: CountrydirectoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountrydirectoryService],
    }).compile();

    service = module.get<CountrydirectoryService>(CountrydirectoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
