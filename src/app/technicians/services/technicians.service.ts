import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { EndpointService } from '../../core/services/endpoint.service';
import { HelpersService } from '../../core/services/helpers.service';
import { Technician } from '../models/technician';
import { ApiResponseMeta } from '../../shared/models/api-response-meta';
import { MessageService } from '../../core/services/message.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
    this.loading.next(true);

    const endpoint =
      this.endpoints.technicians.index +
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
        map(Technician.fromResponse),
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

  fetchTechnician(id: number) {
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
        map(Technician.fromResponse),
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

  refresh() {
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

  create(form: any): Observable<Technician> {
    let newTechnician: Technician;
    const technician = this.prepareToCreate(form);
    console.log(technician);
    this.http
      .post(this.endpoints.technicians.create, technician, { observe: 'response' })
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return of(error);
        }),
      )
      .subscribe(
        success => {
          console.log('returned', success);
          const technicians = this.items.getValue();
          technicians.push(technician);
          this.items.next(technicians);
          newTechnician = technician;
        },
        error => console.log('ERR!!', error),
      );
    return of(newTechnician);
  }

  prepareToCreate(data: any) {
    console.log(data);

    if (data.status === true || data.status === 'true') {
      data.status = true;
    } else {
      data.status = false;
    }

    data.specialist_skills = this.getValuesForCheckboxSelections(
      data.specialist_skills,
      this.skills,
    );
    data.acredit_to_install = this.getValuesForCheckboxSelections(
      data.acredit_to_install,
      this.accreditedSkills,
    );
    data.acredited_to_fix = this.getValuesForCheckboxSelections(
      data.acredited_to_fix,
      this.accreditedSkills,
    );

    if (Array.isArray(data.languages_spoken.value)) {
      data.languages_spoken = data.languages_spoken.value.split(', ');
    }
    return data;
  }

  getValuesForCheckboxSelections(field: boolean[], values: any[]): string[] {
    return field.reduce((newValues, isSelected, index): string[] => {
      if (isSelected) {
        newValues.push(values[index].name);
      }
      return newValues;
    }, []);
  }

  private handleNotFound(err: any) {
    this.messageService.notFound();
    this.router.navigate(['/technicians']);
    this.loading.next(false);
    return of(err);
  }

  skills = [
    {
      name: 'plumber',
      label: 'Plumber',
      selected: false,
    },
    {
      name: 'mason',
      label: 'Mason',
      selected: false,
    },
    {
      name: 'manager',
      label: 'Manager',
      selected: false,
    },
    {
      name: 'design',
      label: 'Design',
      selected: false,
    },
    {
      name: 'calculations',
      label: 'Calculations',
      selected: false,
    },
  ];

  accreditedSkills = [
    {
      name: 'tubular',
      label: 'Tubular',
      selected: false,
    },
    {
      name: 'fixed_dome',
      label: 'Fixed Dome',
      selected: false,
    },
  ];
}
