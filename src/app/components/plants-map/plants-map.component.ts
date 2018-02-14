import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from '../../models/plant';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-plants-map',
  templateUrl: './plants-map.component.html',
  styleUrls: ['./plants-map.component.sass']
})
export class PlantsMapComponent implements OnInit, OnChanges {
  @Output() selectPlant = new EventEmitter<Plant>();
  @Input() plants: Plant[];
  initialLat: number = -3.3981431;
  initialLng: number = 36.6421933;
  zoom: number = 7;
  selectedPlant: Plant;

  constructor(private helpers: HelpersService) { }
  
  mapStyles = this.helpers.mapStyles;

  select(plant: Plant) {
    this.selectedPlant = plant;
    this.selectPlant.emit(plant);
  }

  ngOnInit() {
    this.processPlantLocations();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.plants.firstChange) {
      this.processPlantLocations();
    }
  }

  private processPlantLocations() {
    this.plants = this.plants.filter(p => p.location && p.location != '');
    this.plants.forEach(p => {
      p.getCoordinates();
      let path = '/assets/images/map-marker-';
      if(p.current_status) {
        switch (p.current_status.toLowerCase()) {
          case 'fault':
            p.mapMarkerIcon = path + 'red.svg';
            break;
          case 'active':
            p.mapMarkerIcon =  path + 'green.svg';
            break;
          default:
            p.mapMarkerIcon =  path + 'gray.svg';
            break;
        }
      } else {
        p.mapMarkerIcon =  path + 'gray.svg';
      }

    });
  }

}
