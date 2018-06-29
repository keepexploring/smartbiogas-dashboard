import { Component, OnInit } from '@angular/core';
import { TechniciansService } from '../../services/technicians.service';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.sass'],
})
export class TechniciansComponent implements OnInit {
  title: string = 'Technicians';
  constructor(private techniciansService: TechniciansService) {}

  ngOnInit() {
    this.techniciansService.get();
  }
}
