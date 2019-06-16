import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { PagesModule } from '../pages.module';
import { AddNewComponent } from './../courses/add-new/add-new.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  { path: 'histories', loadChildren: '../../pages/histories/histories.module#HistoriesPageModule' },
  { path: 'profile', loadChildren: '../../pages/profile/profile.module#ProfilePageModule' },

  {
    path: 'courses/detail/:id',
    loadChildren: '../../pages/courses/course-detail/course-detail.module#CourseDetailPageModule'
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PagesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage, AddNewComponent],
  entryComponents: [AddNewComponent]
})
export class HomePageModule {}
