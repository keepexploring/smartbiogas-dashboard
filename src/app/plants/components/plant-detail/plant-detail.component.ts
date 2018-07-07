import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { ActivatedRoute } from '@angular/router';
import * as constants from '../../../shared/constants';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.sass'],
})
export class PlantDetailComponent implements OnInit, OnChanges {
  plant: Plant;
  loading: boolean = true;
  initialLat: number = constants.initialLat;
  initialLng: number = constants.initialLng;
  zoom: number = constants.initialZoom;
  mapStyles = constants.mapStyles;

  constructor(private service: PlantsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPlant();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.plant) {
      this.plant = changes.plant.currentValue;
    }
  }

  getPlant() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.fetchPlant(id).subscribe((plant: Plant) => {
      this.plant = plant;
      this.loading = false;
    });
  }
}
