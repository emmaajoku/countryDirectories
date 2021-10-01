import { Test, TestingModule } from '@nestjs/testing';
import { CountrydirectoryController } from './countrydirectory.controller';
import { CountrydirectoryService } from './countrydirectory.service';

describe('CountrydirectoryController', () => {
  let controller: CountrydirectoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountrydirectoryController],
      providers: [CountrydirectoryService],
    }).compile();

    controller = module.get<CountrydirectoryController>(CountrydirectoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
