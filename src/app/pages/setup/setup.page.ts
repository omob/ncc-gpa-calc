import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GradeRange, GradeSetting } from './../model/gradeConfig.model';
import { AuthService } from './../service/auth.service';
import { SetupService } from './../service/setup.service';
import { CustomiseComponent } from './customise/customise.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {


  slideOpts;
  gradesConfigs: GradeSetting[];
  gradeRange: GradeRange[];
  gradeSystemSelected: boolean;
  selectedGradeSystem: GradeSetting;

  constructor(
    private modalCtrl: ModalController,
    private setupService: SetupService,
    private router: Router,
    private authService: AuthService) {
      this.slideOpts = {
        initialSlide: 0,
        speed: 400,
        autoPlay: true
      };
  }

  ngOnInit() {
    this.gradesConfigs = this.setupService.userGradePointsAndGradeRange();
    console.log(this.gradesConfigs);
  }

  onSelectGradeSystemChange(selectedGradeSetting: GradeSetting) {

    if (!selectedGradeSetting) {
      this.gradeSystemSelected = false;
      this.selectedGradeSystem = null;

      return;
    }

    this.gradeSystemSelected = true;
    this.selectedGradeSystem = selectedGradeSetting;

    this.gradeRange = this.getGradeRange(selectedGradeSetting.gradeSystem);
  }

  getGradeRange(gradeSystem: number) {
    if (!gradeSystem) { return; }

    const gradeConfig = this.gradesConfigs
      .find(gradesC => gradesC.gradeSystem === gradeSystem );

    if (!gradeConfig ) { return; }

    return gradeConfig.gradeRange;
  }

  onOpenCustomizeModal() {
    this.modalCtrl
      .create({ component: CustomiseComponent})
      .then( modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(({ data, role }) => {
        if ( role === 'save' && data ) {
          this.gradesConfigs = this.setupService.userGradePointsAndGradeRange();
        }
      });
  }

  async completeSetup() {
    if (this.selectedGradeSystem == null && !this.gradeSystemSelected) {
      return;
    }

    const response = await this.setupService.savedSetupConfig({
      isSetup: true,
      preferredSetting: this.selectedGradeSystem
    });

    if (!response) { return;  }

    this.router.navigateByUrl('/home');
  }
}
