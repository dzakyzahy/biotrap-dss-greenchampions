"use client";

import { useState } from "react";
import { useSimulationStore } from "@/lib/store";
import { POME_MODES } from "@/lib/simulation/constants";
import {
  Sliders,
  BrainCircuit,
  Scale,
  Sparkles,
  RefreshCw,
  Download,
  Play,
  RotateCcw,
} from "lucide-react";
import { exportSimulationData, exportEconomicReport } from "@/lib/export";

export function ControlPanel() {
  const {
    pomeMode,
    tbsCapacity,
    codInlet,
    biocharDose,
    fiRatio,
    h2sInlet,
    pyrolysisTemp,
    pksScaleCount,
    isSimulating,
    setPomeMode,
    setParams,
    toggleLeadLag,
    resetOptimal,
    runSimulation,
    massBalanceResult,
    economicResults,
  } = useSimulationStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="border-b border-slate-800 bg-slate-900/90 p-3 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-emerald-500/30 bg-slate-950/90 px-4 py-2.5 text-xs font-bold text-emerald-300"
        >
          <span className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-emerald-400" />
            {isOpen
              ? "Sembunyikan Parameter Operasional PKS"
              : "Atur Parameter Operasional PKS & Reaktor"}
          </span>
          <Play
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {/* Left Sidebar Panel */}
      <aside
        className={`${
          isOpen ? "flex" : "hidden"
        } custom-scroller h-full w-full flex-col gap-5 overflow-y-auto border-r border-slate-800/80 bg-slate-950/75 p-5 backdrop-blur-xl lg:flex lg:w-[390px] xl:w-[420px] shrink-0`}
      >
        {/* Panel 1: Parameter Operasional PKS & Reaktor */}
        <div className="glass-card rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-emerald-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                1. Parameter Operasional PKS &amp; Reaktor
              </h2>
            </div>
            <span className="rounded bg-emerald-950 border border-emerald-700/50 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
              Real-Time Sim
            </span>
          </div>

          {/* Preset Skenario POME */}
          <div>
            <label className="mb-1 block text-[11px] font-medium text-slate-300">
              Profil Skenario Beban Limbah POME
            </label>
            <select
              value={pomeMode}
              onChange={(e) => setPomeMode(e.target.value as any)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
            >
              {Object.values(POME_MODES).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Slider 1: Kapasitas PKS (TBS) */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-300">
                Kapasitas Olah PKS (TBS)
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {tbsCapacity} Ton/jam
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="60"
              step="5"
              value={tbsCapacity}
              onChange={(e) =>
                setParams({ tbsCapacity: parseFloat(e.target.value) })
              }
              className="h-1.5 w-full cursor-pointer rounded-lg bg-slate-800"
            />
            <div className="mt-0.5 flex justify-between font-mono text-[10px] text-slate-500">
              <span>30 T/jam (PKS Kecil)</span>
              <span>45 T/jam (Standar)</span>
              <span>60 T/jam (Besar)</span>
            </div>
          </div>

          {/* Slider 2: Beban COD POME */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-300">
                Konsentrasi COD POME Inlet
              </span>
              <span className="font-mono font-bold text-cyan-400">
                {codInlet.toFixed(2)} g/L
              </span>
            </div>
            <input
              type="range"
              min="65"
              max="115"
              step="0.5"
              value={codInlet}
              onChange={(e) =>
                setParams({ codInlet: parseFloat(e.target.value) })
              }
              className="h-1.5 w-full cursor-pointer rounded-lg bg-slate-800"
            />
            <div className="mt-0.5 flex justify-between font-mono text-[10px] text-slate-500">
              <span>65 g/L</span>
              <span>Asli: 98.77 g/L (pH 4.62)</span>
              <span>115 g/L</span>
            </div>
          </div>

          {/* Slider 3: Dosis Mikro-Biochar (X1) */}
          <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/30 p-3">
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold text-emerald-200">
                Dosis Aditif Mikro-Biochar TKKS (X₁)
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {biocharDose.toFixed(2)} g/L
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={biocharDose}
              onChange={(e) =>
                setParams({ biocharDose: parseFloat(e.target.value) })
              }
              className="h-1.5 w-full cursor-pointer rounded-lg bg-slate-800"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-emerald-400/80">
              <span>0.0 g/L (Kontrol)</span>
              <span>★ Optimum RSM: 2.0 g/L</span>
              <span>4.0 g/L (Overdose)</span>
            </div>
          </div>

          {/* Slider 4: Rasio F/I (X2) */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-300">
                Feed-to-Inoculum Ratio / FI (X₂)
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {fiRatio.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.45"
              step="0.005"
              value={fiRatio}
              onChange={(e) =>
                setParams({ fiRatio: parseFloat(e.target.value) })
              }
              className="h-1.5 w-full cursor-pointer rounded-lg bg-slate-800"
            />
            <div className="mt-0.5 flex justify-between font-mono text-[10px] text-slate-500">
              <span>0.150</span>
              <span>★ Optimum RSM: 0.266</span>
              <span>0.450</span>
            </div>
          </div>

          {/* Slider 5: Raw H2S Inlet */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-300">
                Kadar Gas H₂S Mentah (Inlet Skid)
              </span>
              <span className="font-mono font-bold text-rose-400">
                {h2sInlet.toLocaleString("id-ID")} ppm
              </span>
            </div>
            <input
              type="range"
              min="1500"
              max="4000"
              step="100"
              value={h2sInlet}
              onChange={(e) =>
                setParams({ h2sInlet: parseFloat(e.target.value) })
              }
              className="h-1.5 w-full cursor-pointer rounded-lg bg-slate-800"
            />
            <div className="mt-0.5 flex justify-between font-mono text-[10px] text-slate-500">
              <span>1,500 ppm</span>
              <span>Rata-rata: 2,500 ppm</span>
              <span>4,000 ppm (Ekstrem)</span>
            </div>
          </div>

          {/* Slider 6: Suhu Aktivasi Uap Pirolisis TKKS */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-300">
                Suhu Aktivasi Uap Pirolisis TKKS
              </span>
              <span className="font-mono font-bold text-amber-400">
                {pyrolysisTemp}°C (BET {massBalanceResult.betSurfaceAreaM2g.toLocaleString("id-ID")} m²/g)
              </span>
            </div>
            <input
              type="range"
              min="700"
              max="1000"
              step="25"
              value={pyrolysisTemp}
              onChange={(e) =>
                setParams({ pyrolysisTemp: parseFloat(e.target.value) })
              }
              className="h-1.5 w-full cursor-pointer rounded-lg bg-slate-800"
            />
            <div className="mt-0.5 flex justify-between font-mono text-[10px] text-slate-500">
              <span>700°C</span>
              <span>★ Steam Activation: 950°C</span>
              <span>1,000°C</span>
            </div>
          </div>

          {/* Smart Dosing Recommendation Box */}
          <div className="rounded-xl border border-slate-700/80 bg-slate-900/95 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <BrainCircuit className="h-4 w-4" />
                AI SMART DOSING ADVISOR
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                Desirability:{" "}
                <strong className="text-emerald-400">
                  {massBalanceResult.desirabilityRSM.toFixed(3)}
                </strong>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              <strong
                className={
                  massBalanceResult.advisorStatus === "OPTIMAL"
                    ? "text-emerald-400"
                    : massBalanceResult.advisorStatus === "UNDER_DOSING"
                    ? "text-amber-400"
                    : "text-cyan-400"
                }
              >
                {massBalanceResult.advisorTitle}:
              </strong>{" "}
              {massBalanceResult.advisorMessage}
            </p>
          </div>
        </div>

        {/* Panel 2: Neraca Massa & Energi Harian PKS (Live Balance) */}
        <div className="glass-card rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                2. Neraca Massa Harian (Live Balance)
              </h3>
            </div>
            <span className="font-mono text-[10px] text-cyan-400">
              Closed-Loop
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800/70 py-1.5">
              <span className="text-slate-400">Umpan Limbah Cair POME:</span>
              <span className="font-mono font-semibold text-white">
                {massBalanceResult.pomeDailyM3.toLocaleString("id-ID")} m³/hari ({massBalanceResult.pomeHourlyM3} m³/jam)
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800/70 py-1.5">
              <span className="text-slate-400">
                Kebutuhan Mikro-Biochar Digester:
              </span>
              <span className="font-mono font-semibold text-emerald-400">
                {massBalanceResult.microBiocharDailyKg.toLocaleString("id-ID")} kg/hari ({biocharDose.toFixed(1)} g/L)
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800/70 py-1.5">
              <span className="text-slate-400">
                Timbulan Biomassa Padat TKKS:
              </span>
              <span className="font-mono font-semibold text-white">
                {massBalanceResult.tkksDailyTon} Ton/hari ({massBalanceResult.tkksHourlyTon} T/jam)
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800/70 py-1.5">
              <span className="text-slate-400">
                Produksi Pelet BioTrap-TKKS™ (950°C):
              </span>
              <span className="font-mono font-semibold text-cyan-400">
                {massBalanceResult.pelletDailyTon.toFixed(2)} Ton/hari ({massBalanceResult.pelletMonthlyTon} T/bulan)
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">
                Output Pupuk Sirkular BioSulfur™:
              </span>
              <span className="font-mono font-semibold text-amber-400">
                {massBalanceResult.fertilizerDailyTon.toFixed(2)} Ton/hari ({massBalanceResult.fertilizerDailySacks50Kg} Karung 50 kg)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons & Export */}
        <div className="space-y-2.5 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetOptimal}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Set Optimum RSM
            </button>
            <button
              onClick={toggleLeadLag}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 transition cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Switch Lead-Lag
            </button>
          </div>

          <button
            onClick={() => {
              runSimulation();
              setIsOpen(false);
            }}
            disabled={isSimulating}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/60 px-4 py-2.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-900/60 disabled:opacity-50 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" />
            {isSimulating
              ? "Menghitung Model RSM-CCD & TFM..."
              : "Sinkronisasi & Validasi Model"}
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => exportSimulationData(massBalanceResult)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-[11px] font-medium text-slate-300 transition hover:border-emerald-500/40 hover:text-white cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-emerald-400" />
              Export Neraca (.xls)
            </button>
            <button
              onClick={() => exportEconomicReport(economicResults)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-[11px] font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-white cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              Export Ekonomi (.xls)
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
