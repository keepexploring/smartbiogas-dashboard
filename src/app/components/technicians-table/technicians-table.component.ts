import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Technician } from '../../models/technician';

@Component({
  selector: 'app-technicians-table',
  templateUrl: './technicians-table.component.html',
  styleUrls: ['./technicians-table.component.sass']
})
export class TechniciansTableComponent implements OnInit {
  @Input() technicians: Technician[];
  @Input() selectable: boolean = true;
  @Output() selectTechnician = new EventEmitter<Technician>();
  selectedTechnician: Technician;

  constructor() { }

  ngOnInit() { }

  select(technician: Technician) {
    this.selectedTechnician = technician;
    this.selectTechnician.emit(technician);
  }

}
