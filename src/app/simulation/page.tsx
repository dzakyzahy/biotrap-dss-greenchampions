import { Header } from '@/components/layout/Header';
import { ControlPanel } from '@/components/simulation/ControlPanel';
import { Dashboard } from '@/components/simulation/Dashboard';

export default function SimulationPage() {
  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col bg-[#080d0b] text-slate-100">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <ControlPanel />
        <Dashboard />
      </div>
    </main>
  );
}
