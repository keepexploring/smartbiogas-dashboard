import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plant-status',
  templateUrl: './plant-status.component.html',
  styleUrls: ['./plant-status.component.sass']
})
export class PlantStatusComponent implements OnInit {
  @Input() status: string;
  @Input() size: string;
  statusStyle: string;
  statusText: string;

  constructor() { }

  ngOnInit() {
    this.getStatus();
  }

  private getStatus() {
    if(this.status){
      switch (this.status.toLowerCase()) {
        case 'fault':
          this.statusStyle = 'red';
          this.statusText = this.status;
          break;
        case 'active':
          this.statusStyle = 'green';
          this.statusText = this.status;
          break;
        default:
          this.statusStyle = 'empty';
          this.statusText = 'Unknown'
          break;
      }
    } else {
      this.statusStyle = 'empty';
      this.statusText = 'Unknown';
    }
    this.statusStyle = 'status-' + this.statusStyle;
  }

}
