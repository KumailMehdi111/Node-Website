export interface SchoolInfo {
  name: string;
  tagline: string;
  established: number;
  accreditation: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  timings: string;
  principalName: string;
  principalTitle: string;
  principalMessage: string;
  principalPhoto: string;
  aboutText: string;
  vision: string;
  mission: string;
  heroImageUrl: string;
  heroCampusHighlight: string;
  stats: {
    students: string;
    teachers: string;
    passRate: string;
    campusAcres: string;
    clubsCount: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  category: 'Academic' | 'Admission' | 'Sports' | 'General' | 'Examination';
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  isImportant?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: 'Sports' | 'Cultural' | 'Academic' | 'Parent-Teacher' | 'Workshop';
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  excerpt: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  department: 'Leadership' | 'Sciences' | 'Humanities' | 'Mathematics' | 'Languages' | 'Sports' | 'Arts & Music' | 'Administration';
  qualification: string;
  experience: string;
  bio: string;
  email: string;
  photo: string;
  isLeadership?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Campus' | 'Sports' | 'Events' | 'Science & Tech' | 'Arts & Culture';
  imageUrl: string;
  date: string;
  description?: string;
}

export interface DownloadResource {
  id: string;
  title: string;
  category: 'Admissions' | 'Syllabus' | 'Forms' | 'Exam Schedules' | 'Newsletters';
  fileSize: string;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP';
  downloadUrl: string;
  uploadDate: string;
  targetAudience: 'Students' | 'Parents' | 'Staff' | 'Public';
}

export interface AcademicProgram {
  id: string;
  level: 'Primary' | 'Middle School' | 'Senior High';
  grades: string;
  description: string;
  headOfDepartment: string;
  subjects: string[];
  keyHighlights: string[];
  image: string;
}

export interface Sport {
  id: string;
  name: string;
  category: 'Indoor' | 'Outdoor' | 'Aquatics';
  coach: string;
  achievements: string[];
  description: string;
  image: string;
}

export interface Activity {
  id: string;
  name: string;
  category: 'Club' | 'Society' | 'Annual Event';
  mentor: string;
  description: string;
  meetingSchedule: string;
  image: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
