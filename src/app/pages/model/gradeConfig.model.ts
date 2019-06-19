
export interface GradeSetting {
    id: string;
    gradeSystem: number;
    gradeRange: GradeRange[];
    customized?: boolean;
  }

export  interface GradeRange {
    range: string;
    grade: string;
    point: number;
  }
