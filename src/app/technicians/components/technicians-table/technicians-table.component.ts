import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Technician } from '../../models/technician';
import { TechniciansService } from '../../services/technicians.service';
import { ApiResponseMeta } from '../../../models/api-response-meta';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-technicians-table',
  templateUrl: './technicians-table.component.html',
  styleUrls: ['./technicians-table.component.sass'],
})
export class TechniciansTableComponent implements OnInit {
  @Input() selectable: boolean = true;
  @Output() selectTechnician = new EventEmitter<Technician>();

  technicians: Technician[];
  responseMetadata: ApiResponseMeta;
  loading: boolean;
  loadingMeta: boolean = true;

  selected: Technician;

  currentPage: number = 1;
  itemsPerPage: number = environment.defaultPaginationLimit;
  totalPages: number;
  order: boolean = true;

  itemCount: number = 0;
  totalCount: number = 0;

  density: 'default' | 'condensed' = 'default';

  constructor(private techniciansService: TechniciansService) {}

  ngOnInit() {
    if (this.itemCount === 0 && !this.loading) {
      this.techniciansService.get(this.currentPage);
    }

    this.techniciansService.items.subscribe(technicians => {
      this.technicians = technicians;
      this.itemCount = technicians.length;
    });

    this.techniciansService.responseMetadata.subscribe(responseMetadata => {
      this.responseMetadata = responseMetadata;
      this.totalPages = Math.ceil(responseMetadata.totalItems / this.itemsPerPage);
      if (responseMetadata.isRemote) {
        this.totalCount = responseMetadata.totalItems;
        this.loadingMeta = false;
      }
    });

    this.techniciansService.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  onPageChange(nextPage: number) {
    this.currentPage = nextPage;
  }

  setDensity(density) {
    this.density = density;
  }
}
