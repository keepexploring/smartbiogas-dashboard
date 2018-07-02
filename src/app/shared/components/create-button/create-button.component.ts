import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.sass'],
})
export class CreateButtonComponent implements OnInit {
  @Input() baseRoute: string = '';
  @Input() text: string = 'Add';

  constructor() {}

  ngOnInit() {}
}
