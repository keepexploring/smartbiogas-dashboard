import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CountryInformationService } from '../../../core/services/country-information.service';
import { CountryInformation } from '../../../shared/models/country-information.model';
import { Subscription } from 'rxjs';

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

  subscription: Subscription;

  constructor(private service: CountryInformationService) {}

  ngOnInit() {
    this.subscription = this.service.itemList.subscribe(items => {
      this.countries = items;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChange(callingCode: string) {
    this.currentCallingCode = callingCode;
    this.selected.emit(callingCode);
  }
}
