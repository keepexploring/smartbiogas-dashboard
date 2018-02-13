import { Component, OnInit, Input } from '@angular/core';
import { Technician } from '../../models/technician';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.sass']
})
export class TechnicianDetailComponent implements OnInit {

  @Input() technician: Technician;
  loading = false; 
  
  constructor() { }

  ngOnInit() {
  }

}
