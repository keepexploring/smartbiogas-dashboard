import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class EndpointService {
  private baseUrl = environment.baseUrl;
  private basePath = 'api/v1/';

  token = this.baseUrl + 'o/token/';
  validateToken = this.fullApiEndpoint('validate/validate_code/');

  technicians: { index } = {
    index: this.fullApiEndpoint(`users/?format=json&limit=${environment.apiPageLimit}`),
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

  constructor() {}

  private fullApiEndpoint(path): string {
    return this.baseUrl + this.basePath + path;
  }
}
