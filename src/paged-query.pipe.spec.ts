import { PagedQueryPipe } from './paged-query.pipe';

describe('PagedQueryPipe', () => {
  it('should be defined', () => {
    expect(new PagedQueryPipe()).toBeDefined();
  });
  it('should convert string page value to number', () => {
    expect(PagedQueryPipe.convertToNumber(undefined, 20)).toBeUndefined();
    expect(PagedQueryPipe.convertToNumber('', 20)).toBeUndefined();
    expect(PagedQueryPipe.convertToNumber(2, 20)).toBe(2);
    expect(PagedQueryPipe.convertToNumber('1', 20)).toBe(1);
    expect(PagedQueryPipe.convertToNumber(' 1', 20)).toBe(1);
    expect(PagedQueryPipe.convertToNumber('xxx', 20)).toBe(20);
  });
  it('should transform page and size value in query, and not touch other query parameters', () => {
    const pipe = new PagedQueryPipe();
    expect(pipe.transformPagedQuery({
      page: '2',
      size: '10',
      name: 'user'
    })).toEqual({
      page: 2,
      size: 10,
      name: 'user'
    });
  });
  it('should transform query only, not other types of data', () => {
    const pipe = new PagedQueryPipe();
    const paramValue = {
      a: 'b',
    };
    expect(pipe.transform(paramValue, {
      type: 'param',
    })).toBe(paramValue);
    const queryValue = {
      page: '2',
    };
    expect(pipe.transform(queryValue, {
      type: 'query',
    })).toEqual({
      page: 2,
    });
  })
});
