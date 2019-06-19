import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetupPage } from './setup.page';
import { CustomiseComponent } from './customise/customise.component';

const routes: Routes = [
  {
    path: '',
    component: SetupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SetupPage, CustomiseComponent],
  entryComponents: [ CustomiseComponent ]
})
export class SetupPageModule {}
