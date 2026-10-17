"use client";

import { useState } from "react";
import { useSimulationStore } from "@/lib/store";
import { POME_EQA_COMPARISON, PROTOTYPE_BUDGET_ITEMS } from "@/lib/simulation/constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ReferenceLine,
  ComposedChart,
} from "recharts";
import {
  Flame,
  Filter,
  Zap,
  Leaf,
  TrendingUp,
  Activity,
  Server,
  RefreshCw,
  Gauge,
  Truck,
  PackageCheck,
  Sprout,
  BadgeDollarSign,
  Box,
  Layers,
  FlaskConical,
  LayoutDashboard,
} from "lucide-react";
import { ReactorScene } from "./ReactorScene";
import { GeopolymerBrickScene } from "./GeopolymerBrickScene";
import { ResearchTab } from "./ResearchTab";

const formatRp = (value: number): string => {
  if (Math.abs(value) >= 1e12) return `Rp ${(value / 1e12).toFixed(2)} T`;
  if (Math.abs(value) >= 1e9) return `Rp ${(value / 1e9).toFixed(2)} M`;
  if (Math.abs(value) >= 1e6) return `Rp ${(value / 1e6).toFixed(1)} Jt`;
  return `Rp ${value.toLocaleString("id-ID")}`;
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    "command" | "visual" | "brick" | "results" | "economy" | "research"
  >("command");

  const {
    massBalanceResult: mb,
    economicResults: econ,
    isColumnALead,
    toggleLeadLag,
    h2sInlet,
  } = useSimulationStore();

  const PIE_COLORS = ["#10b981", "#06b6d4", "#f59e0b", "#6366f1"];

  const tkksAllocationPie = [
    { name: "Pelet BioTrap-TKKS™ (5 mm)", value: mb.pelletDailyTon },
    { name: "Pupuk Sirkular BioSulfur™", value: mb.fertilizerDailyTon },
    { name: "Mikro-Biochar DIET (Digester)", value: +(mb.microBiocharDailyKg / 1000).toFixed(2) },
  ];

  const lcaComparisonData = [
    { stage: "Open Ponding (Konvensional)", co2PerTonCpo: 2.85, fill: "#f43f5e" },
    { stage: "Anaerobic Digestion (Eksisting)", co2PerTonCpo: 1.32, fill: "#f59e0b" },
    { stage: "BioTrap-TKKS™ (Closed-Loop)", co2PerTonCpo: 0.9, fill: "#10b981" },
  ];

  const tabs = [
    { id: "command", label: "Command Center IoT", icon: LayoutDashboard },
    { id: "visual", label: "3D Pabrik & Skid", icon: Server },
    { id: "brick", label: "3D Pelet & Pori Honeycomb", icon: Box },
    { id: "results", label: "Neraca Massa & RSM-CCD", icon: Layers },
    { id: "economy", label: "Tekno-Ekonomi & LCA", icon: BadgeDollarSign },
    { id: "research", label: "Mode Penelitian", icon: FlaskConical },
  ] as const;

  return (
    <div className="custom-scroller flex h-full flex-1 flex-col overflow-y-auto bg-transparent">
      {/* TOP KPI METRICS BAR (4 HIGH-IMPACT CARDS FROM HTML-NYA BROO.HTML) */}
      <div className="px-5 pt-5">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* KPI 1: Methane Yield */}
          <div className="glass-card-emerald rounded-2xl p-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300/90">
                  Prediksi Methane Yield (DIET)
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-3xl font-extrabold font-mono text-white">
                    {mb.methaneYieldLgVS.toFixed(3)}
                  </h2>
                  <span className="text-xs font-mono text-emerald-300">
                    L CH₄ / g VS
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-700/50">
                {mb.yieldBoostPct >= 0 ? "+" : ""}
                {mb.yieldBoostPct}% vs Kontrol (0.205)
              </span>
              <span className="text-slate-400 font-mono">
                Lag λ = {mb.lagPhaseDays} d
              </span>
            </div>
          </div>

          {/* KPI 2: H2S Outlet Purification */}
          <div className="glass-card rounded-2xl p-4 relative overflow-hidden border-l-4 border-l-cyan-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Konsentrasi H₂S Outlet Skid
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-3xl font-extrabold font-mono text-cyan-400">
                    {mb.h2sOutletPpm}
                  </h2>
                  <span className="text-xs font-mono text-slate-400">
                    ppm (Target &lt;50)
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Filter className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                Efisiensi Serap: {mb.h2sEfficiencyPct}%
              </span>
              <span className="text-slate-400 font-mono">
                BET: {mb.betSurfaceAreaM2g.toLocaleString("id-ID")} m²/g
              </span>
            </div>
          </div>

          {/* KPI 3: Clean Power Generation */}
          <div className="glass-card rounded-2xl p-4 relative overflow-hidden border-l-4 border-l-amber-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Potensi Listrik Bersih On-Site
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-3xl font-extrabold font-mono text-amber-400">
                    {mb.powerMW.toFixed(2)}
                  </h2>
                  <span className="text-xs font-mono text-slate-400">
                    MW Elektrik
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/50">
                {mb.cleanBiomethaneDailyNm3.toLocaleString("id-ID")} Nm³/hari Biometana
              </span>
              <span className="text-slate-400 font-mono">
                VS Rem: {mb.vsRemovalPct}%
              </span>
            </div>
          </div>

          {/* KPI 4: Live ESG & Carbon Reduction */}
          <div className="glass-card rounded-2xl p-4 relative overflow-hidden border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Reduksi Emisi GRK (Skala SOM)
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-3xl font-extrabold font-mono text-emerald-400">
                    {mb.totalCarbonReductionTco2e.toLocaleString("id-ID")}
                  </h2>
                  <span className="text-xs font-mono text-slate-400">
                    tCO₂e / tahun
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                100% Zero B3 Waste
              </span>
              <span className="text-slate-400 font-mono">
                LCA: -68.5% CO₂
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* TAB NAVIGATION BAR */}
      <div className="mt-5 border-b border-slate-800/80 bg-slate-900/60 px-5 backdrop-blur-md sticky top-0 z-20">
        <div className="flex overflow-x-auto gap-1 py-2 no-scrollbar">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT WORKSPACE */}
      <div className="flex-1 p-5 space-y-6">
        {/* =========================================================
            TAB 1: COMMAND CENTER IoT (FULL HTML-NYA BROO.HTML FLOW)
           ========================================================= */}
        {activeTab === "command" && (
          <div className="space-y-6">
            {/* ROW 1: KINETIC MODELING CHARTS (TFM & H2S TELEMETRY) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Chart 1: TFM Methane Kinetics */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Kinetika Produksi Biometana (Model TFM)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Transference Function Model (R² = 0.9850, RMSE = 0.0827 | Yan et al., 2025)
                    </p>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded">
                    Zero Lag Phase
                  </span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mb.tfmKineticSeries}>
                      <defs>
                        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={10} />
                      <YAxis
                        domain={[0, 0.4]}
                        stroke="#94a3b8"
                        fontSize={10}
                        label={{
                          value: "Cumulative CH₄ (L/g VS)",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#94a3b8",
                          fontSize: 10,
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#10b981",
                          borderRadius: "0.75rem",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Area
                        type="monotone"
                        dataKey="catalyzedYield"
                        name="BioTrap-TKKS™ Catalyzed (DIET, λ = -0.336 d)"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fill="url(#emeraldGrad)"
                      />
                      <Line
                        type="monotone"
                        dataKey="controlYield"
                        name="Kontrol Konvensional (Tanpa Biochar)"
                        stroke="#64748b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Real-Time H2S Adsorption Breakthrough */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      Telemetri Purifikasi H₂S &amp; Kurva Breakthrough
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Kemisorpsi Basa K/Ca (pH_PZC {mb.phPzc}) &amp; Fisika Mikropori {mb.betSurfaceAreaM2g.toLocaleString("id-ID")} m²/g
                    </p>
                  </div>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700/50 px-2 py-0.5 rounded">
                    Batas Aman &lt;50 ppm
                  </span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mb.h2sTelemetrySeries}>
                      <defs>
                        <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="hourLabel" stroke="#94a3b8" fontSize={10} />
                      <YAxis
                        domain={[0, 65]}
                        stroke="#94a3b8"
                        fontSize={10}
                        label={{
                          value: "H₂S Outlet (ppm)",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#94a3b8",
                          fontSize: 10,
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#06b6d4",
                          borderRadius: "0.75rem",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Area
                        type="monotone"
                        dataKey="outletPpm"
                        name="H₂S Outlet Lead-Lag Skid (ppm)"
                        stroke="#06b6d4"
                        strokeWidth={2.5}
                        fill="url(#cyanGrad)"
                      />
                      <Line
                        type="monotone"
                        dataKey="safeLimitPpm"
                        name="Batas Aman Gas Engine (50 ppm)"
                        stroke="#f43f5e"
                        strokeWidth={1.8}
                        strokeDasharray="4 4"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ROW 2: MODULAR LEAD-LAG H2S SCRUBBER SKID DIGITAL TWIN */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    3. Digital Twin: Modular Lead-Lag H₂S Scrubber Skid (Operasi Kontinu 24/7)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sistem kolom kembar paralel dengan pelet silinder 5 mm (Anti-Channeling, Pressure Drop &lt;15 mbar)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLeadLag}
                    className="text-xs font-mono font-semibold bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-lg shadow-cyan-600/20 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Simulasi Switch Katup Lead-Lag
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* COLUMN A (LEAD / HARVEST) */}
                <div
                  className={
                    isColumnALead
                      ? "p-4 rounded-xl bg-emerald-950/30 border-2 border-emerald-500/60 relative"
                      : "p-4 rounded-xl bg-amber-950/20 border border-amber-600/50 relative"
                  }
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold font-mono text-white">
                      KOLOM A (VESSEL-01)
                    </span>
                    <span
                      className={
                        isColumnALead
                          ? "text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded"
                          : "text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded"
                      }
                    >
                      {isColumnALead ? "LEAD • ACTIVE" : "HARVESTING BIOSULFUR™"}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Media Adsorben:</span>
                      <span className="font-mono text-white">
                        Pelet BioTrap 5 mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        Tingkat Kejenuhan S⁰/SO₄²⁻:
                      </span>
                      <span className="font-mono font-bold text-amber-400">
                        {mb.colASaturationPct}% (Terpakai 52 Hari)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${mb.colASaturationPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between pt-1 text-[11px] font-mono text-slate-400">
                      <span>
                        ΔP: <strong>{mb.colAPressureDropMbar} mbar</strong>
                      </span>
                      <span>
                        Suhu: <strong>{mb.colATempC}°C</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* CENTER PIPING & TELEMETRY CONTROLLER */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                    <Gauge className="w-3.5 h-3.5" /> AUTO-VALVE CONTROLLER
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <p className="text-[10px] text-slate-400">RAW BIOGAS IN</p>
                      <p className="font-mono font-bold text-rose-400 text-sm">
                        {h2sInlet.toLocaleString("id-ID")} ppm
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <p className="text-[10px] text-slate-400">CLEAN GAS OUT</p>
                      <p className="font-mono font-bold text-emerald-400 text-sm">
                        {mb.h2sOutletPpm} ppm
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                    {mb.valveStatusMessage}
                  </p>
                </div>

                {/* COLUMN B (LAG / LEAD FRESH) */}
                <div
                  className={
                    !isColumnALead
                      ? "p-4 rounded-xl bg-emerald-950/30 border-2 border-emerald-500/60 relative"
                      : "p-4 rounded-xl bg-slate-900/70 border border-slate-700/80 relative"
                  }
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold font-mono text-white">
                      KOLOM B (VESSEL-02)
                    </span>
                    <span
                      className={
                        !isColumnALead
                          ? "text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded"
                          : "text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded"
                      }
                    >
                      {!isColumnALead ? "LEAD • ACTIVE (FRESH)" : "LAG • STANDBY"}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Media Adsorben:</span>
                      <span className="font-mono text-white">
                        Pelet BioTrap Fresh
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        Tingkat Kejenuhan S⁰/SO₄²⁻:
                      </span>
                      <span className="font-mono font-bold text-emerald-400">
                        {mb.colBSaturationPct}% (Siap Backup)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${mb.colBSaturationPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between pt-1 text-[11px] font-mono text-slate-400">
                      <span>
                        ΔP: <strong>{mb.colBPressureDropMbar} mbar</strong>
                      </span>
                      <span>
                        Suhu: <strong>{mb.colBTempC}°C</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: RAZOR & BLADE SUPPLY CHAIN AUTOMATION & ESG FINANCIAL METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Automated Razor & Blade Supply Chain */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      4. Otomasi Rantai Pasok (Razor &amp; Blade)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                    Co-Location Hub
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <PackageCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">
                        Repeat Order Otomatis Pelet BioTrap-TKKS™ (&quot;Blade&quot;)
                      </p>
                      <p className="text-slate-400 mt-0.5">
                        Jadwal pengiriman berikutnya dalam{" "}
                        <strong className="text-emerald-300">
                          {mb.remainingServiceDays} hari
                        </strong>{" "}
                        ({mb.nextRepeatOrderTon} Ton @{" "}
                        <strong className="text-white">Rp12.000/kg</strong> — Hemat 60% OPEX dibanding karbon aktif batu bara Rp35.000/kg).
                      </p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <Sprout className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">
                        Jadwal Panen &amp; Valorisasi Pupuk BioSulfur™
                      </p>
                      <p className="text-slate-400 mt-0.5">
                        Media jenuh sulfur (S 4–8%, C &gt;75%, KTK &gt;56 meq/100g) lolos uji TCLP &amp; PAH &lt; LoD, siap didistribusikan ke KUD Petani Sawit seharga{" "}
                        <strong className="text-amber-300">Rp2.500/kg</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial & ESG Compliance Summary */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <BadgeDollarSign className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      5. Valuasi Ekonomi &amp; Kepatuhan ISPO/RSPO
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Verified MRV
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-slate-400">CAPEX Modular Skid (&quot;Razor&quot;)</p>
                    <p className="text-lg font-bold font-mono text-white mt-0.5">
                      Rp185 Juta
                    </p>
                    <p className="text-[11px] text-emerald-400">
                      Margin 35% • TKDN ≥ 90%
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-slate-400">Penghematan Biaya B3 &amp; OPEX</p>
                    <p className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                      {formatRp(econ.annualOpexSavingsPerPksIDR)}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Per PKS / Tahun (Zero Landfill)
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-slate-400">Kelayakan Proyek (WACC 10%)</p>
                    <p className="text-lg font-bold font-mono text-cyan-400 mt-0.5">
                      NPV {formatRp(econ.metrics.npvIDR)}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      IRR {econ.metrics.irrPct}% • Payback {econ.metrics.paybackYears} Thn
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-slate-400">Ekuivalensi Serapan Karbon</p>
                    <p className="text-lg font-bold font-mono text-amber-400 mt-0.5">
                      {(mb.treeEquivalentCount / 1_000_000).toFixed(1)} Juta Pohon
                    </p>
                    <p className="text-[11px] text-slate-400">
                      SDG 7, 9, 12 &amp; 13 Compliant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: 3D PLANT & LEAD-LAG SCRUBBER SKID VISUALIZATION
           ========================================================= */}
        {activeTab === "visual" && (
          <div className="h-[600px] w-full">
            <ReactorScene />
          </div>
        )}

        {/* =========================================================
            TAB 3: 3D PELLET & HONEYCOMB MICROSTRUCTURE VISUALIZATION
           ========================================================= */}
        {activeTab === "brick" && (
          <div className="h-[600px] w-full">
            <GeopolymerBrickScene />
          </div>
        )}

        {/* =========================================================
            TAB 4: NERACA MASSA, STOIKIOMETRI & RSM-CCD OPTIMIZATION
           ========================================================= */}
        {activeTab === "results" && (
          <div className="space-y-6">
            {/* RSM-CCD Mathematical Equation Banner */}
            <div className="glass-card-emerald rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  ⚗️ Model Regresi Kuadratik RSM-CCD (2FI) &amp; Transference Function Model (TFM)
                </h3>
                <span className="rounded-lg bg-emerald-950 border border-emerald-500/40 px-3 py-1 font-mono text-xs text-emerald-300">
                  R² = 0,9196 (RSM) • R² = 0,9850 (TFM) • Deviasi &lt; 1,41%
                </span>
              </div>
              <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-emerald-300 text-center overflow-x-auto">
                Y₁ (Methane Yield) = β₀ + β₁X₁ (Biochar Dose) + β₂X₂ (FI Ratio) + β₁₂X₁X₂ + β₁₁X₁² + β₂₂X₂² &nbsp;|&nbsp; Y(t) = Y_max × [1 - exp(-k × (t - λ))]
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-center">
                  <div className="text-slate-400 text-[10px]">Dosis Optimal (X₁)</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    {mb.biocharDoseGpl.toFixed(2)} g/L
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-center">
                  <div className="text-slate-400 text-[10px]">Rasio F/I (X₂)</div>
                  <div className="text-base font-bold text-cyan-400 mt-0.5">
                    {mb.fiRatio.toFixed(3)}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-center">
                  <div className="text-slate-400 text-[10px]">Desirability RSM</div>
                  <div className="text-base font-bold text-amber-400 mt-0.5">
                    {mb.desirabilityRSM.toFixed(3)}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-center">
                  <div className="text-slate-400 text-[10px]">VS Removal</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {mb.vsRemovalPct}%
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid: Mass Distribution & RSM Sensitivity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 5 Cols: Produk Biomassa TKKS Pie Chart */}
              <div className="lg:col-span-5 glass-card rounded-2xl p-5">
                <h3 className="mb-1 text-sm font-bold text-white">
                  Distribusi Produk Upcycling TKKS &amp; Adsorben (Ton/hari)
                </h3>
                <p className="mb-4 text-xs text-slate-400">
                  Total Timbulan TKKS: {mb.tkksDailyTon} Ton/hari ({mb.tkksHourlyTon} T/jam)
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tkksAllocationPie}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={88}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value} T`}
                      >
                        {tkksAllocationPie.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                          color: "#f8fafc",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right 7 Cols: Sensitivity Curve Biochar Dose vs Methane Yield & Power */}
              <div className="lg:col-span-7 glass-card rounded-2xl p-5">
                <h3 className="mb-1 text-sm font-bold text-white">
                  Kurva Sensitivitas RSM-CCD: Dosis Mikro-Biochar (X₁) vs Methane Yield &amp; Listrik
                </h3>
                <p className="mb-4 text-xs text-slate-400">
                  Titik Puncak Desirability 0,940 tercapai pada dosis 2,00 g/L (+73,3% Biometana)
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mb.sensitivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                      <XAxis dataKey="biocharDose" stroke="#94a3b8" fontSize={11} />
                      <YAxis yAxisId="left" stroke="#10b981" fontSize={11} />
                      <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#10b981",
                          borderRadius: "0.75rem",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <ReferenceLine
                        yAxisId="left"
                        x={2.0}
                        stroke="#06b6d4"
                        strokeDasharray="4 4"
                        label={{
                          value: "Optimum 2.0 g/L",
                          fill: "#06b6d4",
                          fontSize: 11,
                        }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="methaneYield"
                        name="Methane Yield (L/g VS)"
                        stroke="#10b981"
                        strokeWidth={3}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="powerMW"
                        name="Potensi Listrik (MW)"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* POME Physicochemical Comparison Table (Page 3 PDF) */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-bold text-white">
                Tabel Karakteristik Fisikokimia POME vs Baku Mutu Lingkungan (EQA 1977)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-slate-800 bg-slate-900/90 text-[11px] uppercase text-emerald-400">
                    <tr>
                      <th className="px-4 py-3">Parameter</th>
                      <th className="px-4 py-3">POME Rata-rata</th>
                      <th className="px-4 py-3">Baku Mutu EQA 1977</th>
                      <th className="px-4 py-3">Implikasi Reaktor &amp; Solusi BioTrap-SIM™</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {POME_EQA_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="px-4 py-2.5 font-semibold text-white">
                          {row.parameter}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-bold text-rose-400">
                          {row.pomeAvg}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-emerald-400">
                          {row.eqaLimit}
                        </td>
                        <td className="px-4 py-2.5 text-slate-300">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: TEKNO-EKONOMI (SOM 25 PKS), ANGGARAN GDI & LCA
           ========================================================= */}
        {activeTab === "economy" && (
          <div className="space-y-6">
            {/* Top 4 Financial Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass-card-emerald rounded-2xl p-4">
                <p className="text-xs text-emerald-300">
                  Net Present Value (WACC 10%)
                </p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-white">
                  {formatRp(econ.metrics.npvIDR)}
                </p>
                <p className="mt-1 text-[11px] text-emerald-400">
                  Skala SOM {econ.pksScaleCount} PKS Mitra
                </p>
              </div>
              <div className="glass-card rounded-2xl p-4 border-l-4 border-l-cyan-500">
                <p className="text-xs text-slate-400">
                  Internal Rate of Return (IRR)
                </p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-cyan-400">
                  {econ.metrics.irrPct}% / Tahun
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Jauh di atas hurdle rate 10%
                </p>
              </div>
              <div className="glass-card rounded-2xl p-4 border-l-4 border-l-amber-500">
                <p className="text-xs text-slate-400">Payback Period</p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-amber-400">
                  ~{econ.metrics.paybackYears} Tahun
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Didorong repeat order pelet kuartalan
                </p>
              </div>
              <div className="glass-card rounded-2xl p-4 border-l-4 border-l-emerald-500">
                <p className="text-xs text-slate-400">
                  Total Initial CAPEX Co-Location Hub
                </p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-white">
                  {formatRp(econ.coLocationHubCapexIDR)}
                </p>
                <p className="mt-1 text-[11px] text-emerald-400">
                  TKDN ≥ 90% • Margin Skid 35%
                </p>
              </div>
            </div>

            {/* 5-Year Financial Projection & Cradle-to-Gate LCA Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 7 Cols: 5-Year SOM Financial Projection (Page 12 PDF) */}
              <div className="lg:col-span-7 glass-card rounded-2xl p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Proyeksi Keuangan 5 Tahun (Skala SOM {econ.pksScaleCount} PKS — Miliar Rupiah)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Model B2B Razor &amp; Blade menjamin arus kas kumulatif positif +Rp22,1 Miliar pada Tahun ke-5
                    </p>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={econ.metrics.fiveYearProjections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                      <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#10b981",
                          borderRadius: "0.75rem",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
                      <Bar
                        dataKey="revenueMiliar"
                        name="Revenue (Miliar Rp)"
                        fill="#10b981"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="opexMiliar"
                        name="OPEX (Miliar Rp)"
                        fill="#0f3f5c"
                        radius={[6, 6, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="cumulativeCashFlowMiliar"
                        name="Cumulative Cash Flow (Miliar Rp)"
                        stroke="#f59e0b"
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 5 Cols: Cradle-to-Gate LCA Carbon Intensity (Page 9 PDF) */}
              <div className="lg:col-span-5 glass-card rounded-2xl p-5">
                <h3 className="mb-1 text-sm font-bold text-white">
                  Perbandingan Intensitas Karbon Cradle-to-Gate LCA
                </h3>
                <p className="mb-3 text-xs text-slate-400">
                  kg CO₂e / ton CPO — Penurunan drastis <strong className="text-emerald-400">-68,5%</strong> dibanding Open Ponding
                </p>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lcaComparisonData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                      <XAxis type="number" domain={[0, 3.2]} stroke="#94a3b8" fontSize={11} />
                      <YAxis
                        type="category"
                        dataKey="stage"
                        width={135}
                        stroke="#cbd5e1"
                        fontSize={10}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                        }}
                      />
                      <Bar dataKey="co2PerTonCpo" name="kg CO₂e / ton CPO" radius={[0, 8, 8, 0]}>
                        {lcaComparisonData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Official GDI Prototype Budget Table (Rp 17.000.000 - Page 12 PDF) */}
            <div className="glass-card rounded-2xl p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Rincian Anggaran Prototipe Fungsional (Sesuai Template Resmi GDI — Green Champions 2026)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kebutuhan minimal dan realistis hingga purwarupa reaktor skid dan sistem BioTrap-SIM™ DSS teruji valid di laboratorium
                  </p>
                </div>
                <span className="rounded-xl bg-emerald-600 px-3.5 py-1.5 font-mono text-xs font-extrabold text-white shadow-md">
                  TOTAL DANA PROTOTIPE: Rp17.000.000
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-slate-800 bg-slate-900/90 text-[11px] uppercase text-emerald-400">
                    <tr>
                      <th className="px-4 py-2.5">No</th>
                      <th className="px-4 py-2.5">Komponen Biaya</th>
                      <th className="px-4 py-2.5">Kebutuhan / Item</th>
                      <th className="px-4 py-2.5">Spesifikasi / Keterangan</th>
                      <th className="px-4 py-2.5 text-right">Estimasi Biaya</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {PROTOTYPE_BUDGET_ITEMS.map((b) => (
                      <tr key={b.no} className="hover:bg-slate-900/50">
                        <td className="px-4 py-2 font-mono text-slate-400">{b.no}</td>
                        <td className="px-4 py-2 font-semibold text-white">{b.component}</td>
                        <td className="px-4 py-2 text-emerald-300">{b.item}</td>
                        <td className="px-4 py-2 text-slate-400">{b.spec}</td>
                        <td className="px-4 py-2 text-right font-mono font-bold text-white">
                          Rp{b.costIDR.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: RESEARCH MODE
           ========================================================= */}
        {activeTab === "research" && <ResearchTab />}
      </div>
    </div>
  );
}
