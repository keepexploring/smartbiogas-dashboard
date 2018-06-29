import { environment } from '../../../environments/environment';
import { HttpResponse } from '@angular/common/http';

export class ApiResponseMeta {
  isRemote: boolean;
  itemsPerPage: number;
  offset: number;
  pageFetched: number;
  totalItems: number;
  totalPages: number;

  constructor(
    isRemote: boolean = false,
    itemsPerPage: number = environment.apiPageLimit,
    offset: number = 0,
    pageFetched: number = 0,
    totalItems: number = environment.apiPageLimit,
  ) {
    this.isRemote = isRemote;
    this.itemsPerPage = itemsPerPage;
    this.offset = offset;
    this.pageFetched = pageFetched;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
  }

  static fromResponse(response: HttpResponse<any>) {
    const totalItems = response.body.meta ? response.body.meta.total_count : 0;
    const limit: number = response.body.meta ? response.body.meta.limit : 0;
    const offset: number = response.body.meta ? response.body.meta.offset : 0;
    const page = Math.round(offset / limit) + 1;
    return new this(true, limit, offset, page, totalItems);
  }
}
