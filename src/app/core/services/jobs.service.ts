import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';

import { EndpointService } from '../../core/services/endpoint.service';
import { HelpersService } from '../../core/services/helpers.service';
import { Job } from '../../jobs/models/job';
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
  loadingUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userResponseMetadata: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
    new ApiResponseMeta(),
  );
  plantResponseMetadata: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
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

  getUserJobs = (page: number = 1, userId: number): Observable<Job[]> => {
    this.loadingUser.next(true);
    const endpoint = `${EndpointService.baseUri}jobs/limit=${
      environment.apiPageLimit
    }&fixers__user__id=${userId}&page=${page}/get_jobs/`;

    return this.http.get(endpoint, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        const responseMeta = ApiResponseMeta.fromResponse(response);
        this.userResponseMetadata.next(responseMeta);
        this.loadingUser.next(false);
        return response;
      }),
      map((response: HttpResponse<any>) => {
        return Job.fromResponse(response);
      }),
      catchError(this.helpers.handleResponseError),
    );
  };

  getPlantJobs = (page: number = 1, plantId: number): Observable<Job[]> => {
    this.loadingUser.next(true);

    const endpoint =
      this.endpoints.jobs.plant +
      plantId +
      this.endpoints.getOffset(page, this.plantResponseMetadata.getValue().itemsPerPage);

    return this.http.get(endpoint, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        const responseMeta = ApiResponseMeta.fromResponse(response);
        this.plantResponseMetadata.next(responseMeta);
      }),
      map(Job.fromResponse),
      map(received => {
        return this.helpers.handleUpdatesAndAdditions(received, this.items.getValue());
      }),
      tap(items => this.items.next(items)),
      tap(() => {
        this.loadingUser.next(false);
      }),
      catchError(this.helpers.handleResponseError),
    );
  };

  fetchJob(id: string) {
    if (this.items.getValue().length > 0) {
      const found = this.items.getValue().find(j => j.job_id == id);
      if (found) {
        this.loadingSingle.next(false);
        this.loading.next(false);
        return of(found);
      }
    }

    this.loadingSingle.next(true);
    return this.http.get(this.endpoints.jobs.single + id + '/', { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        this.loadingSingle.next(false);
        this.loading.next(false);
        const job = Job.parse(response.body);
        const item = this.helpers.handleUpdatesAndAdditions(job, this.items.getValue());
        this.items.next(item);
        return item[0] || item;
      }),
      catchError(this.handleNotFound),
    );
  }

  private handleNotFound(err: any) {
    console.log('ERR!', err);
    this.messageService.notFound();
    this.router.navigate(['/plants']);
    this.loadingSingle.next(false);
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
