import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseDetailPage } from './course-detail.page';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CourseDetailPage, EditComponent]
})
export class CourseDetailPageModule {}
