import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// tslint:disable: variable-name

  private _isUserSetupUp: boolean;
  private _userGradePoint = 5;

  userGradeSetting: GradeSetting[];

  constructor() {
    this.userGradeSetting = [
      {
        gradePoint: 5,
        gradeRange: [
          {
            range: '70 - 100',
            grade: 'A',
            point: 5
          },
          {
            range: '60 - 69',
            grade: 'B',
            point: 4
          },
          {
            range: '50 - 59',
            grade: 'C',
            point: 3
          },
          {
            range: '40 - 49',
            grade: 'D',
            point: 2
          },
          {
            range: '35 - 39',
            grade: 'E',
            point: 1
          },
          {
            range: '0 - 34',
            grade: 'F',
            point: 0
          }
        ]
      }
    ];
  }

  private getSetupStatus(): boolean {
    // fetch from storage
    return this._isUserSetupUp = false;
  }

  get isUserSetup(): boolean {
    return this.getSetupStatus();
  }

  get userGradePoint() {
    return this._userGradePoint;
  }

  set userGradePoint(userGradePoint: number) {
    if ( !userGradePoint) { return; }

    this._userGradePoint = userGradePoint;
  }

  get gradeRange(): GradeRange[] {
    // fetch users units
    const userGradePoint = this.userGradeSetting
      .find(gradeConfig => gradeConfig.gradePoint === this.userGradePoint);

    if (!userGradePoint) { return; }

    return [ ...userGradePoint.gradeRange ];
  }

  get units() {
    let units = +this.userGradePoint;
    let unitsA = [];

    while (units > 0) {
      unitsA.push(units);
      units--;
    }

    return unitsA;
  }
}

interface GradeSetting {
  gradePoint: number;
  gradeRange: GradeRange[];
}

interface GradeRange {
  range: string;
  grade: string;
  point: number;
}
