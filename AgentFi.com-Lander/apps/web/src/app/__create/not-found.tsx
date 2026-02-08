import { useMemo } from 'react';

export default function NotFoundPage() {
  const missingPath = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window.location.pathname || '/';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-white/60">
        The page <span className="text-white">{missingPath}</span> doesn't exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-block text-[#00D69F] underline underline-offset-4"
      >
        Go back home
      </a>
    </div>
  );
}
