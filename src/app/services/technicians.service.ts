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
import { environment } from '../../environments/environment';
import { MessageType } from '../enums/message-type';

@Injectable()
export class TechniciansService {
  responseMetadata: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
    new ApiResponseMeta(),
  );
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingSingle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  items: BehaviorSubject<Array<Technician>> = new BehaviorSubject<Array<Technician>>([]);

  limit: number = environment.apiPagesToPrefetch;

  private fetching: boolean = false;

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

    this.loading.next(true);

    const endpoint =
      this.endpoints.technicians.index +
      this.endpoints.getOffset(page, this.responseMetadata.getValue().itemsPerPage);

    this.http
      .get(endpoint, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          return this.responseMetadata.next(ApiResponseMeta.fromResponse(response));
        }),
        map(Technician.fromResponse),
        map((received, existing) => {
          return this.helpers.handleUpdatesAndAdditions(received, this.items.getValue());
        }),
        tap(items => this.items.next(items)),
        catchError(this.helpers.handleResponseError),
      )
      .subscribe(
        success => {
          this.prefetch(page);
        }
      );
  };

  fetchTechnician(id: number) {
    if (isNaN(id)) {
      this.handleNotFound('Not a valid ID');
    }
    this.loadingSingle.next(true);
    this.http
      .get(this.endpoints.technicians.single + id + '/', { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          console.log('SINGLE', response);
          if (this.items.getValue().length < 2) {
            console.log('PREFETCH FROM SINGLE');
            this.prefetch(0);
          }
        }),
        map(Technician.fromResponse),
        map((received, existing) => {
          return this.helpers.handleUpdatesAndAdditions(received, this.items.getValue());
        }),
        tap(items => this.items.next(items)),
        catchError(this.handleNotFound),
      )
      .subscribe(null, this.handleNotFound, () => {
        this.loadingSingle.next(false);
        this.loading.next(false);
      });
  }

  private prefetch(page: number) {
    if (this.fetching) {
      return;
    }

    this.loading.next(true);

    const meta: ApiResponseMeta = this.responseMetadata.getValue();
    const nextPage: number = page + 1;
    let limit: number = this.limit;

    if (page >= this.limit) {
      this.fetching = true;
      this.loading.next(false);
      return; // No more pages to prefetch
    }

    this.get(nextPage);
    return; // already fetching
  }

  refresh() {
    console.log('service refresh');
    const meta = this.responseMetadata.getValue();
    this.limit = meta.pageFetched;
    this.fetching = false;

    meta.totalItems = 0;
    meta.pageFetched = 0;
    this.responseMetadata.next(meta);

    this.prefetch(0);
  }

  fetch() {
    const meta = this.responseMetadata.getValue();
    if (meta.totalPages > meta.pageFetched) {
      this.limit = meta.pageFetched + environment.apiPagesToPrefetch;
      this.fetching = false;
      this.prefetch(meta.pageFetched);
    }
  }

  handleNotFound(err: any) {
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
