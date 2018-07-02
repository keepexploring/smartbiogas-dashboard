import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HelpersService } from '../../core/services/helpers.service';
import { EndpointService } from '../../core/services/endpoint.service';
import { Dashboard } from '../models/dashboard';

@Injectable()
export class DashboardService {
  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
  ) {}

  getCards() {
    console.log(this.endpoints.dashboard);
    return this.http.get(this.endpoints.dashboard.cards, {
      observe: 'response',
    });
  }

  getTemplateCards() {
    console.log(this.endpoints.dashboard);
    return this.http.get(this.endpoints.dashboard.templateCards, {
      observe: 'response',
    });
  }

  getDashboard(): Observable<Dashboard> {
    return this.http.get(this.endpoints.dashboard.index).pipe(
      map(response => this.mapDataToModel(response)),
      catchError(this.helpers.handleResponseError),
    );
  }

  private mapDataToModel(response: any): Dashboard {
    let firstDataObject = response.objects[0];
    let item = new Dashboard();
    item.id = firstDataObject.id;
    item.activePlants = firstDataObject.active;
    item.repairTime = firstDataObject.avtime;
    item.faults = firstDataObject.faults;
    item.faultsFixed = firstDataObject.fixed;
    item.jobs = firstDataObject.jobs;
    item.plants = firstDataObject.plants;
    item.createdAt = firstDataObject.created_at;
    return item;
  }
}
