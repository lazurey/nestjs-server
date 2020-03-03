import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isNaN } from 'lodash'
@Injectable()
export class PagedQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query' || !value || typeof value !== 'object') {
      return value;
    }
    return this.transformPagedQuery(value);
  }

  static convertToNumber(raw: any, defaultValue: number): number | undefined {
    if (typeof raw === 'number') {
      return raw;
    }
    if (raw !== undefined && typeof raw === 'string' && raw !== '') {
      const result = parseInt(raw, 10);
      return isNaN(result) ? defaultValue : result;
    }
    return undefined;
  }

  transformPagedQuery(query: any) {
    query.page = PagedQueryPipe.convertToNumber(query.page, 0);
    query.size = PagedQueryPipe.convertToNumber(query.size, 20);
    return query;
  }

}
