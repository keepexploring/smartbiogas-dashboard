import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { map, catchError, retry, tap, delay, mergeMap } from 'rxjs/operators';

import { EndpointService } from './endpoint.service';
import { HelpersService } from './helpers.service';
import { Technician } from '../models/technician';
import { ApiResponseMeta } from '../models/api-response-meta';
import { identifierModuleUrl } from '@angular/compiler';
import { MessageService } from './message.service';
import { Message } from '../models/message';
import { Router } from '@angular/router';

@Injectable()
export class TechniciansService {
  responseMetadata: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
    new ApiResponseMeta(),
  );
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  items: BehaviorSubject<Array<Technician>> = new BehaviorSubject<Array<Technician>>([]);

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  get = (page: number = 0): void => {
    const count = this.items.getValue().length;
    const total = this.responseMetadata.getValue().totalItems;

    if (count >= total) {
      return;
    }

    const endpoint =
      this.endpoints.technicians.index +
      this.endpoints.getOffset(page, this.responseMetadata.getValue().itemsPerPage);

    this.loading.next(true);

    this.http
      .get(endpoint, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) =>
          this.responseMetadata.next(ApiResponseMeta.fromResponse(response)),
        ),
        tap(
          () => this.helpers.prefetch(this.responseMetadata.getValue().totalPages, page, this.get),
          // console.log('TODO: Activate prefetch'),
        ),
        map(Technician.listFromResponse),
        map((received, existing) => {
          return this.helpers.handleUpdatesAndAdditions(received, this.items.getValue());
        }),
        tap(items => this.items.next(items)),
        catchError(this.helpers.handleResponseError),
        tap(() => this.loading.next(false)),
      )
      .subscribe();
  };

  fetchTechnician(id: number) {
    if (isNaN(id)) {
      this.handleNotFound('Not a valid ID');
    }
    return this.http
      .get(this.endpoints.technicians.single + id + '/', { observe: 'response' })
      .pipe(
        map(Technician.fromResponse),
        map((received, existing) => {
          return this.helpers.handleUpdatesAndAdditions([received], this.items.getValue());
        }),
        tap(items => this.items.next(items)),
        catchError(this.handleNotFound),
        tap(() => this.loading.next(false)),
      )
      .subscribe(null, this.handleNotFound);
  }

  handleNotFound(err: any) {
    console.log(err);
    this.messageService.notFound();
    this.router.navigate(['/technicians']);
    this.loading.next(false);
    return of(err);
  }

  sortResultsById() {
    const list = this.items.getValue().sort((a, b) => {
      return a.id - b.id;
    });
    this.items.next(list);
  }

  sortResultsByName(orderBy: 'asc' | 'desc' = 'asc') {
    const list = this.items.getValue().sort((a, b) => {
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
    this.items.next(list);
  }
}
