// Main Layout with Outlet and ErrorBoundary

import { Suspense, type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ErrorBoundary } from './ErrorBoundary';
import { Coffee } from 'lucide-react';

export interface Props {
  children?: ReactNode;
}

function PageSuspenseFallback() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl border border-[#d4a373]/40 bg-[#1f1a16] text-[#d4a373]">
        <Coffee className="h-6 w-6 animate-bounce" />
      </div>
      <span className="text-xs font-medium tracking-wider text-[#a6907d] uppercase">
        Preparing Artisan Roast…
      </span>
    </div>
  );
}

export function RootLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[#120f0d] text-[#fefae0]">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <ErrorBoundary fallbackTitle="Route Render Failure">
          <Suspense fallback={<PageSuspenseFallback />}>{children ?? <Outlet />}</Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
