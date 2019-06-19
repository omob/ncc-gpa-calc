import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from './../../histories/histories.service';
import { ComputedGrade } from './../../model/computedGrade.model';
import { AuthService } from './../../service/auth.service';
import { SetupService } from './../../service/setup.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

  id: string;
  semester: string;
  form: FormGroup;
  courseDetail: ComputedGrade;

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

    this.historyService.getSemesterDetail(this.id, this.semester)
      .subscribe((history) => {
        if (history) {
          this.form = this.fb.group({
            session: [history.session, Validators.required ],
            semester: [history.semester, Validators.required ],
            courses: this.fb.array(history.courses)
          });
        }
        // console.log(history)
        // this.form.get('session').patchValue(history.session);
        // this.form.get('semester').patchValue(history.semester);
        // this.form.get('courses').patchValue(history.courses);
        // console.log(this.form.get('courses').value);
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
}