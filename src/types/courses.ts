export interface EnrollCoursePayload {
  courseId?: string;
}
export interface StatusUpdateCoursePayload {
  enrollmentId?: string;
  status?: string;
}

export interface CourseResponse {
  _id: string;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: string;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
  students: {
    name: string;
    email: string;
  }[];

  likes: any[];
}
