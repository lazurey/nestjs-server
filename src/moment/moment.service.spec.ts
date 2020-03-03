import { Test, TestingModule } from '@nestjs/testing';
import { MomentService } from './moment.service';
import { MomentMemoryRepository } from './moment.repository';

describe('MomentService', () => {
  let service: MomentService;
  let repo: MomentMemoryRepository;

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
    repo = module.get<MomentMemoryRepository>('momentDa');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert repo query result to response required paged result', async () => {
    const dbResult = MomentMemoryRepository.generateMoments(5);
    jest.spyOn(repo, 'getTotal').mockResolvedValue(42);
    jest.spyOn(repo, 'queryByPage').mockResolvedValue(dbResult);

    const result = await service.queryMomentsByPage(0, 5);
    expect(result).toEqual({
      items: dbResult,
      currentPage: 0,
      pageSize: 5,
      totalPages: 9,
      totalCount: 42,
      isLast: false,
    });
  });

  it('should query moment by id', async () => {
    const moment = MomentMemoryRepository.generateMoments(1)[0];
    jest.spyOn(repo, 'queryById').mockResolvedValueOnce(moment);
    const result = await service.queryById('m-0');
    expect(result.id).toBe('m-0');
    const resultNotFound = await service.queryById('something-not-exists');
    expect(resultNotFound).toBeUndefined();
  });
});
