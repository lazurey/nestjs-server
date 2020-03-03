import { Test, TestingModule } from '@nestjs/testing';
import { MomentService } from './moment.service';
import { MomentMemoryRepository } from './moment.repository';

describe('MomentService', () => {
  let service: MomentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MomentService,
        {
          provide: 'momentDa',
          useClass: MomentMemoryRepository,
        }
      ],
    }).compile();

    service = module.get<MomentService>(MomentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
