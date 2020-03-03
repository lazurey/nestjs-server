import { MomentMemoryRepository } from './moment.repository';

describe('Moment Memory Repository', () => {
  it('should generate moments', () => {
    expect(MomentMemoryRepository.generateMoments(5)).toHaveLength(5);
  });
  it('should query moments by required page and size', async () => {
    const repo = new MomentMemoryRepository();
    const result = await repo.queryByPage(1, 5);
    const total = await repo.getTotal();
    expect(result).toHaveLength(5);
    expect(total).toBe(120);
  });
});
