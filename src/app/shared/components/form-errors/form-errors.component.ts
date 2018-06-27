import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.sass'],
})
export class FormErrorsComponent implements OnInit {
  @Input() formInput: AbstractControl;

  constructor() {}

  ngOnInit() {}
}
