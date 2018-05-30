import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  routes: BehaviorSubject<RoutesRecognized[]> = new BehaviorSubject<RoutesRecognized[]>([]);

  constructor(private router: Router) {}

  get() {
    this.router.events
      .pipe(filter((e: RoutesRecognized) => e instanceof RoutesRecognized))
      .subscribe((e: RoutesRecognized) => {
        let routes = this.routes.getValue();
        if (routes.push(e) > 5) {
          routes = routes.splice(1, 5);
        }
        this.routes.next(routes);
      });
    return this.routes;
  }

  clear() {
    this.routes.next([]);
  }
}
