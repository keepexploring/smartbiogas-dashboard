import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryList } from '../../core/constants';

@Component({
  selector: 'app-technician-form',
  templateUrl: './technician-form.component.html',
  styleUrls: ['./technician-form.component.sass'],
})
export class TechnicianFormComponent implements OnInit {
  form: FormGroup;
  countries = countryList;

  skillsList = [
    {
      name: 'plumber',
      value: 'PLUMBER',
      selected: false,
      label: 'Plumber',
    },
    {
      name: 'mason',
      value: 'MASON',
      selected: false,
      label: 'Mason',
    },
    {
      name: 'manager',
      value: 'MANAGER',
      selected: false,
      label: 'Manager',
    },
    {
      name: 'design',
      value: 'DESIGN',
      selected: false,
      label: 'Design',
    },
    {
      name: 'calculations',
      value: 'CALCULATIONS',
      selected: false,
      label: 'Calculations',
    },
    {
      name: 'tubular',
      value: 'TUBULAR',
      selected: false,
      label: 'Tubular',
    },
    {
      name: 'fixed_dome',
      value: 'FIXED_DOME',
      selected: false,
      label: 'Fixed Dome',
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.form.get('firstName').valueChanges.subscribe(changes => {});
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: this.validateMinRequired(4),
      lastName: this.validateMinRequired(4),
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: this.phoneValidator(7),
      companyName: ['', [Validators.required]],
      status: ['true', [Validators.required]],
      role: ['1', [Validators.required]],

      district: [''],
      neighbourhood: [''],
      postcode: [''],
      region: [''],
      village: [''],
      ward: [''],
      country: ['', [Validators.required]],
      otherAddressDetails: [''],

      maxNumJobsAllowed: ['1', [Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      willingToTravel: ['10', [Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],

      // TODO: Joel to check
      // Min and Max sizes
      // Valid formats
      userPhoto: [''],

      specialistSkills: this.buildSkills(),
      acreditToInstall: this.buildSkills(),
      acreditedToFix: this.buildSkills(),

      languagesSpoken: [''],
    });
  }

  buildSkills(): FormArray {
    const arr = this.skillsList.map(skill => {
      return this.formBuilder.control(skill.selected);
    });
    return this.formBuilder.array(arr);
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
  get country() {
    return this.form.get('country');
  }
  get companyName() {
    return this.form.get('companyName');
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
  get neighbourhood() {
    return this.form.get('neighbourhood');
  }
  get postcode() {
    return this.form.get('postcode');
  }
  get region() {
    return this.form.get('region');
  }
  get location() {
    return this.form.get('location');
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
  get averageRating() {
    return this.form.get('averageRating');
  }
  get maxNumJobsAllowed() {
    return this.form.get('maxNumJobsAllowed');
  }

  get willingToTravel() {
    return this.form.get('willingToTravel');
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
  private phoneValidator(min: number) {
    return [
      '',
      [Validators.required, Validators.minLength(min), Validators.pattern('^[+d][0-9]{0,14}$')],
    ];
  }
}
