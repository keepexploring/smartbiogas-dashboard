import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CountryInformation } from '../models/country-information.model';
import { EndpointService } from './endpoint.service';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root',
})
export class CountryInformationService {
  items: CountryInformation[] = [];
  languages: string[] = [];

  constructor(
    private http: HttpClient,
    private endpoints: EndpointService,
    private helpers: HelpersService,
  ) {}

  get(): Observable<CountryInformation[]> {
    return this.http.get(this.endpoints.countryData, { observe: 'response' }).pipe(
      tap(this.parseLanguages),
      map(CountryInformation.fromResponse),
      tap(items => {
        this.items = items;
      }),
      catchError(this.helpers.handleResponseError),
    );
  }

  private parseLanguages(response: HttpResponse<any>) {
    let langs: any[] = response.body.data.map(country => {
      if (!country.languages) {
        return;
      }
      return country.languages;
    });
    const languages: any[] = [];
    langs.map(list => {
      list.map(lang => {
        if (lang && languages.indexOf(lang) < 0) {
          languages.push(lang.name);
        }
      });
    });
    this.languages = languages.filter((v, i, a) => a.indexOf(v) === i).sort();
  }
}
