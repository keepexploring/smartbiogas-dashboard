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

  constructor(private service: DashboardService) {}

  ngOnInit() {
    this.service.getDashboard().subscribe(response => {
      this.dashboard = response;
      this.loading = false;
    });
  }
}
