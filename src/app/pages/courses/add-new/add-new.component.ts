import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { FormValue } from '../../model/formvalue.model';
import { HistoryService } from './../../histories/histories.service';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})

export class AddNewComponent implements OnInit {

  addButton: boolean;
  removeButton: boolean;
  form: FormGroup;

  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private alertCtrl: AlertController,
              private historyService: HistoryService,
              private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      session: ['', Validators.required ],
      semester: ['', Validators.required ],
      courses: this.fb.array([])
    });
  }

  get courses(): FormArray {
    return (this.form.get('courses') as FormArray);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  get grades() {
    return this.authService.gradeRange;
  }

  get units() {
    return this.authService.units;
  }

  calculate() {
    if (!this.form.valid) { return; }

    const formValue = {... this.form.value } as FormValue;
    const courses = formValue.courses;

    let totalUnit = 0;
    let totalGrade = 0;

    courses.forEach(course => {
      totalUnit += course.unit;
      totalGrade += course.unit * course.grade;
    });

    formValue.totalGrade = totalGrade;
    formValue.totalUnit = totalUnit;
    formValue.cgpa = (totalGrade / totalUnit).toFixed(2);

    this.displayResult(formValue);
  }

  private async displayResult(formValue: FormValue) {
    this.alertCtrl.create({
      header: 'YOUR GPA IS',
      message: `<h1> ${formValue.cgpa} </h1>`,
      buttons: [
        {
          text: 'SAVE',
          cssClass: '',
          handler: () => {
            formValue.date = new Date();
            this.historyService.saveResult(formValue, true)
            .subscribe(response => {
              this.modalCtrl.dismiss({ message: 'saved' }, 'saved');
            });
          }
        },
        {
          text: 'Okay',
          handler: () => {
            // add to history
            formValue.date = new Date();
            this.historyService.saveResult(formValue, true);
            this.modalCtrl.dismiss({ message: 'saved' }, 'okay');
          }
        }
      ]
    })
    .then( alertEl => {
      alertEl.present();
    });

  }

  addCourseFields() {
    this.courses.push(
      this.fb.group({
        title: ['', Validators.required ],
        unit: ['', Validators.required ],
        grade: ['', Validators.required ]
      })
    );
  }

  removeCourseFields() {
    const coursesArrayLength = this.courses.length;

    if (coursesArrayLength === 0) { return; }

    this.courses.removeAt(coursesArrayLength - 1);
  }
}



