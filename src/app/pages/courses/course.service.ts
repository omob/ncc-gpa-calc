import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CourseService {


  constructor() {
  }

  // saveResult(formValue: FormValue, save: boolean = true) {
  //   if (save) {
  //     // save to server

  //   }

  //   // save to local storage
  //   return this.saveToLocalStorage(formValue);
  // }


  // this shouldn't be responsible for formatting //fix it
  // private saveToLocalStorage(formValue: FormValue) {
  //   const resultFormat: History = {
  //     id: new Date().getTime().toString(),
  //     session: formValue.session,
  //     semesters: [
  //       {
  //         semester: formValue.semester,
  //         courses: formValue.courses,
  //         totalGrade: formValue.totalGrade,
  //         totalUnit: formValue.totalUnit,
  //         date: formValue.date,
  //         cgpa: formValue.cgpa
  //       }
  //     ]
  //   };

  //   return this.getDataFromStorage()
  //     .pipe(
  //       map( histories => {
  //         let localHistories = [];

  //         if (histories == null) {
  //           localHistories.push(resultFormat);
  //           return this.saveToHistoryStorage_FormatOutput_EmitHistoryObservable(localHistories);
  //         }

  //         localHistories = [...histories];
  //         const sessionIndex = localHistories.findIndex(course => course.session === formValue.session); // check for existing session

  //         if (sessionIndex === -1) {
  //           localHistories.push(resultFormat);
  //           return this.saveToHistoryStorage_FormatOutput_EmitHistoryObservable(localHistories);
  //         }

  //         const semesterIndex = localHistories[sessionIndex].semesters
  //           .findIndex( semester => semester.semester.toLowerCase() === formValue.semester.toLowerCase());

  //         if (semesterIndex === -1) { // not found
  //           localHistories[sessionIndex].semesters.push(
  //             {
  //               semester: formValue.semester,
  //               courses: formValue.courses,
  //               totalGrade: formValue.totalGrade,
  //               totalUnit: formValue.totalUnit,
  //               date: formValue.date,
  //               cgpa: formValue.cgpa
  //             }
  //           );

  //           return this.saveToHistoryStorage_FormatOutput_EmitHistoryObservable(localHistories);
  //         }

  //         localHistories[sessionIndex].semesters.splice(semesterIndex, 1, {
  //           semester: formValue.semester,
  //           courses: formValue.courses,
  //           totalGrade: formValue.totalGrade,
  //           totalUnit: formValue.totalUnit,
  //           date: formValue.date,
  //           cgpa: formValue.cgpa
  //         });

  //         return this.saveToHistoryStorage_FormatOutput_EmitHistoryObservable(localHistories);
  //       }),
  //       tap(savedHistories => {
  //         this.$histories.next(savedHistories);
  //       })
  //     );
  // }

  // private saveToHistoryStorage_FormatOutput_EmitHistoryObservable(localHistories): ComputedGrade[] {
  //   this.saveToHistoryStorage(localHistories);

  //   const formattedHistory = this.formattedHistory(localHistories);
  //   // this.emitHistoryObservable = formattedHistory;
  //   // this.$histories.next(formattedHistory);
  //   return formattedHistory;
  // }
}




