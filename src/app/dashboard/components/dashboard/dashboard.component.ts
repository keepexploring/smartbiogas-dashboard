import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  dashboard: Dashboard;

  templateCards: {};
  cards: {};

  constructor(private service: DashboardService) {}

  ngOnInit() {
    this.getDashboard();
    this.getCards();
    this.getTemplateCards();
  }

  getDashboard() {
    this.service.getDashboard().subscribe(response => {
      this.dashboard = response;
      this.loading = false;
    });
  }

  getCards() {
    this.service.getCards().subscribe(response => {
      console.log(response);
    });
  }

  getTemplateCards() {
    this.service.getTemplateCards().subscribe(response => {
      console.log(response);
    });
  }
}
