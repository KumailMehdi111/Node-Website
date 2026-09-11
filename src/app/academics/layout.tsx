import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Curriculum & Excellence',
  description: 'Explore our comprehensive CBSE & IB academic programs, curriculum, and educational approach at Apex Academy International.',
  openGraph: {
    title: 'Academic Curriculum & Excellence',
    description: 'Explore our comprehensive CBSE & IB academic programs, curriculum, and educational approach.',
  },
};

export default function AcademicsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
