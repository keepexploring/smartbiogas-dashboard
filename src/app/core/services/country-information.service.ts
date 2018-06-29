import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CountryInformation } from '../../shared/models/country-information.model';
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
      map(CountryInformation.fromResponse),
      map(this.sortByName),
      tap(items => {
        this.items = items;
      }),
      tap(this.parseLanguages),
      catchError(this.helpers.handleResponseError),
    );
  }

  private parseLanguages(items: CountryInformation[]) {
    this.languages = items
      .reduce((languages, country) => {
        country.languages.map(l => {
          languages.push(l.name);
        });
        return languages;
      }, [])
      .filter((value, index, array) => array.indexOf(value) === index)
      .sort((a, b) => (a < b ? -1 : b < a ? 1 : 0));
  }

  private sortByName(items: CountryInformation[]): CountryInformation[] {
    return items.sort((a, b) => {
      const countryA = a.name.toUpperCase();
      const countryB = b.name.toUpperCase();
      if (countryA < countryB) {
        return -1;
      }
      if (countryB < countryA) {
        return 1;
      }
      return 0;
    });
  }
}
