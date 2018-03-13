import { Component } from '@angular/core';
import { Technician } from '../../models/technician';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.sass']
})
export class TechniciansComponent {
  selectedTechnician: Technician;

  constructor() { }

  selectTechnician(technician: Technician): void {
    this.selectedTechnician = technician;
  }
}
