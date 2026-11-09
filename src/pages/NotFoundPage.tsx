// Custom 404 Route Page

import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#3d332a] bg-[#1a1411] text-[#d4a373]">
        <Coffee className="h-10 w-10" />
      </div>

      <span className="mt-6 text-xs font-bold tracking-widest text-[#d4a373] uppercase">
        404 Error
      </span>

      <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#fefae0] sm:text-5xl">
        Roast Not Located
      </h1>

      <p className="mt-4 max-w-md text-xs leading-relaxed text-[#a6907d]">
        The page or coffee lot you are looking for does not exist or has been shifted in our catalog
        index.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#d4a373] px-6 py-3.5 text-xs font-bold text-[#120f0d] transition-all hover:bg-[#faedcd]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}

export default NotFoundPage;
