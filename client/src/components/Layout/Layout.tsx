import { type ReactNode, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  bgWhite?: boolean;
}

export default function Layout({ children, bgWhite = false }: LayoutProps) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`flex flex-col min-h-screen ${bgWhite ? 'bg-white' : 'bg-gray-50'}`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
