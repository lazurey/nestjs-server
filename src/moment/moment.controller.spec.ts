import { Test, TestingModule } from '@nestjs/testing';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';
import { MomentMemoryRepository } from './moment.repository';

describe('Moment Controller', () => {
  let controller: MomentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MomentController],
      providers: [
        MomentService,
        {
          provide: 'momentDa',
          useClass: MomentMemoryRepository,
        }
      ],
    }).compile();

    controller = module.get<MomentController>(MomentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
