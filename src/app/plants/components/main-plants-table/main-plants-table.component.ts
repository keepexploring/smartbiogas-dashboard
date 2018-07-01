import { Component, OnInit } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { environment } from '../../../../environments/environment';
import { ApiResponseMeta } from '../../../shared/models/api-response-meta';

@Component({
  selector: 'app-main-plants-table',
  templateUrl: './main-plants-table.component.html',
  styleUrls: ['./main-plants-table.component.sass'],
})
export class MainPlantsTableComponent implements OnInit {
  responseMetadata: ApiResponseMeta;
  currentViewList: boolean = true;
  loading: boolean = false;
  plants: Plant[];
  selectedPlant: Plant;
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = environment.defaultPaginationLimit;
  totalPages: number;
  itemCount: number = 0;
  totalCount: number = 0;

  constructor(private service: PlantsService) {}

  ngOnInit() {
    if (this.itemCount === 0 && !this.loading) {
      this.service.get(this.currentPage);
    }

    this.service.loading.subscribe(loading => {
      this.loading = loading;
    });

    this.service.items.subscribe(plants => {
      this.plants = plants;
      this.itemCount = plants.length;
    });

    this.service.responseMetadata.subscribe(meta => {
      console.log('META CHANGED', meta);
      this.responseMetadata = meta;
      this.totalPages = Math.ceil(meta.totalItems / this.itemsPerPage);

      if (meta.isRemote) {
        this.totalCount = meta.totalItems;
      }
    });
  }
  onPageChange(number: number) {
    if (this.itemCount < this.totalCount) {
      this.service.fetch();
    }
    this.currentPage = number;
  }
}
