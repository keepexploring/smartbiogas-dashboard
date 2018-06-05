import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryList } from '../../core/constants';

@Component({
  selector: 'app-technician-form',
  templateUrl: './technician-form.component.html',
  styleUrls: ['./technician-form.component.sass'],
})
export class TechnicianFormComponent implements OnInit {
  form: FormGroup;
  countries = countryList;

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.createForm();
    console.log(this.form);
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: this.validateMinRequired(4),
      lastName: this.validateMinRequired(4),
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: this.validateMinRequired(4),
      country: ['', [Validators.required]],


      // status: boolean;
      company_name: [''],
      contact_type: [''],
      // resource_uri: [''],
      // datetime_created: [''],
      // datetime_modified: [''],
      district: [''],
      neighbourhood: [''],
      other_address_details: [''],
      postcode: [''],
      region: [''],
      acredit_to_install: [''],
      acredited_to_fix: [''],
      average_rating: [''],
      location: [''],
      max_num_jobs_allowed: [''],
      number_jobs_active: [''],
      number_of_jobs_completed: [''],
      specialist_skills: [''],
      // what3words: [''],
      willing_to_travel: [''],
      user_photo: [''],
      village: [''],
      ward: [''],
      languages_spoken: [''],
    });
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



  private validateMinRequired(min: number) {
    return ['', [
      Validators.required, Validators.minLength(min)
    ]]
  }

}
