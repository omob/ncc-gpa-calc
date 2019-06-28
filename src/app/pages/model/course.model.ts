import { GradeRange } from './gradeConfig.model';

export class Course {
  private gradeRange: GradeRange[];

  constructor(
    public title: string,
    public unit: number,
    public point: number,
    public grade: string
  ) {
  }
}
