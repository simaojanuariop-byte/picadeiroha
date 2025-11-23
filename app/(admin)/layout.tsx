import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
