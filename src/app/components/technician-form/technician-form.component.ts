import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-technician-form',
  templateUrl: './technician-form.component.html',
  styleUrls: ['./technician-form.component.sass'],
})
export class TechnicianFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.form);
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone_number: [''],

      country: [''],
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

  // {“company_name”: “Alice’s biogas company”, “region”:“Arusha”, “phone_number”:“+447968684748"}
}
