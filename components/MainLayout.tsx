import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle marble texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Greek geometric pattern - top */}
      <div className="absolute top-0 left-0 right-0 h-1 opacity-20">
        <div className="h-full bg-gradient-to-r from-transparent via-[var(--antique-gold)] to-transparent" />
      </div>
      
      {/* Main content container */}
      <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-16 z-10">
        {/* Decorative column motif - top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-[var(--antique-gold)] to-transparent opacity-30" />
        
        {/* Content wrapper with subtle shadow */}
        <div className="relative">
          {children}
        </div>
        
        {/* Decorative column motif - bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-[var(--antique-gold)] to-transparent opacity-30" />
      </div>
      
      {/* Greek geometric pattern - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 opacity-20">
        <div className="h-full bg-gradient-to-r from-transparent via-[var(--antique-gold)] to-transparent" />
      </div>
      
      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[var(--antique-gold)] opacity-20" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[var(--antique-gold)] opacity-20" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[var(--antique-gold)] opacity-20" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[var(--antique-gold)] opacity-20" />
    </div>
  );
}
