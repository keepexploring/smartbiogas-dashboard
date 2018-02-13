import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class EndpointService {
  private baseUrl = environment.baseUrl;
  private basePath = 'api/v1/' ;
  
  token = this.baseUrl + 'o/token/';

  technicians: {index} =  {
    index: this.fullApiEndpoint('users')
  }
  
  dashboard: {index} =  {
    index: this.fullApiEndpoint('Dashboard')
  }

  plants: {index} = {
    index: this.fullApiEndpoint('biogasplants')
  }
  
  jobs: {index} = {
    index: this.fullApiEndpoint('jobs')
  }

  constructor() { }

  private fullApiEndpoint(path): string {
    return this.baseUrl + this.basePath + path + '/?format=json';
  }

}
