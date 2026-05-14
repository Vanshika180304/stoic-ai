export default function Header() {
  return (
    <header className="text-center mb-10 animate-[fade-in-slow_1.2s_ease-out]">
      {/* Laurel wreath SVG icon */}
      <div className="flex justify-center mb-6">
        <svg 
          width="64" 
          height="64" 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70 animate-[float_6s_ease-in-out_infinite]"
        >
          <path 
            d="M32 8C32 8 28 12 28 16C28 20 32 24 32 24C32 24 36 20 36 16C36 12 32 8 32 8Z" 
            stroke="var(--antique-gold)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M20 14C20 14 16 18 16 22C16 26 20 30 20 30" 
            stroke="var(--antique-gold)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M44 14C44 14 48 18 48 22C48 26 44 30 44 30" 
            stroke="var(--antique-gold)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 24C12 24 8 28 8 32C8 36 12 40 12 40" 
            stroke="var(--antique-gold)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M52 24C52 24 56 28 56 32C56 36 52 40 52 40" 
            stroke="var(--antique-gold)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 40C12 40 16 44 20 44C24 44 28 40 32 40C36 40 40 44 44 44C48 44 52 40 52 40" 
            stroke="var(--antique-gold)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <h1 className="text-6xl md:text-7xl font-[var(--font-heading)] font-semibold text-[var(--bronze-dark)] mb-4 tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        The Stoic AI
      </h1>
      
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--antique-gold)] to-transparent mx-auto mb-4 opacity-50" />
      
      <p className="text-xl md:text-2xl text-[var(--slate)] leading-relaxed max-w-2xl mx-auto font-light italic" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.02em' }}>
        A calm voice in a noisy world.<br />
        Speak. Reflect. Become still.
      </p>
    </header>
  );
}
