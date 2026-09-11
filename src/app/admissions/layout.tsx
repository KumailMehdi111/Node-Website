import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admissions & Enrolment',
  description: 'Apply for admission to Apex Academy International. Learn about our admission process, fee structure, and requirements.',
  openGraph: {
    title: 'Admissions & Enrolment',
    description: 'Apply for admission to Apex Academy International. Learn about our admission process, fee structure, and requirements.',
  },
};

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
