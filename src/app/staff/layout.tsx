import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faculty & Staff Directory',
  description: 'Meet the dedicated and experienced faculty members and department heads at Apex Academy International.',
  openGraph: {
    title: 'Faculty & Staff Directory',
    description: 'Meet the dedicated and experienced faculty members and department heads at Apex Academy International.',
  },
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
