import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Technician } from '../../models/technician';
import { TechniciansService } from '../../services/technicians.service';
import { ApiResponseMeta } from '../../models/api-response-meta';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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

  itemCount: number = 0;
  totalCount: number = 0;

  constructor(private techniciansService: TechniciansService, private router: Router) {}

  ngOnInit() {
    this.getTechnicians();

    this.techniciansService.items.subscribe(technicians => {
      this.technicians = technicians;
      this.itemCount = technicians.length;
    });

    this.techniciansService.responseMetadata.subscribe(responseMetadata => {
      console.log(responseMetadata);
      this.responseMetadata = responseMetadata;
      this.totalPages = Math.ceil(responseMetadata.totalItems / this.itemsPerPage);
      if (responseMetadata.isRemote) {
        this.totalCount = responseMetadata.totalItems;
      }
    });

    this.techniciansService.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  select(technician: Technician) {
    this.selected = technician;
    this.selectTechnician.emit(technician);
    this.router.navigate(['technicians', technician.id]);
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
