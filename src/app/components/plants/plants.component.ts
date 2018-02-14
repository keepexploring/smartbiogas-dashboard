import { Component, OnInit } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.sass']
})
export class PlantsComponent implements OnInit {
  loading: boolean = true;
  plants: Plant[];
  selectedPlant: Plant;
  currentViewList: boolean = true;

  constructor(private service: PlantsService, private helpers: HelpersService) { }

  selectPlant(plant: Plant): void {
    this.selectedPlant = plant;
  }

  ngOnInit() {
    this.service.getAll().subscribe((response) => {
      this.plants = response;
      this.loading = false;
    }, (error) => {
      this.helpers.handleError(error);
      this.loading = false;
    });
  }

}
