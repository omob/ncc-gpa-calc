import { Component, OnInit, Input } from '@angular/core';
import { ComputedGrade } from '../../model/computedGrade.model';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})

export class HistoryComponent implements OnInit {

  @Input() history: ComputedGrade;

  constructor() { }

  ngOnInit() {}

}
