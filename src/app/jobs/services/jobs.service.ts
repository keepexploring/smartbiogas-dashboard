import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';

import { EndpointService } from '../../core/services/endpoint.service';
import { HelpersService } from '../../core/services/helpers.service';
import { Job } from '../models/job';
import { ApiResponseMeta } from '../../shared/models/api-response-meta';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../core/services/message.service';
import { Router } from '@angular/router';

@Injectable()
export class JobsService {
  responseMetadata: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
    new ApiResponseMeta(),
  );
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingSingle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  items: BehaviorSubject<Array<Job>> = new BehaviorSubject<Array<Job>>([]);
  limit: number = environment.apiPagesToPrefetch;

  userItems: BehaviorSubject<Array<Job>> = new BehaviorSubject<Array<Job>>([]);
  loadingUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userResponseMetadata: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
    new ApiResponseMeta(),
  );

  private fetching: boolean = false;

  totalItems: number = 10;
  itemsPerPage: number = 10;

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  get = (page: number = 0): void => {
    this.loading.next(true);

    const endpoint =
      this.endpoints.jobs.index +
      this.endpoints.getOffset(page, this.responseMetadata.getValue().itemsPerPage);

    this.http
      .get(endpoint, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.body.objects.length === 0) {
            this.cancelFetch();
          }
          const responseMeta = ApiResponseMeta.fromResponse(response);
          if (responseMeta.isRemote && responseMeta.totalItems === this.items.getValue().length) {
            this.loading.next(false);
          }
          return this.responseMetadata.next(responseMeta);
        }),
        map(Job.fromResponse),
        map(received => {
          return this.helpers.handleUpdatesAndAdditions(received, this.items.getValue());
        }),
        tap(items => this.items.next(items)),
        catchError(this.helpers.handleResponseError),
      )
      .subscribe(() => {
        this.prefetch(page);
      });
  };

  getUserJobs = (page: number = 1, userId: number): void => {
    this.loadingUser.next(true);

    const endpoint =
      this.endpoints.jobs.user +
      userId +
      this.endpoints.getOffset(page, this.userResponseMetadata.getValue().itemsPerPage);

    this.http
      .get(endpoint, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.body.objects.length === 0) {
            this.cancelFetch();
          }
          const responseMeta = ApiResponseMeta.fromResponse(response);
          if (
            responseMeta.isRemote &&
            responseMeta.totalItems === this.userItems.getValue().length
          ) {
            this.loadingUser.next(false);
          }
          return this.userResponseMetadata.next(responseMeta);
        }),
        map(Job.fromResponse),
        map(received => {
          return this.helpers.handleUpdatesAndAdditions(received, this.userItems.getValue());
        }),
        tap(items => this.userItems.next(items)),
        catchError(this.helpers.handleResponseError),
      )
      .subscribe(() => {
        this.prefetch(page);
      });
  };

  fetchJob(id: number) {
    if (isNaN(id)) {
      this.handleNotFound('Not a valid ID');
    }
    this.loadingSingle.next(true);
    this.http
      .get(this.endpoints.technicians.single + id + '/', { observe: 'response' })
      .pipe(
        tap(() => {
          if (this.items.getValue().length < 2) {
            this.prefetch(0);
          }
        }),
        map(Job.fromResponse),
        map(received => {
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

  private getEndpoint(page: number = 0, userId?: number, plantId?: number) {
    let offset = this.endpoints.getOffset(page, this.itemsPerPage);
    if (userId) {
      return this.endpoints.jobs.user + userId + offset;
    } else if (plantId) {
      return this.endpoints.jobs.plant + plantId + offset;
    } else {
      return this.endpoints.jobs.index + offset;
    }
  }

  private handleNotFound(err: any) {
    this.messageService.notFound();
    this.router.navigate(['/technicians']);
    this.loading.next(false);
    return of(err);
  }

  fetch() {
    const meta = this.responseMetadata.getValue();
    if (meta.totalPages > meta.pageFetched) {
      this.limit = meta.pageFetched + environment.apiPagesToPrefetch;
      this.fetching = false;
      this.prefetch(meta.pageFetched);
    }
  }

  prefetch(page: number) {
    if (this.fetching) {
      return;
    }

    this.loading.next(true);

    const nextPage: number = page + 1;

    if (page >= this.limit) {
      this.cancelFetch();
      return; // No more pages to prefetch
    }

    this.get(nextPage);
    return; // already fetching
  }

  cancelFetch() {
    this.fetching = true;
    this.loading.next(false);
  }
}
