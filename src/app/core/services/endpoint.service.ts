import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class EndpointService {
  private static baseUrl = environment.baseUrl;
  private static basePath = 'api/v1/';

  public static baseUri = EndpointService.baseUrl + EndpointService.basePath;

  token = EndpointService.baseUrl + 'o/token/';
  validateToken = this.fullApiEndpoint('validate/validate_code/');

  technicians: { index; single; create } = {
    index: this.fullApiEndpoint(`users/?format=json&limit=${environment.apiPageLimit}`),
    single: this.fullApiEndpoint(`users/`),
    create: this.fullApiEndpoint(`users/create_technician/`),
  };

  dashboard: { index } = {
    index: this.fullApiEndpoint(`dashboard/?format=json&limit=${environment.apiPageLimit}`),
  };

  plants: { index } = {
    index: this.fullApiEndpoint(`biogasplants/?format=json&limit=${environment.apiPageLimit}`),
  };

  jobs: { index; user; plant } = {
    index: this.fullApiEndpoint(`jobs/?format=json&limit=${environment.apiPageLimit}`),
    user: this.fullApiEndpoint(`jobs/?limit=${environment.apiPageLimit}&fixers__user__id=`),
    plant: this.fullApiEndpoint(`jobs/?limit=${environment.apiPageLimit}&plant__id=`),
  };

  countryData = this.fullApiEndpoint('data/get_countries_and_mobile_shortcodes/');

  getOffset(page: number, itemsPerPage: number): string {
    page = page - 1;
    const offset = '&offset=' + page * itemsPerPage;
    return offset;
  }

  private fullApiEndpoint(path): string {
    return EndpointService.baseUri + path;
  }
}
