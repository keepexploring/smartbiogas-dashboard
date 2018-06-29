import { Component, OnInit } from '@angular/core';
import { CountryInformationService } from '../../../core/services/country-information.service';

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.sass'],
})
export class CountryDropdownComponent implements OnInit {
  countries: string[];

  constructor(private countryInformationService: CountryInformationService) {}

  ngOnInit() {
    this.countryInformationService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }
}
