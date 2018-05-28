import { environment } from '../../environments/environment';

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
}
