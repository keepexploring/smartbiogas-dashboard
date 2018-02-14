import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-technician-status',
  templateUrl: './technician-status.component.html',
  styleUrls: ['./technician-status.component.sass']
})
export class TechnicianStatusComponent implements OnInit {
  @Input() status: boolean;
  @Input() size: string;
  statusStyle: string;
  statusText: string;

  constructor() { }

  ngOnInit() {
    this.getStatus();
  }

  private getStatus() {
    if(this.status){
      this.statusStyle = 'green';
      this.statusText = 'Active';
    } else {
      this.statusStyle = 'red';
      this.statusText = 'Inactive';
    }
    this.statusStyle = 'status-' + this.statusStyle;
  }
}
