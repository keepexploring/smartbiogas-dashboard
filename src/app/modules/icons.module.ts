import { NgModule } from '@angular/core';
import { IconLayers, IconCompass, IconUsers, IconTruck, IconLogIn, IconLogOut, IconList, IconMap, IconArrowRight, IconArrowLeft } from 'angular-feather';

const icons = [
  IconLayers,
  IconCompass,
  IconUsers,
  IconTruck,
  IconLogIn,
  IconLogOut,
  IconList,
  IconMap,
  IconArrowRight,
  IconArrowLeft
];

@NgModule({
  exports: icons
})

export class IconsModule { }