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

  get = (page: number) => {
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
      .subscribe(
        null,
        err => this.handleNotFound(err),
        () => {
          this.loading.next(false);
        },
      );
  };

  fetchPlant(id: number): Observable<Plant> {
    const found = this.items.getValue().find(j => j.id == id);
    if (found) {
      return of(found);
    }
    if (isNaN(id)) {
      this.handleNotFound('Not a valid ID');
    }

    this.loadingSingle.next(true);
    return this.http.get(this.endpoints.plants.single + id + '/', { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (this.items.getValue().length < 2) {
          this.prefetch(0);
        }
        return response;
      }),
      map(data => Plant.parseSingle(data.body)),
      map(received => this.helpers.handleUpdatesAndAdditions(received, this.items.getValue())),
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
