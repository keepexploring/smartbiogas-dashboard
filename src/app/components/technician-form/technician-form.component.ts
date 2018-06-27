import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CountryInformationService } from '../../services/country-information.service';
import { TechniciansService } from '../../services/technicians.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technician-form',
  templateUrl: './technician-form.component.html',
  styleUrls: ['./technician-form.component.sass'],
})
export class TechnicianFormComponent implements OnInit {
  form: FormGroup;
  countries: string[];

  skillsList = this.techniciansService.skills;
  accreditedSkills = this.techniciansService.accreditedSkills;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryInformationService,
    private techniciansService: TechniciansService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
    this.countryService.get().subscribe(countries => {
      this.countries = countries.map(country => {
        return country.name;
      });
    });
    this.initialiseForm();
  }

  initialiseForm() {
    const email = `diego+${Math.ceil(Math.random() * 1000)}@ecm.im`;
    this.first_name.setValue('Diego');
    this.last_name.setValue('Herrera');
    this.mobile.setValue('7766114251');
    this.phoneNumberPrefix.setValue('+44');
    this.email.setValue(email);
    this.status.setValue(true);
    this.role.setValue(1);
    this.country.setValue('United Kingdom');
    this.region.setValue('Scotland');
    this.district.setValue('Test');
    this.ward.setValue('Test');
    this.village.setValue('Test');
    this.postcode.setValue('Test');
    this.what3words.setValue('rigid.richer.trains');
    this.other_address_details.setValue('test');
    this.max_num_jobs_allowed.setValue(5);
    this.willing_to_travel.setValue(2);
    this.languages_spoken.setValue('Spanish, English, Japanese');
    this.username.setValue(email);
    this.password.setValue('Edinburgh1');
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitted');
      this.techniciansService.create(this.form.value).subscribe(created => {
        // this.router.navigate(['technicians', created.id]);
        console.log('returned', created);
      });
    }
    return false;
  }

  createForm() {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern('[0-9]{0,14}$')],
      ],
      phoneNumberPrefix: [''],
      email: ['', [Validators.required, Validators.email]],
      status: [true, [Validators.required]],
      role: [1, [Validators.required]],
      country: ['', [Validators.required]],
      region: ['', [Validators.required]],
      district: [''],
      ward: [''],
      village: [''],
      postcode: [''],
      // rigid.richer.trains
      what3words: [''],
      other_address_details: [''],
      max_num_jobs_allowed: [1, [Validators.max(10), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      willing_to_travel: [10, [Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      specialist_skills: this.buildSkills(),
      acredit_to_install: this.buildAccreditedSkills(),
      acredited_to_fix: this.buildAccreditedSkills(),
      languages_spoken: [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

  // full phone
  get phone() {
    return '+' + this.phoneNumberPrefix.value + this.mobile.value;
  }

  get specialist_skills(): FormArray {
    return this.form.get('specialist_skills') as FormArray;
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get email() {
    return this.form.get('email');
  }
  get mobile() {
    return this.form.get('mobile');
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
    return this.form.get('role');
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
  get other_address_details() {
    return this.form.get('other_address_details');
  }
  get max_num_jobs_allowed() {
    return this.form.get('max_num_jobs_allowed');
  }
  get willing_to_travel() {
    return this.form.get('willing_to_travel');
  }
  get what3words() {
    return this.form.get('what3words');
  }
  get userPhoto() {
    return this.form.get('userPhoto');
  }
  get acredit_to_install() {
    return this.form.get('acredit_to_install');
  }
  get acredited_to_fix() {
    return this.form.get('acredited_to_fix');
  }
  get languages_spoken() {
    return this.form.get('languages_spoken');
  }
}
