import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass'],
})
export class ImageComponent implements OnInit {
  private defaultAvatar = '/assets/images/missing-user-photo.svg';

  @Input() src: string;
  @Input() alt: string = '';
  @Input() classes: string = '';

  loading: boolean = true;

  constructor() {}

  ngOnInit() {}

  onError(event: any) {
    this.src = this.defaultAvatar;
    this.loading = false;
  }

  onLoad(event: any) {
    this.loading = false;
  }
}
