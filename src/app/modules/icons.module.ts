import { NgModule } from '@angular/core';
import { IconLayers, IconCompass, IconUsers, IconTruck, IconLogIn, IconLogOut, IconList, IconMap } from 'angular-feather';

const icons = [
  IconLayers,
  IconCompass,
  IconUsers,
  IconTruck,
  IconLogIn,
  IconLogOut,
  IconList,
  IconMap
];

@NgModule({
  exports: icons
})

export class IconsModule { }