import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseStyles = "px-8 py-3.5 font-[var(--font-body)] text-base tracking-wide transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden group";
  
  const variantStyles = {
    primary: `
      bg-gradient-to-br from-[var(--bronze)] to-[var(--bronze-dark)] 
      text-[var(--ivory)] 
      shadow-[0_4px_12px_var(--shadow-soft),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_6px_20px_var(--shadow-medium),inset_0_1px_0_rgba(255,255,255,0.2)]
      hover:scale-[1.02]
      border border-[var(--bronze-dark)]
      before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100
    `,
    secondary: `
      bg-transparent 
      text-[var(--slate-dark)] 
      border-2 border-[var(--bronze)]
      hover:bg-[var(--bronze)]/5
      hover:border-[var(--bronze-dark)]
      hover:shadow-[0_4px_12px_var(--shadow-soft)]
      backdrop-blur-sm
    `
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{ fontFamily: 'Crimson Pro, serif' }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
