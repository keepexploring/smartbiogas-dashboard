import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { EndpointService } from './endpoint.service';
import { HelpersService } from './helpers.service';
import { Technician } from '../models/technician';

@Injectable()
export class TechniciansService {
  totalItems: number = 10;
  itemsPerPage: number = 10;

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
  ) {}

  getTechnicians(page: number = 0): Observable<Technician[]> {
    let offset = this.helpers.getOffsetForPagination(page, this.itemsPerPage);
    return this.http.get(this.endpoints.technicians.index + offset, { observe: 'response' }).pipe(
      map(response => {
        this.totalItems = response.body['meta'] ? response.body['meta'].total_count : 0;
        this.itemsPerPage = response.body['meta'] ? response.body['meta'].limit : 0;
        return this.mapDataToModel(response);
      }),
      catchError(this.helpers.handleResponseError),
    );
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
