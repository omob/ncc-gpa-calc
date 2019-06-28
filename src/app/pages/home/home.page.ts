import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HistoryService } from '../histories/histories.service';
import { ComputedGrade } from '../model/computedGrade.model';
import { AddNewComponent } from './../courses/add-new/add-new.component';
import { CourseService } from './../courses/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  history: ComputedGrade [];

  constructor(
    private historyService: HistoryService,
    private courseService: CourseService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.historyService.initializeHistories();
  }

  ionViewWillEnter() {
    this.historyService.histories
    .subscribe(h => this.history = h);
  }

  onCalculateNew() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddNewComponent
    });
    return await modal.present();
  }
}
