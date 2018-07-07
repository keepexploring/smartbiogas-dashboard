import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';

import { Plant } from '../models/plant';
import { HelpersService } from '../../core/services/helpers.service';
import { EndpointService } from '../../core/services/endpoint.service';
import { ApiResponseMeta } from '../../shared/models/api-response-meta';
import { MessageService } from '../../core/services/message.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlantsService {
  totalItems: number = 10;
  itemsPerPage: number = 10;
  limit: number = environment.apiPagesToPrefetch;
  items: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>([]);
  responseMetadata: BehaviorSubject<ApiResponseMeta> = new BehaviorSubject<ApiResponseMeta>(
    new ApiResponseMeta(),
  );
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingSingle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private fetching: boolean = false;

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  get = (page: number = 0) => {
    this.loading.next(true);
    let offset = this.endpoints.getOffset(page, this.itemsPerPage);
    this.http
      .get(this.endpoints.plants.index + offset, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.body.objects.length === 0) {
            this.cancelFetch();
          }
          const responseMeta = ApiResponseMeta.fromResponse(response);
          if (responseMeta.isRemote && responseMeta.totalItems === this.items.getValue().length) {
            this.loading.next(false);
          }
          this.responseMetadata.next(responseMeta);
        }),
        map(response => Plant.fromResponse(response)),
        map(received => this.helpers.handleUpdatesAndAdditions(received, this.items.getValue())),
        tap(items => this.items.next(items)),
        catchError(err => this.helpers.handleResponseError(err)),
      )
      .subscribe(() => {
        this.prefetch(page);
      });
  };

  fetch() {
    const meta = this.responseMetadata.getValue();
    if (this.items.getValue().length < meta.totalItems) {
      this.limit = meta.pageFetched + environment.apiPagesToPrefetch;
      this.fetching = false;
      this.prefetch(meta.pageFetched);
    }
  }

  refresh() {
    const meta = this.responseMetadata.getValue();
    this.limit = meta.pageFetched;
    this.fetching = false;

    meta.totalItems = 0;
    meta.pageFetched = 0;
    this.responseMetadata.next(meta);

    this.prefetch(0);
  }

  fetchPlant(id: number): Observable<Plant> {
    if (this.items.getValue().length > 0) {
      const found = this.items.getValue().find(j => j.id == id);
      if (found) {
        this.loading.next(false);
        return of(found);
      }
    }
    if (isNaN(id)) {
      this.handleNotFound('Not a valid ID');
    }

    this.loadingSingle.next(true);
    return this.http.get(this.endpoints.plants.single + id + '/', { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        this.loading.next(false);
        return response;
      }),
      map(data => Plant.parseSingle(data.body)),
      map(received => {
        const item = this.helpers.handleUpdatesAndAdditions(received, this.items.getValue());
        this.items.next(item);
        return item[0] || item;
      }),
      tap(items => this.items.next(items)),
      catchError(error => this.handleNotFound(error)),
    );
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

  private handleNotFound(err: any) {
    console.log('ERR!', err);
    this.messageService.notFound();
    this.router.navigate(['/plants']);
    this.loading.next(false);
    return of(err);
  }

  cancelFetch() {
    this.fetching = true;
    this.loading.next(false);
  }
}
