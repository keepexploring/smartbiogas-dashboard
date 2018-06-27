import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ImageComponent } from './components/image/image.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedRoutingModule, ReactiveFormsModule],
  declarations: [FormErrorsComponent, ImageComponent, LoadingComponent],
  exports: [FormErrorsComponent, ImageComponent, LoadingComponent],
})
export class SharedModule {}
