import { Courses } from '../home/courses.model';

export class ComputedGrade {
    constructor(
        public id: string,
        public session: string,
        public semester: string,
        public date: string,
        public totalUnit: string,
        public courses: string,
        public cgpa: string
    ) { }
}
