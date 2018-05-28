import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError, retry, tap, delay } from 'rxjs/operators';

import { EndpointService } from './endpoint.service';
import { HelpersService } from './helpers.service';
import { Technician } from '../models/technician';
import { environment } from '../../environments/environment';
import { ApiResponseMeta } from '../models/api-response-meta';

@Injectable()
export class TechniciansService {
  responseMeta: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
    new ApiResponseMeta(),
  );

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  techniciansList: Array<Technician> = new Array<Technician>();
  technicians: BehaviorSubject<Array<Technician>> = new BehaviorSubject<Array<Technician>>([]);

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
  ) {}

  get(page: number = 0): void {
    this.loading.next(true);
    let offset = this.helpers.getOffsetForPagination(
      page,
      this.responseMeta.getValue().itemsPerPage,
    );
    this.http
      .get(this.endpoints.technicians.index + offset, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          this.responseMeta.next(this.helpers.parseResponseMetadata(response));
          this.filterOutExistingItems(response);
        }),
        tap(() => this.sortResultsById),
        catchError(this.helpers.handleResponseError),
        tap(() => this.loading.next(false)),
      )
      .subscribe();
  }

  sortResultsById() {
    this.techniciansList.sort((a, b) => {
      return a.id - b.id;
    });
    this.technicians.next(this.techniciansList);
  }

  sortResultsByName(orderBy: 'asc' | 'desc' = 'asc') {
    this.techniciansList.sort((a, b) => {
      var nameA = a.first_name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.first_name.toUpperCase(); // ignore upper and lowercase
      if (orderBy === 'asc') {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
      }
    });
    this.technicians.next(this.techniciansList);
  }

  // Only add new items to the list
  private filterOutExistingItems(response: HttpResponse<any>): Technician[] {
    const technicians = this.mapDataToModel(response).filter(item => {
      return this.techniciansList.map(t => t.id).indexOf(item.id) === -1;
    });

    this.techniciansList = this.techniciansList.concat(technicians);
    this.technicians.next(this.techniciansList);
    return technicians;
  }

  private mapDataToModel(response: any): Technician[] {
    let items: Technician[] = [];
    response.body.objects.forEach(data => {
      let item = new Technician();
      item.id = data.id;
      item.technician_id = data.technician_details.technician_id;
      item.country = data.country;
      item.datetime_created = data.datetime_created;
      item.datetime_modified = data.datetime_modified;
      item.district = data.district;
      item.first_name = data.first_name;
      item.last_name = data.last_name;
      item.neighbourhood = data.neighbourhood;
      item.other_address_details = data.other_address_details;
      item.phone_number = data.phone_number;
      item.postcode = data.postcode;
      item.region = data.region;
      item.role = data.role;
      item.acredit_to_install = data.acredit_to_install;
      item.acredited_to_fix = data.acredited_to_fix;
      item.average_rating = data.average_rating;
      item.location = data.location;
      item.max_num_jobs_allowed = data.max_num_jobs_allowed;
      item.number_jobs_active = data.technician_details.number_jobs_active;
      item.number_of_jobs_completed = data.number_of_jobs_completed;
      item.specialist_skills = data.specialist_skills;
      item.status = data.status;
      item.what3words = data.what3words;
      item.willing_to_travel = data.willing_to_travel;
      item.user_photo = data.user_photo;
      item.village = data.village;
      items.push(item);
    });
    return items;
  }
}
