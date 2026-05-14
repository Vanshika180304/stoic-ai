'use client';

import { useSession } from '@/lib/session-context';
import { Mode } from '@/types';

export default function ModeSelector() {
  const { currentMode, setMode } = useSession();

  const handleModeChange = (mode: Mode) => {
    setMode(mode);
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="relative inline-flex bg-[var(--ivory)]/50 backdrop-blur-sm border-2 border-[var(--sandstone)] rounded-sm overflow-hidden shadow-[0_4px_16px_var(--shadow-soft)]">
        {/* Sliding background indicator */}
        <div 
          className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-br from-[var(--bronze)] to-[var(--bronze-dark)] transition-all duration-500 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`}
          style={{
            left: currentMode === 'conversation' ? '0%' : '50%',
          }}
        />
        
        <button
          onClick={() => handleModeChange('conversation')}
          className={`relative z-10 px-8 py-4 font-[var(--font-body)] text-base tracking-wide transition-all duration-500 ${
            currentMode === 'conversation'
              ? 'text-[var(--ivory)]'
              : 'text-[var(--slate-dark)] hover:text-[var(--bronze-dark)]'
          }`}
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          Conversation
        </button>
        
        <div className="relative z-10 w-px bg-[var(--sandstone)] opacity-30" />
        
        <button
          onClick={() => handleModeChange('guidance')}
          className={`relative z-10 px-8 py-4 font-[var(--font-body)] text-base tracking-wide transition-all duration-500 ${
            currentMode === 'guidance'
              ? 'text-[var(--ivory)]'
              : 'text-[var(--slate-dark)] hover:text-[var(--bronze-dark)]'
          }`}
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          Seek Guidance
        </button>
      </div>
    </div>
  );
}
