import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PagesModule } from '../pages.module';
import { HistoriesPage } from './histories.page';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: HistoriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PagesModule
  ],
  declarations: [HistoriesPage]
})
export class HistoriesPageModule {}
