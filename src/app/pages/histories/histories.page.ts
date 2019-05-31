import { Component, OnInit } from '@angular/core';
import { ComputedGrade } from '../model/computedGrade.model';
import { HistoryService } from './histories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './histories.page.html',
  styleUrls: ['./histories.page.scss'],
})
export class HistoriesPage implements OnInit {

  $histories: Observable<ComputedGrade[]>;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.initializeHistories();
  }
 
  ionViewWillEnter() {
    this.$histories = this.historyService.histories;
  }

}
