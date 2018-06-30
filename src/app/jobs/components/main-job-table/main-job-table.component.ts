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
  totalCount: number = 0;
  items: Job[];

  constructor(private service: JobsService) {}

  ngOnInit() {
    if (this.itemCount === 0 && !this.loading) {
      this.service.get(this.currentPage);
    }

    this.service.items.subscribe(jobs => {
      this.items = jobs;
      this.itemCount = jobs.length;
    });

    this.service.responseMetadata.subscribe(responseMetadata => {
      this.responseMetadata = responseMetadata;
      this.totalPages = Math.ceil(responseMetadata.totalItems / this.itemsPerPage);
      if (responseMetadata.isRemote) {
        this.totalCount = responseMetadata.totalItems;
        this.loadingMeta = false;
      }
    });

    this.service.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  onChangePage() {
    console.log('TODO: Change page');
  }
}
