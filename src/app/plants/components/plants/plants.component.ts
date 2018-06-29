import { Component } from '@angular/core';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.sass'],
})
export class PlantsComponent {
  selectedPlant: Plant;
  currentViewList: boolean = true;

  constructor() {}

  selectPlant(plant: Plant): void {
    this.selectedPlant = plant;
  }
}
