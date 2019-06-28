
import { Course } from './course.model';

export class ComputedGrade {
    constructor(
        public id: string,
        public session: string,
        public semester: string,
        public date: string,
        public totalUnit: string,
        public totalPoint: string,
        public courses: Course[],
        public cgpa: string
    ) { }
}
