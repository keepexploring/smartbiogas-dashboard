import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Technician } from '../../models/technician';
import { TechniciansService } from '../../services/technicians.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-technicians-table',
  templateUrl: './technicians-table.component.html',
  styleUrls: ['./technicians-table.component.sass'],
})
export class TechniciansTableComponent implements OnInit {
  @Input() selectable: boolean = true;
  @Output() selectTechnician = new EventEmitter<Technician>();

  loading: boolean = true;
  technicians: Technician[];
  selectedTechnician: Technician;

  page: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 0;
  totalPages: number;

  constructor(private service: TechniciansService, private helpers: HelpersService) {}

  ngOnInit() {
    this.getTechnicians();
  }

  select(technician: Technician) {
    this.selectedTechnician = technician;
    this.selectTechnician.emit(technician);
  }

  onPageChange(number: number) {
    this.loading = true;
    this.page = number;
    this.getTechnicians();
  }

  getTechnicians() {
    this.service.getTechnicians(this.page).subscribe(response => {
      this.technicians = response;
      this.loading = false;
      this.totalItems = this.service.totalItems;
      this.itemsPerPage = this.service.itemsPerPage;
      this.totalPages = this.helpers.calculateTotalApiPages(this.totalItems, this.itemsPerPage);
    });
  }
}
