import { Component, Input } from '@angular/core';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.sass'],
})
export class PlantDetailComponent {
  @Input() plant: Plant;

  constructor() {}
}
