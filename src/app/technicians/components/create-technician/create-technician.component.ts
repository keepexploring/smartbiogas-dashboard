import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TechniciansService } from '../../services/technicians.service';
import { CountryInformationService } from '../../../core/services/country-information.service';
import { phoneRegex } from '../../../shared/constants';

@Component({
  selector: 'app-create-technician',
  templateUrl: './create-technician.component.html',
  styleUrls: ['./create-technician.component.sass'],
})
export class CreateTechnicianComponent implements OnInit {
  form: FormGroup;
  countries: string[];
  skillsList = this.techniciansService.skills;
  accreditedSkills = this.techniciansService.accreditedSkills;

  constructor(
    private formBuilder: FormBuilder,
    private countryInformationService: CountryInformationService,
    private techniciansService: TechniciansService,
  ) {}

  ngOnInit() {
    this.createForm();
    this.countryInformationService.getCountries().subscribe(items => {
      this.countries = items;
    });
  }

  onSubmit() {
    // if (this.form.valid) {
    // console.log('Submitted');
    this.techniciansService.create(this.form.value).subscribe(created => {
      // console.log('returned', created);
    });
    // }
    return false;
  }

  createForm() {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.minLength(6), Validators.pattern(phoneRegex)]],
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
