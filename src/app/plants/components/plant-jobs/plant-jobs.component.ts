import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../jobs/models/job';
import { JobsService } from '../../../core/services/jobs.service';
import { environment } from '../../../../environments/environment';
import { ApiResponseMeta } from '../../../shared/models/api-response-meta';

@Component({
  selector: 'app-plant-jobs',
  templateUrl: './plant-jobs.component.html',
  styleUrls: ['./plant-jobs.component.sass'],
})
export class PlantJobsComponent implements OnInit {
  @Input() plantId: number;
  responseMetadata: ApiResponseMeta;
  loading: boolean;
  loadingMeta: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = environment.defaultPaginationLimit;
  totalPages: number;
  itemCount: number = 0;
  totalCount: number = 0;
  items: Job[] = [];

  constructor(private service: JobsService) {}

  ngOnInit() {
    if (this.itemCount === 0) {
      this.getJobs(this.currentPage);
    }
    this.service.plantResponseMetadata.subscribe(meta => {
      this.responseMetadata = meta;
      this.totalPages = Math.ceil(meta.totalItems / this.itemsPerPage);
      if (meta.isRemote) {
        this.totalCount = meta.totalItems;
        this.loadingMeta = false;
      }
    });
  }

  onChangePage(next: number) {
    if (this.items.length < this.responseMetadata.totalItems) {
      this.getJobs(next);
      this.currentPage = next;
    }
  }

  getJobs(page: number) {
    this.loading = true;
    console.log('getting');
    this.service.getPlantJobs(this.plantId, page).subscribe((jobs: Job[]) => {
      console.log(jobs);
      this.items = [...this.items, ...jobs];
      this.loading = false;
    });
  }
}
