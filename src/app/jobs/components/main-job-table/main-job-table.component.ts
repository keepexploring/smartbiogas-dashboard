import { Component, OnInit } from '@angular/core';
import { ApiResponseMeta } from '../../../shared/models/api-response-meta';
import { environment } from '../../../../environments/environment';
import { Job } from '../../models/job';
import { JobsService } from '../../../core/services/jobs.service';

@Component({
  selector: 'app-main-job-table',
  templateUrl: './main-job-table.component.html',
  styleUrls: ['./main-job-table.component.sass'],
})
export class MainJobTableComponent implements OnInit {
  responseMetadata: ApiResponseMeta;
  loading: boolean;
  loadingMeta: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = environment.defaultPaginationLimit;
  totalPages: number;
  itemCount: number = 0;
  totalItems: number = 0;
  items: Job[];

  constructor(private service: JobsService) {}

  ngOnInit() {
    if (this.itemCount === 0 && !this.loading) {
      this.service.get(this.currentPage);
    }

    this.service.loading.subscribe(loading => {
      this.loading = loading;
    });

    this.service.items.subscribe(jobs => {
      this.items = jobs;
      this.itemCount = jobs.length;
    });

    this.service.responseMetadata.subscribe(meta => {
      this.responseMetadata = meta;
      this.totalPages = Math.ceil(meta.totalItems / this.itemsPerPage);

      if (meta.isRemote) {
        this.totalItems = meta.totalItems;
        this.loadingMeta = false;
      }
    });
  }

  onChangePage(nextPage: number) {
    if (this.itemCount < this.totalItems) {
      this.service.get(this.currentPage);
    }
    this.currentPage = nextPage;
  }
}
