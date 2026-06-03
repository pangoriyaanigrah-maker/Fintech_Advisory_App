import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Advisor from '@/components/sections/Advisor';
import DashboardSandbox from '@/components/sections/DashboardSandbox';
import Goals from '@/components/sections/Goals';
import ChatInterface from '@/components/sections/ChatInterface';
import SIPCalculator from '@/components/sections/SIPCalculator';
import LearningModules from '@/components/sections/LearningModules';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Advisor />
        <DashboardSandbox />
        <Goals />
        <ChatInterface />
        <SIPCalculator />
        <LearningModules />
      </main>
      <Footer />
    </>
  );
}
