import { Semester } from './semester.model';

export interface History {
    id: string;
    session: string;
    semesters: Semester[];
}
