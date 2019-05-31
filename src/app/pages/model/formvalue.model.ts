import { Course } from './course.model';

export interface FormValue {
  session: string;
  semester: string;
  courses: Course[];
  totalGrade: number;
  totalUnit: number;
  cgpa: string;
  date: Date;
}
