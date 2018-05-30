import { Component, OnInit } from '@angular/core';
import { NavigationHistoryService } from '../../services/navigation-history.service';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass'],
})
export class NotFoundComponent implements OnInit {
  nextRoute: RoutesRecognized;

  constructor(private router: Router, private navigationHistory: NavigationHistoryService) {}

  ngOnInit() {
    const routes = this.navigationHistory.routes.getValue();
    if (!routes || routes.length <= 2) {
      this.router.navigate(['']);
    }
    const previousRoute = routes[routes.length - 1];
    this.nextRoute = routes.find(route => route.id == previousRoute.id - 2);
  }

  goBack() {
    this.router.navigate([this.nextRoute.url]);
  }
}
