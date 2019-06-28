import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryService } from './../../../histories/histories.service';
import { ComputedGrade } from './../../../model/computedGrade.model';
import { SetupService } from './../../../service/setup.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

export class EditComponent implements OnInit {

  id: string;
  semester: string;
  form: FormGroup;
  courseDetail: ComputedGrade;
  subscription: Subscription;

  constructor(
    private historyService: HistoryService,
    private router: Router,
    private fb: FormBuilder,
    private setupService: SetupService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.semester = this.route.snapshot.queryParamMap.get('semester');

    if (!(this.id && this.semester)) {
      this.router.navigate(['/home']);
      return;
    }


  }

  ionViewWillEnter() {
    if (!this.historyService.isInitialized) {
      this.historyService.initializeHistories();
    }

    this.subscription = this.historyService.getSemesterDetail(this.id, this.semester)
      .subscribe((history) => {
        if (history) {
          this.form = this.fb.group({
            session: [history.session, Validators.required ],
            semester: [history.semester, Validators.required ],
            courses: this.fb.array(history.courses)
          });
        }
      });
  }

  get courses(): FormArray {
    return (this.form.get('courses') as FormArray);
  }

  get grades() {
    return this.setupService.gradeRange;
  }

  get units() {
    return this.setupService.units;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {
    
  }

}
