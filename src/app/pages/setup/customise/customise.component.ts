import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { SetupService } from './../../service/setup.service';

@Component({
  selector: 'app-customise',
  templateUrl: './customise.component.html',
  styleUrls: ['./customise.component.scss'],
})
export class CustomiseComponent implements OnInit {

  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private setupService: SetupService,
    private formBuilder: FormBuilder) {

      this.form = this.formBuilder.group({
        gradeSystem: ['', Validators.required ],
        gradeRange: this.formBuilder.array([])
      });
  }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  get gradeRange() {
    return this.form.get('gradeRange') as FormArray;
  }

  addGradeRangeField() {
    this.gradeRange.push(
      this.formBuilder.group({
        range: ['', Validators.required ],
        grade: ['', Validators.required ],
        point: ['', Validators.required ]
      })
    );
  }

  removeGradeRangeField() {
    const gradeRangeArrayLength = this.gradeRange.length;

    if (gradeRangeArrayLength === 0) { return; }

    this.gradeRange.removeAt(gradeRangeArrayLength - 1);
  }

  async addCustomGradeSystem() {
    if (!this.form.valid) { return; }

    await this.confirmAlertDialog();

  }

  async confirmAlertDialog() {
    const alertDialog = await this.alertCtrl.create({
      header: 'Save this Grade System?',
      message: 'Are you sure you want to save this entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alertCtrl.dismiss(false, 'cancel');
          }
        }, {
          text: 'Save',
          handler: () => {
            const formSaveD =  { ...this.form.value, customized: true, id: new Date().getTime().toString() };
            this.setupService.addUserGradeSettings(formSaveD);

            this.modalCtrl.dismiss(true, 'save');
          }
        }
      ]
    });

    alertDialog.present();
  }
}
