import { KeyboardEvent, useState } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  disabled?: boolean;
}

export default function TextInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder, 
  disabled = false 
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative">
      {/* Parchment texture background */}
      <div className="absolute inset-0 bg-[var(--ivory)] rounded-sm opacity-90" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.03' /%3E%3C/svg%3E")`
           }}
      />
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        className="relative w-full px-6 py-4 bg-transparent
                   border-2 border-[var(--sandstone)] rounded-sm 
                   text-[var(--slate-dark)] font-[var(--font-body)] text-lg leading-relaxed
                   placeholder:text-[var(--slate)] placeholder:opacity-40 placeholder:italic
                   focus:outline-none focus:border-[var(--antique-gold)]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   resize-none transition-all duration-500
                   shadow-[inset_0_2px_4px_var(--shadow-soft)]"
        style={{ 
          fontFamily: 'Crimson Pro, serif',
          letterSpacing: '0.01em'
        }}
      />
      
      {/* Golden underline animation on focus */}
      <div 
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--antique-gold)] to-transparent transition-all duration-700 ${
          isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
}
