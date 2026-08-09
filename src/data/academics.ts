import { AcademicProgram } from '@/types';

export const academicProgramsData: AcademicProgram[] = [
  {
    id: 'acad-1',
    level: 'Primary',
    grades: 'Grades 1 to 5',
    description: 'Foundational inquiry-based education focused on literacy, numeracy, creative expression, environmental curiosity, and foundational social skills.',
    headOfDepartment: 'Mrs. Clara Hughes',
    subjects: ['English Language Arts', 'Mathematics', 'General Science', 'Social Studies', 'Visual Arts', 'Physical Education', 'Basic Coding & Computing'],
    keyHighlights: [
      'Interactive Smartboard classrooms',
      'Phonics & Early Reading Enrichment Program',
      'Outdoor discovery gardens',
      'Individualized student progress tracking'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'acad-2',
    level: 'Middle School',
    grades: 'Grades 6 to 8',
    description: 'Transitioning students toward rigorous analytical thinking, scientific methodology, foreign language proficiency, and team project collaboration.',
    headOfDepartment: 'Mr. Julian Vance',
    subjects: ['Advanced Mathematics', 'Physics & Chemistry Fundamentals', 'Biology & Ecology', 'World History & Civics', 'English & World Literature', 'Spanish / French / Mandarin', 'Computer Science & Robotics'],
    keyHighlights: [
      'Dedicated STEM & Maker spaces',
      'Inter-house debate & public speaking competitions',
      'Annual Science Fair participation',
      'Comprehensive student mentorship program'
    ],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'acad-3',
    level: 'Senior High',
    grades: 'Grades 9 to 12',
    description: 'Advanced university-preparatory curriculum offering AP courses, IB Diploma pathways, specialized STEM / Business streams, and college counseling.',
    headOfDepartment: 'Prof. Marcus Sterling',
    subjects: ['AP Physics C & AP Chemistry', 'AP Calculus BC & Statistics', 'Computer Science & Artificial Intelligence', 'AP Macroeconomics & Business Studies', 'World History & Global Politics', 'Advanced Bio-Tech & Genetics Lab'],
    keyHighlights: [
      '100% University admission success rate',
      'Ivy League & Global University Advisory Cell',
      'Undergraduate-level laboratory research opportunities',
      'Internship placements with tech & research institutes'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
];
