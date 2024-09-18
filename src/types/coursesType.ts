export interface CourseData {
    course_code: string;
    title: string;
    author: string;
    category: string;
    overview: string;
    objectives: string[];
    modules: string[];
    prerequisites: string;
    duration: string;
    schedule: string;
    format: string;
    language: string;
    certification: string;
    course_image: File | null;
    course_name: string;
    description: string;
    lessons: number;
    credit_hours: string;
    enrollment: number;
    instructor: string;
    price: number;
  }
  