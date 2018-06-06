import { HttpResponse } from '@angular/common/http';

export class CountryInformation {
  name: string;
  callingCodes: string[];
  alpha2: string;
  alpha3: string;
  languages: string[];
  latlong: number[];

  get callingCode() {
    return this.callingCodes[0];
  }

  static fromResponse(response: HttpResponse<any>): CountryInformation[] {
    const validItems = response.body.data.filter(
      item => item.calling_code && item.calling_code > 0,
    );

    return validItems.map(data => {
      const country = new CountryInformation();
      country.name = data.name;
      country.callingCodes = data.calling_code;
      country.alpha2 = data.alpha_2;
      country.alpha3 = data.alpha_3;
      country.languages = data.languages;
      country.latlong = data.latlong;
      return country;
    });
  }
}
