import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class EndpointService {
  private baseUrl = environment.baseUrl;
  private basePath = "api/v1/";

  token = this.baseUrl + "o/token/";
  validateToken = this.fullApiEndpoint("validate/validate_code/");

  technicians: { index } = {
    index: this.fullApiEndpoint("users/?format=json&limit=10")
  };

  dashboard: { index } = {
    index: this.fullApiEndpoint("dashboard/?format=json&limit=10")
  };

  plants: { index } = {
    index: this.fullApiEndpoint("biogasplants/?format=json&limit=10")
  };

  jobs: { index; user; plant } = {
    index: this.fullApiEndpoint("jobs/?format=json&limit=10"),
    user: this.fullApiEndpoint("jobs/?limit=5&fixers__user__id="),
    plant: this.fullApiEndpoint("jobs/?limit=5&plant__id=")
  };

  constructor() {}

  private fullApiEndpoint(path): string {
    return this.baseUrl + this.basePath + path;
  }
}
