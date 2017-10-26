import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuBookPage } from './menu-book';

@NgModule({
  declarations: [
    MenuBookPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuBookPage),
  ],
})
export class MenuBookPageModule {}
