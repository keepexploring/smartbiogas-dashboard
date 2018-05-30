import { environment } from '../../environments/environment';
import { HttpResponse } from '@angular/common/http';

export class ApiResponseMeta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;

  constructor(
    totalItems: number = environment.apiPageLimit,
    itemsPerPage: number = environment.apiPageLimit,
  ) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
  }

  static fromResponse(response: HttpResponse<any>) {
    const totalItems = response.body.meta ? response.body.meta.total_count : 0;
    const itemsPerPage = response.body.meta ? response.body.meta.limit : 0;
    return new this(totalItems, itemsPerPage);
  }
}
