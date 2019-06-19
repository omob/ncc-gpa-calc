import { Injectable } from '@angular/core';
import { GradeSetting, GradeRange } from './../model/gradeConfig.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

// tslint:disable: variable-name
  private _isUserSetup: boolean;
  private _userPreferredGradeSetting: GradeSetting;

  private _userGradeSetting: GradeSetting[] = [];

  constructor(private storage: Storage) {
    this._userGradeSetting = [
      {
        id: new Date().getTime().toString(),
        gradeSystem: 5,
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

  private async getSetupSetting() {
    // fetch from storage

    const setupConfig = await this.storage.get('setupConfig');

    if (!setupConfig) { return false; }

    const { isSetup, gradeSettings, preferredSetting } = setupConfig;

    this._isUserSetup = isSetup;
    this._userPreferredGradeSetting = preferredSetting;
    this._userGradeSetting = gradeSettings;

  }

  async isUserSetup() {
    await this.getSetupSetting();
    return this._isUserSetup;
  }

  get userGradePoint() {
    return this._userPreferredGradeSetting.gradeSystem;
  }

  get gradeRange(): GradeRange[] {
    // fetch users units
    // const userGradePoint = this._userGradeSetting
    //   .find(gradeConfig => gradeConfig.gradeSystem === this.userGradePoint);

    // if (!userGradePoint) { return; }
    return [ ...this._userPreferredGradeSetting.gradeRange ];
  }

  get units() {
    let units = +this.userGradePoint;
    const unitsA = [];

    while (units > 0) {
      unitsA.push(units);
      units--;
    }

    return unitsA;
  }

  userGradePointsAndGradeRange() {
    return this._userGradeSetting;
  }

  addUserGradeSettings( gradeSetting: GradeSetting): GradeSetting[] {
    // add user custom config
    this._userGradeSetting.splice(this._userGradeSetting.length, 0, gradeSetting);

    return [...this._userGradeSetting];
  }

  savedSetupConfig({ isSetup, preferredSetting }) {
    return this.storage.set('setupConfig', {
      isSetup,
      gradeSettings: this._userGradeSetting,
      preferredSetting
    });
  }
}

interface SetupConfig {
  isSetup: boolean;
  gradeSettings: GradeSetting[];
  preferredSetting: GradeSetting;
}
