'use client';

import { useState } from 'react';
import Button from './Button';

export default function DailyReflection() {
  const [reflection, setReflection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReflection = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/daily-reflection');

      if (!response.ok) {
        throw new Error('Failed to fetch reflection');
      }

      const data = await response.json();
      setReflection(data.reflection);
    } catch (err) {
      console.error('Error fetching reflection:', err);
      setError('The path to wisdom encounters obstacles. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 animate-[fade-in-slow_1.4s_ease-out]">
      <div className="text-center mb-6">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--antique-gold)] to-transparent mx-auto mb-3 opacity-40" />
        <h2 className="text-3xl font-semibold text-[var(--bronze-dark)] mb-2 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Daily Reflection
        </h2>
        <p className="text-[var(--slate)] text-base italic font-light" style={{ fontFamily: 'Crimson Pro, serif' }}>
          A moment of Stoic contemplation
        </p>
      </div>

      {!reflection && !error && (
        <div className="text-center">
          <Button onClick={fetchReflection} disabled={isLoading} variant="secondary">
            {isLoading ? 'Contemplating...' : 'Receive Today\'s Reflection'}
          </Button>
        </div>
      )}

      {reflection && (
        <div className="relative bg-gradient-to-br from-[var(--ivory)] to-[var(--parchment)] border-2 border-[var(--bronze)] rounded-sm px-10 py-8 shadow-[0_8px_32px_var(--shadow-medium)]">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--antique-gold)]/30" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[var(--antique-gold)]/30" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[var(--antique-gold)]/30" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[var(--antique-gold)]/30" />
          
          <div className="flex flex-col items-center gap-4">
            {/* Laurel icon */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="opacity-40">
              <path d="M16 4C16 4 14 6 14 8C14 10 16 12 16 12C16 12 18 10 18 8C18 6 16 4 16 4Z" stroke="var(--antique-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 7C10 7 8 9 8 11C8 13 10 15 10 15" stroke="var(--antique-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 7C22 7 24 9 24 11C24 13 22 15 22 15" stroke="var(--antique-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 12C6 12 4 14 4 16C4 18 6 20 6 20" stroke="var(--antique-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M26 12C26 12 28 14 28 16C28 18 26 20 26 20" stroke="var(--antique-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 20C6 20 8 22 10 22C12 22 14 20 16 20C18 20 20 22 22 22C24 22 26 20 26 20" stroke="var(--antique-gold)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            
            <div className="flex-1 text-center">
              <p className="text-[var(--slate-dark)] leading-loose text-xl italic font-light" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.02em' }}>
                {reflection}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button onClick={fetchReflection} disabled={isLoading} variant="secondary">
              {isLoading ? 'Contemplating...' : 'Refresh Reflection'}
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-[var(--parchment-dark)]/80 backdrop-blur-sm border-2 border-[var(--bronze)]/30 rounded-sm px-8 py-6 text-center shadow-[0_4px_16px_var(--shadow-soft)]">
          <p className="text-[var(--slate-dark)] italic font-light" style={{ fontFamily: 'Crimson Pro, serif' }}>{error}</p>
          <div className="mt-6">
            <Button onClick={fetchReflection} disabled={isLoading} variant="secondary">
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
