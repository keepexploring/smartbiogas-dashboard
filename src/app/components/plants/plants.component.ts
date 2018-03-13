import { Component, OnInit } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.sass']
})
export class PlantsComponent {
  selectedPlant: Plant;
  currentViewList: boolean = true;

  constructor() { }

  selectPlant(plant: Plant): void {
    this.selectedPlant = plant;
  }
}
