import { Component, OnInit } from '@angular/core';
import { TechniciansService } from '../../services/technicians.service';
import { HelpersService } from '../../services/helpers.service';
import { Technician } from '../../models/technician';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.sass']
})
export class TechniciansComponent implements OnInit {

  loading: boolean = true;
  technicians: Technician[];
  selectedTechnician: Technician;

  constructor(private service: TechniciansService, private helpers: HelpersService) { }

  selectTechnician(technician: Technician): void {
    this.selectedTechnician = technician;
  }

  ngOnInit() {
    this.service.getAll().subscribe((response) => {
      console.log('Response(component)', response);
      this.technicians = response;
      this.loading = false;
    }, (error) => {
      this.helpers.handleError(error);
      this.loading = false;
    });
  }

}
