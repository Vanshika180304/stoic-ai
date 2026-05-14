'use client';

import MainLayout from '@/components/MainLayout';
import Header from '@/components/Header';
import ModeSelector from '@/components/ModeSelector';
import ChatInterface from '@/components/ChatInterface';
import DailyReflection from '@/components/DailyReflection';
import { SessionProvider } from '@/lib/session-context';

export default function Home() {
  return (
    <SessionProvider>
      <MainLayout>
        <div className="animate-[fade-in_0.8s_ease-in]">
          <Header />
          <ModeSelector />
          <ChatInterface />
          <DailyReflection />
        </div>
      </MainLayout>
    </SessionProvider>
  );
}
