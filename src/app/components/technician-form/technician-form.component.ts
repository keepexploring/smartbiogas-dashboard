import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Technician } from '../../models/technician';
import { CountryInformationService } from '../../services/country-information.service';

@Component({
  selector: 'app-technician-form',
  templateUrl: './technician-form.component.html',
  styleUrls: ['./technician-form.component.sass'],
})
export class TechnicianFormComponent implements OnInit {
  form: FormGroup;
  countries: string[];

  skillsList = Technician.skills;
  accreditedSkills = Technician.accreditedSkills;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryInformationService,
  ) {}

  ngOnInit() {
    this.createForm();
    this.form.get('firstName').valueChanges.subscribe(changes => {});
    this.countryService.get().subscribe(countries => {
      this.countries = countries.map(country => {
        return country.name;
      });
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: this.validateMinRequired(4),
      lastName: this.validateMinRequired(4),
      phoneNumber: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern('[0-9]{0,14}$')],
      ],
      phoneNumberPrefix: [''],
      email: ['', [Validators.email, Validators.required]],
      status: ['true', [Validators.required]],
      role: ['1', [Validators.required]],
      country: ['', [Validators.required]],
      region: [''],
      district: [''],
      ward: [''],
      village: [''],
      postcode: [''],
      what3words: [''],
      otherAddressDetails: [''],
      maxNumJobsAllowed: ['1', [Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      willingToTravel: ['10', [Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      specialistSkills: this.buildSkills(),
      acreditToInstall: this.buildAccreditedSkills(),
      acreditedToFix: this.buildAccreditedSkills(),
      languagesSpoken: [''],

      // TODO: Joel to check
      // Min and Max sizes
      // Valid formats
      userPhoto: [''],
    });
  }

  setPhonePrefix(event) {
    console.log(event);
    this.phoneNumberPrefix.setValue(event);
  }

  buildSkills(): FormArray {
    return this.formBuilder.array(
      this.skillsList.map(skill => {
        return this.formBuilder.control(skill.selected);
      }),
    );
  }

  buildAccreditedSkills(): FormArray {
    return this.formBuilder.array(
      this.accreditedSkills.map(skill => {
        return this.formBuilder.control(skill.selected);
      }),
    );
  }

  setLanguages(languages: string[]) {
    const languageFGs = languages.map(language => {
      return this.formBuilder.group({ language: language });
    });
    return this.formBuilder.array(languageFGs);
  }

  get specialistSkills(): FormArray {
    return this.form.get('specialistSkills') as FormArray;
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get phoneNumberPrefix() {
    return this.form.get('phoneNumberPrefix');
  }
  get country() {
    return this.form.get('country');
  }
  get status() {
    return this.form.get('status');
  }
  get role() {
    return this.form.get('status');
  }
  get district() {
    return this.form.get('district');
  }
  get postcode() {
    return this.form.get('postcode');
  }
  get region() {
    return this.form.get('region');
  }
  get village() {
    return this.form.get('village');
  }
  get ward() {
    return this.form.get('ward');
  }
  get otherAddressDetails() {
    return this.form.get('otherAddressDetails');
  }
  get maxNumJobsAllowed() {
    return this.form.get('maxNumJobsAllowed');
  }
  get willingToTravel() {
    return this.form.get('willingToTravel');
  }
  get what3words() {
    return this.form.get('what3words');
  }
  get userPhoto() {
    return this.form.get('userPhoto');
  }
  get acreditToInstall() {
    return this.form.get('acreditToInstall');
  }
  get acreditedToFix() {
    return this.form.get('acreditedToFix');
  }
  get languagesSpoken() {
    return this.form.get('languagesSpoken');
  }
  private validateMinRequired(min: number) {
    return ['', [Validators.required, Validators.minLength(min)]];
  }
}
