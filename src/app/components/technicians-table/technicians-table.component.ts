import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Technician } from '../../models/technician';
import { TechniciansService } from '../../services/technicians.service';
import { ApiResponseMeta } from '../../models/api-response-meta';
import { environment } from '../../../environments/environment';

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

  selected: Technician;

  currentPage: number = 1;
  itemsPerPage: number = environment.defaultPaginationLimit;
  totalPages: number;
  order: boolean = true;

  constructor(private techniciansService: TechniciansService) {}

  ngOnInit() {
    this.getTechnicians();

    this.techniciansService.items.subscribe(technicians => {
      this.technicians = technicians;
    });

    this.techniciansService.responseMetadata.subscribe(responseMetadata => {
      this.responseMetadata = responseMetadata;
      this.totalPages = Math.ceil(responseMetadata.totalItems / this.itemsPerPage);
    });

    this.techniciansService.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  select(technician: Technician) {
    this.selected = technician;
    this.selectTechnician.emit(technician);
  }

  onPageChange(nextPage: number) {
    this.currentPage = nextPage;
    this.getTechnicians();
  }

  sortByName() {
    this.techniciansService.sortResultsByName(this.order ? 'asc' : 'desc');
    this.order = !this.order;
  }

  getTechnicians() {
    this.techniciansService.get(this.currentPage);
  }
}
