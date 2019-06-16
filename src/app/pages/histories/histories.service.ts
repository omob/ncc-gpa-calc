import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ComputedGrade } from '../model/computedGrade.model';
import { FormValue } from './../model/formvalue.model';
import { History } from './../model/history.model';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {
  // private _history: Observable<History[]>;
  private _$histories = new BehaviorSubject<ComputedGrade[]>([]);
  isInitialized = false;

  constructor(private storage: Storage) {}

  get histories() {
    return this._$histories;
  }

  initializeHistories() {
    this.getDataFromStorage()
      .subscribe(histories => {
         this._$histories.next(this.formattedHistory(histories));
         this.isInitialized = true;
      });
  }


  saveResult(formValue: FormValue, save: boolean = true) {
    const newResult: History = {
      id: new Date().getTime().toString(),
      session: formValue.session,
      semesters: [
        {
          semester: formValue.semester,
          courses: formValue.courses,
          totalGrade: formValue.totalGrade,
          totalUnit: formValue.totalUnit,
          date: formValue.date,
          cgpa: formValue.cgpa
        }
      ]
    };

    if (save) { /*save to server*/ }

    // save to local storage
    return this.saveToLocalStorage(newResult);
  }


  // this shouldn't be responsible for formatting //fix it
  private saveToLocalStorage(newResult: History) {
    const { session, semesters } = newResult;
    const { semester, courses, totalGrade, totalUnit, date, cgpa } = semesters[0];

    return this.getDataFromStorage()
      .pipe(
        map( histories => {
          let localHistories = [];

          if (histories == null) {
            localHistories.push(newResult);
            return this.saveToHistoryStorage_FormatOutput(localHistories);
          }

          localHistories = [...histories];
          const sessionIndex = localHistories.findIndex(course => course.session === session); // check for existing session

          if (sessionIndex === -1) {
            localHistories.push(newResult);
            return this.saveToHistoryStorage_FormatOutput(localHistories);
          }

          const semesterIndex = localHistories[sessionIndex].semesters
            .findIndex( s => s.semester.toLowerCase() === semester.toLowerCase());

          if (semesterIndex === -1) { // not found
            localHistories[sessionIndex].semesters.push(
              {
                semester,
                courses,
                totalGrade,
                totalUnit,
                date,
                cgpa
              }
            );

            return this.saveToHistoryStorage_FormatOutput(localHistories);
          }

          localHistories[sessionIndex].semesters.splice(semesterIndex, 1, {
            semester,
            courses,
            totalGrade,
            totalUnit,
            date,
            cgpa
          });

          return this.saveToHistoryStorage_FormatOutput(localHistories);
        }),
        tap(savedHistories => {
          this._$histories.next(savedHistories);
        })
      );
  }

  private saveToHistoryStorage_FormatOutput(histories): ComputedGrade[] {
    this.saveToHistoryStorage(histories);
    const formattedHistory = this.formattedHistory(histories);
    return formattedHistory;
  }

  private saveToHistoryStorage(value, key: string = 'history') {
    this.storage.set(key, value);
  }

  private formattedHistory(histories: History[]): ComputedGrade[] {
    if (!histories) { return; }

    const extractedH = [];
    histories.forEach(history => {
      history.semesters.forEach( semester => {
        extractedH.push(
          {
            id: history.id,
            ...semester,
            session: history.session,
          }
        );
      });
    });

    return extractedH;
  }

  private getDataFromStorage(data: string = 'history') {
    return from(
      this.storage.get(data)
        .then( histories => histories)
      );
  }

  getSemesterDetail(historyId: string, semesterName: string) {
    return this._$histories.pipe(
      map(histories => {
        return histories.find(({ id, semester }) => id === historyId && semester.toLowerCase() === semesterName.toLowerCase());
      })
    );
  }
}
