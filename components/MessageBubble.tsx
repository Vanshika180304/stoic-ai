'use client';

import { Message, GuidanceContent } from '@/types';
import { useEffect, useState } from 'react';

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isGuidance = typeof message.content === 'object';

    return (
        <div
            className={`mb-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            suppressHydrationWarning
        >
            {message.role === 'user' ? (
                <div className="flex justify-end">
                    <div className="max-w-[80%] bg-[var(--ivory)]/90 backdrop-blur-sm px-6 py-4 rounded-sm border-2 border-[var(--sandstone)] shadow-[0_2px_8px_var(--shadow-soft)]">
                        <p className="text-[var(--slate-dark)] leading-relaxed" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.01em' }}>
                            {message.content as string}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-start">
                    <div className="max-w-[88%]">
                        {isGuidance ? (
                            <GuidanceMessage content={message.content as GuidanceContent} />
                        ) : (
                            <div className="relative bg-gradient-to-br from-[var(--parchment-dark)] to-[var(--parchment)] px-8 py-6 rounded-sm border-2 border-[var(--bronze)]/30 shadow-[0_4px_16px_var(--shadow-medium)]">
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--antique-gold)]/20" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--antique-gold)]/20" />

                                <p className="text-[var(--slate-dark)] leading-loose italic font-light text-lg" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.015em' }}>
                                    {message.content as string}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function GuidanceMessage({ content }: { content: GuidanceContent }) {
    return (
        <div className="relative bg-gradient-to-br from-[var(--parchment)] to-[var(--parchment-dark)] px-10 py-8 rounded-sm border-2 border-[var(--bronze)] shadow-[0_6px_24px_var(--shadow-medium)]">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[var(--antique-gold)]/30" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[var(--antique-gold)]/30" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[var(--antique-gold)]/30" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[var(--antique-gold)]/30" />

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl opacity-60">🧭</span>
                        <h3 className="text-[var(--bronze-dark)] font-semibold uppercase tracking-widest text-xs" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.15em' }}>
                            Category
                        </h3>
                    </div>
                    <p className="text-[var(--slate-dark)] capitalize text-lg font-medium pl-9" style={{ fontFamily: 'Crimson Pro, serif' }}>
                        {content.category}
                    </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[var(--bronze)]/20 to-transparent" />

                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl opacity-60">🏛️</span>
                        <h3 className="text-[var(--bronze-dark)] font-semibold uppercase tracking-widest text-xs" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.15em' }}>
                            Guidance
                        </h3>
                    </div>
                    <p className="text-[var(--slate-dark)] leading-loose pl-9 text-lg" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.01em' }}>
                        {content.guidance}
                    </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[var(--bronze)]/20 to-transparent" />

                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl opacity-60">📖</span>
                        <h3 className="text-[var(--bronze-dark)] font-semibold uppercase tracking-widest text-xs" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.15em' }}>
                            Ancient Insight
                        </h3>
                    </div>
                    <p className="text-[var(--slate-dark)] leading-loose italic pl-9 text-lg font-light" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.015em' }}>
                        {content.ancientInsight}
                    </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[var(--bronze)]/20 to-transparent" />

                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl opacity-60">🪶</span>
                        <h3 className="text-[var(--bronze-dark)] font-semibold uppercase tracking-widest text-xs" style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.15em' }}>
                            Reflection
                        </h3>
                    </div>
                    <p className="text-[var(--slate-dark)] leading-loose pl-9 text-lg" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.01em' }}>
                        {content.reflection}
                    </p>
                </div>
            </div>
        </div>
    );
}
