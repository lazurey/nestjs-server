import { Test, TestingModule } from '@nestjs/testing';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';
import { MomentMemoryRepository } from './moment.repository';
import { Moment } from './moment.interface';
import { PagedResponse } from '../response.interface';

describe('Moment Controller', () => {
  let controller: MomentController;
  let momentService: MomentService;

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
    momentService = module.get<MomentService>(MomentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch a list of moments by given page and size', async () => {
    const result = {
      items: [],
    } as PagedResponse<Moment>;
    jest.spyOn(momentService, 'queryMomentsByPage').mockImplementationOnce(() => Promise.resolve(result));
    expect(await controller.getMoments({
      page: 0,
      size: 20,
    })).toBe(result);
  });

  it('should return default 1st page with 20 items if not specified', async () => {
    const queryMomentsByPage = jest.fn();
    momentService.queryMomentsByPage = queryMomentsByPage;
    await controller.getMoments({});
    expect(queryMomentsByPage).toHaveBeenCalledTimes(1);
    expect(queryMomentsByPage).toHaveBeenCalledWith(0, 20);
  });

  it('should get specified moment by id', async () => {
    const result = {
      id: 'm-1',
      createdBy: {
        username: 'robo_head',
      },
      content: 'hello world',
      createdAt: new Date('2020-01-01 00:00:00'),
    };
    jest.spyOn(momentService, 'queryById').mockResolvedValueOnce(result);
    const moment = await controller.getMomentById('m-1');
    expect(moment).toBe(result);
  });
  it('should throw not found error when moment not found by id', () => {
    jest.spyOn(momentService, 'queryById').mockResolvedValueOnce(undefined);
    expect(controller.getMomentById('whatever-id'))
      .rejects
      .toThrow();
  });
});
