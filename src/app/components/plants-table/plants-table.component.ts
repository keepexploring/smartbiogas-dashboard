import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-plants-table',
  templateUrl: './plants-table.component.html',
  styleUrls: ['./plants-table.component.sass']
})
export class PlantsTableComponent implements OnInit {
  @Input() plants: Plant[];
  @Input() selectable: boolean = true;
  @Output() selectPlant = new EventEmitter<Plant>();
  selectedPlant: Plant;

  constructor() { }

  ngOnInit() { }

  select(plant: Plant) {
    this.selectedPlant = plant;
    this.selectPlant.emit(plant);
  }

}
