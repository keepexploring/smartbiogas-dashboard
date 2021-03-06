import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ImageComponent } from './components/image/image.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderLoadingComponent } from './components/header-loading/header-loading.component';
import { IconsModule } from '../icons/icons.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CountryCallingCodeDropdownComponent } from './components/country-calling-code-dropdown/country-calling-code-dropdown.component';
import { HeaderComponent } from './components/header/header.component';
import { MapToKeysPipe } from './pipes/map-to-keys.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CountryDropdownComponent } from './components/country-dropdown/country-dropdown.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';

@NgModule({
  imports: [CommonModule, SharedRoutingModule, ReactiveFormsModule, IconsModule],
  declarations: [
    FormErrorsComponent,
    ImageComponent,
    LoadingComponent,
    HeaderLoadingComponent,
    ProgressBarComponent,
    CountryCallingCodeDropdownComponent,
    HeaderComponent,
    MapToKeysPipe,
    NotFoundComponent,
    MessageComponent,
    MessagesComponent,
    CountryDropdownComponent,
    CreateButtonComponent,
    ContactCardComponent,
  ],
  exports: [
    FormErrorsComponent,
    ImageComponent,
    LoadingComponent,
    HeaderLoadingComponent,
    ProgressBarComponent,
    CountryCallingCodeDropdownComponent,
    HeaderComponent,
    MapToKeysPipe,
    NotFoundComponent,
    MessageComponent,
    MessagesComponent,
    CreateButtonComponent,
    ContactCardComponent,
  ],
})
export class SharedModule {}
