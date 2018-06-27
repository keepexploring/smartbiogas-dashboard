import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CountryInformationService } from '../../../core/services/country-information.service';
import { CountryInformation } from '../../../models/country-information.model';

@Component({
  selector: 'app-country-calling-code-dropdown',
  templateUrl: './country-calling-code-dropdown.component.html',
  styleUrls: ['./country-calling-code-dropdown.component.sass'],
})
export class CountryCallingCodeDropdownComponent implements OnInit {
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  currentCallingCode: string;

  countries: CountryInformation[];
  loading: boolean = true;

  constructor(private service: CountryInformationService) {}

  ngOnInit() {
    this.service.get().subscribe(data => {
      this.countries = data;
      this.loading = false;
    });
  }

  onChange(callingCode: string) {
    this.currentCallingCode = callingCode;
    this.selected.emit(callingCode);
  }
}
