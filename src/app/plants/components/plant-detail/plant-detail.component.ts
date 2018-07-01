import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { ActivatedRoute } from '@angular/router';
import * as constants from '../../../shared/constants';
import { JobsService } from '../../../core/services/jobs.service';
import { Job } from '../../../jobs/models/job';

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
      console.log(changes.plant);
    }
  }

  getPlant() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.service.fetchPlant(id).subscribe((plant: Plant) => {
      this.plant = plant[0];
      this.loading = false;
    });
  }
}
