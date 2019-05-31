import { Course } from './course.model';

export interface Semester {
    semester: string;
    courses: Course[];
    totalGrade: number;
    totalUnit: number;
    date: Date;
    cgpa: string;
}
