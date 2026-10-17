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

  const PIE_COLORS = ["#15803d", "#0d9488", "#d97706", "#4f46e5"];

  const tkksAllocationPie = [
    { name: "Pelet BioTrap-TKKS™ (5 mm)", value: mb.pelletDailyTon },
    { name: "Pupuk Sirkular BioSulfur™", value: mb.fertilizerDailyTon },
    { name: "Mikro-Biochar DIET (Digester)", value: +(mb.microBiocharDailyKg / 1000).toFixed(2) },
  ];

  const lcaComparisonData = [
    { stage: "Open Ponding (Konvensional)", co2PerTonCpo: 2.85, fill: "#e11d48" },
    { stage: "Anaerobic Digestion (Eksisting)", co2PerTonCpo: 1.32, fill: "#d97706" },
    { stage: "BioTrap-TKKS™ (Closed-Loop)", co2PerTonCpo: 0.9, fill: "#15803d" },
  ];

  const tabs = [
    { id: "command", label: "Command Center IoT" },
    { id: "visual", label: "Visualisasi Pabrik 3D" },
    { id: "brick", label: "Visualisasi Pelet 3D" },
    { id: "results", label: "Neraca Massa & RSM-CCD" },
    { id: "economy", label: "Tekno-Ekonomi & LCA" },
    { id: "research", label: "Mode Penelitian" },
  ] as const;

  return (
    <div className="custom-scroller flex h-full flex-1 flex-col overflow-y-auto bg-gray-100 text-gray-900">
      {/* TOP TAB NAVIGATION BAR (Like Reference Dashboard.tsx) */}
      <div className="border-b border-gray-200 bg-white px-4 lg:px-6 sticky top-0 z-20">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-3.5 text-xs sm:text-sm font-semibold transition-colors lg:px-6 cursor-pointer ${
                  isActive
                    ? "border-emerald-700 text-emerald-800"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TOP KPI METRICS BAR */}
      <div className="px-6 pt-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* KPI 1: Methane Yield */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-emerald-600">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Prediksi Methane Yield (DIET)
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-3xl font-extrabold font-mono text-gray-900">
                {mb.methaneYieldLgVS.toFixed(3)}
              </h2>
              <span className="text-xs font-mono text-gray-500">
                L CH₄ / g VS
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {mb.yieldBoostPct >= 0 ? "+" : ""}
                {mb.yieldBoostPct}% vs Kontrol (0.205)
              </span>
              <span className="text-gray-500 font-mono">
                Lag λ = {mb.lagPhaseDays} d
              </span>
            </div>
          </div>

          {/* KPI 2: H2S Outlet Purification */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-teal-600">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
              Konsentrasi H₂S Outlet Skid
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-3xl font-extrabold font-mono text-gray-900">
                {mb.h2sOutletPpm}
              </h2>
              <span className="text-xs font-mono text-gray-500">
                ppm (Target &lt;50)
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Efisiensi Serap: {mb.h2sEfficiencyPct}%
              </span>
              <span className="text-gray-500 font-mono">
                BET: {mb.betSurfaceAreaM2g.toLocaleString("id-ID")} m²/g
              </span>
            </div>
          </div>

          {/* KPI 3: Clean Power Generation */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-amber-500">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Potensi Listrik Bersih On-Site
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-3xl font-extrabold font-mono text-gray-900">
                {mb.powerMW.toFixed(2)}
              </h2>
              <span className="text-xs font-mono text-gray-500">
                MW Elektrik
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {mb.cleanBiomethaneDailyNm3.toLocaleString("id-ID")} Nm³/hari Biometana
              </span>
              <span className="text-gray-500 font-mono">
                VS Rem: {mb.vsRemovalPct}%
              </span>
            </div>
          </div>

          {/* KPI 4: Live ESG & Carbon Reduction */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-emerald-700">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Reduksi Emisi GRK (Skala SOM)
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-3xl font-extrabold font-mono text-gray-900">
                {mb.totalCarbonReductionTco2e.toLocaleString("id-ID")}
              </h2>
              <span className="text-xs font-mono text-gray-500">
                tCO₂e / tahun
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Zero B3 Waste
              </span>
              <span className="text-gray-500 font-mono">
                LCA: -68.5% CO₂
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* TAB CONTENT WORKSPACE */}
      <div className="flex-1 p-6 space-y-6">
        {/* =========================================================
            TAB 1: COMMAND CENTER IoT
           ========================================================= */}
        {activeTab === "command" && (
          <div className="space-y-6">
            {/* ROW 1: KINETIC MODELING CHARTS (TFM & H2S TELEMETRY) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Chart 1: TFM Methane Kinetics */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Kinetika Produksi Biometana (Model TFM)
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Transference Function Model (R² = 0.9850, RMSE = 0.0827 | Yan et al., 2025)
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                    Zero Lag Phase
                  </span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mb.tfmKineticSeries}>
                      <defs>
                        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#15803d" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#15803d" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="dayLabel" stroke="#6b7280" fontSize={10} />
                      <YAxis
                        domain={[0, 0.4]}
                        stroke="#6b7280"
                        fontSize={10}
                        label={{
                          value: "Cumulative CH₄ (L/g VS)",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#6b7280",
                          fontSize: 10,
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          borderRadius: "0.75rem",
                          fontSize: "12px",
                          color: "#111827",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Area
                        type="monotone"
                        dataKey="catalyzedYield"
                        name="BioTrap-TKKS™ Catalyzed (DIET, λ = -0.336 d)"
                        stroke="#15803d"
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
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Telemetri Purifikasi H₂S &amp; Kurva Breakthrough
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Kemisorpsi Basa K/Ca (pH_PZC {mb.phPzc}) &amp; Fisika Mikropori {mb.betSurfaceAreaM2g.toLocaleString("id-ID")} m²/g
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
                    Batas Aman &lt;50 ppm
                  </span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mb.h2sTelemetrySeries}>
                      <defs>
                        <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="hourLabel" stroke="#6b7280" fontSize={10} />
                      <YAxis
                        domain={[0, 65]}
                        stroke="#6b7280"
                        fontSize={10}
                        label={{
                          value: "H₂S Outlet (ppm)",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#6b7280",
                          fontSize: 10,
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          borderRadius: "0.75rem",
                          fontSize: "12px",
                          color: "#111827",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Area
                        type="monotone"
                        dataKey="outletPpm"
                        name="H₂S Outlet Lead-Lag Skid (ppm)"
                        stroke="#0d9488"
                        strokeWidth={2.5}
                        fill="url(#cyanGrad)"
                      />
                      <Line
                        type="monotone"
                        dataKey="safeLimitPpm"
                        name="Batas Aman Gas Engine (50 ppm)"
                        stroke="#e11d48"
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
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    3. Digital Twin: Modular Lead-Lag H₂S Scrubber Skid (Operasi Kontinu 24/7)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Sistem kolom kembar paralel dengan pelet silinder 5 mm (Anti-Channeling, Pressure Drop &lt;15 mbar)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLeadLag}
                    className="text-xs font-mono font-semibold bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg transition shadow-sm cursor-pointer"
                  >
                    Simulasi Switch Katup Lead-Lag
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* COLUMN A (LEAD / HARVEST) */}
                <div
                  className={
                    isColumnALead
                      ? "p-4 rounded-xl bg-emerald-50/70 border-2 border-emerald-600 relative"
                      : "p-4 rounded-xl bg-amber-50/70 border border-amber-400 relative"
                  }
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold font-mono text-gray-900">
                      KOLOM A (VESSEL-01)
                    </span>
                    <span
                      className={
                        isColumnALead
                          ? "text-[10px] font-mono font-bold bg-emerald-700 text-white px-2 py-0.5 rounded"
                          : "text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded"
                      }
                    >
                      {isColumnALead ? "LEAD • ACTIVE" : "HARVESTING BIOSULFUR™"}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Media Adsorben:</span>
                      <span className="font-mono font-semibold text-gray-900">
                        Pelet BioTrap 5 mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Tingkat Kejenuhan S⁰/SO₄²⁻:
                      </span>
                      <span className="font-mono font-bold text-amber-700">
                        {mb.colASaturationPct}% (Terpakai 52 Hari)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${mb.colASaturationPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between pt-1 text-[11px] font-mono text-gray-600">
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
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center space-y-2.5">
                  <div className="inline-block text-xs font-mono font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    AUTO-VALVE CONTROLLER
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <p className="text-[10px] text-gray-500">RAW BIOGAS IN</p>
                      <p className="font-mono font-bold text-rose-600 text-sm">
                        {h2sInlet.toLocaleString("id-ID")} ppm
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <p className="text-[10px] text-gray-500">CLEAN GAS OUT</p>
                      <p className="font-mono font-bold text-emerald-700 text-sm">
                        {mb.h2sOutletPpm} ppm
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 font-mono leading-relaxed">
                    {mb.valveStatusMessage.replace(/-/g, "-")}
                  </p>
                </div>

                {/* COLUMN B (LAG / LEAD FRESH) */}
                <div
                  className={
                    !isColumnALead
                      ? "p-4 rounded-xl bg-emerald-50/70 border-2 border-emerald-600 relative"
                      : "p-4 rounded-xl bg-gray-50 border border-gray-200 relative"
                  }
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold font-mono text-gray-900">
                      KOLOM B (VESSEL-02)
                    </span>
                    <span
                      className={
                        !isColumnALead
                          ? "text-[10px] font-mono font-bold bg-emerald-700 text-white px-2 py-0.5 rounded"
                          : "text-[10px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded"
                      }
                    >
                      {!isColumnALead ? "LEAD • ACTIVE (FRESH)" : "LAG • STANDBY"}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Media Adsorben:</span>
                      <span className="font-mono font-semibold text-gray-900">
                        Pelet BioTrap Fresh
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Tingkat Kejenuhan S⁰/SO₄²⁻:
                      </span>
                      <span className="font-mono font-bold text-emerald-700">
                        {mb.colBSaturationPct}% (Siap Backup)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${mb.colBSaturationPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between pt-1 text-[11px] font-mono text-gray-600">
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
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    4. Otomasi Rantai Pasok (Razor &amp; Blade)
                  </h3>
                  <span className="text-[10px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                    Co-Location Hub
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="font-semibold text-gray-900">
                      Repeat Order Otomatis Pelet BioTrap-TKKS™ (&quot;Blade&quot;)
                    </p>
                    <p className="text-gray-600 mt-1">
                      Jadwal pengiriman berikutnya dalam{" "}
                      <strong className="text-emerald-700">
                        {mb.remainingServiceDays} hari
                      </strong>{" "}
                      ({mb.nextRepeatOrderTon} Ton @{" "}
                      <strong className="text-gray-900">Rp12.000/kg</strong> : Hemat 60% OPEX dibanding karbon aktif batu bara Rp35.000/kg).
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="font-semibold text-gray-900">
                      Jadwal Panen &amp; Valorisasi Pupuk BioSulfur™
                    </p>
                    <p className="text-gray-600 mt-1">
                      Media jenuh sulfur (S 4-8%, C &gt;75%, KTK &gt;56 meq/100g) lolos uji TCLP &amp; PAH &lt; LoD, siap didistribusikan ke KUD Petani Sawit seharga{" "}
                      <strong className="text-amber-700">Rp2.500/kg</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial & ESG Compliance Summary */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    5. Valuasi Ekonomi &amp; Kepatuhan ISPO/RSPO
                  </h3>
                  <span className="text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                    Verified MRV
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-gray-500">CAPEX Modular Skid (&quot;Razor&quot;)</p>
                    <p className="text-lg font-bold font-mono text-gray-900 mt-0.5">
                      Rp185 Juta
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Margin 35% • TKDN ≥ 90%
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-gray-500">Penghematan Biaya B3 &amp; OPEX</p>
                    <p className="text-lg font-bold font-mono text-emerald-700 mt-0.5">
                      {formatRp(econ.annualOpexSavingsPerPksIDR)}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Per PKS / Tahun (Zero Landfill)
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-gray-500">Kelayakan Proyek (WACC 10%)</p>
                    <p className="text-lg font-bold font-mono text-teal-700 mt-0.5">
                      NPV {formatRp(econ.metrics.npvIDR)}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      IRR {econ.metrics.irrPct}% • Payback {econ.metrics.paybackYears} Thn
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-gray-500">Ekuivalensi Serapan Karbon</p>
                    <p className="text-lg font-bold font-mono text-amber-700 mt-0.5">
                      {(mb.treeEquivalentCount / 1_000_000).toFixed(1)} Juta Pohon
                    </p>
                    <p className="text-[11px] text-gray-500">
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
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Model Regresi Kuadratik RSM-CCD (2FI) &amp; Transference Function Model (TFM)
                </h3>
                <span className="rounded-lg bg-white border border-emerald-200 px-3 py-1 font-mono text-xs font-semibold text-emerald-800">
                  R² = 0,9196 (RSM) • R² = 0,9850 (TFM) • Deviasi &lt; 1,41%
                </span>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-4 font-mono text-xs sm:text-sm text-emerald-800 font-semibold text-center overflow-x-auto">
                Y₁ (Methane Yield) = β₀ + β₁X₁ (Biochar Dose) + β₂X₂ (FI Ratio) + β₁₂X₁X₂ + β₁₁X₁² + β₂₂X₂² &nbsp;|&nbsp; Y(t) = Y_max × [1 - exp(-k × (t - λ))]
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                  <div className="text-gray-500 text-[10px]">Dosis Optimal (X₁)</div>
                  <div className="text-base font-bold text-emerald-700 mt-0.5">
                    {mb.biocharDoseGpl.toFixed(2)} g/L
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                  <div className="text-gray-500 text-[10px]">Rasio F/I (X₂)</div>
                  <div className="text-base font-bold text-teal-700 mt-0.5">
                    {mb.fiRatio.toFixed(3)}
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                  <div className="text-gray-500 text-[10px]">Desirability RSM</div>
                  <div className="text-base font-bold text-amber-700 mt-0.5">
                    {mb.desirabilityRSM.toFixed(3)}
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                  <div className="text-gray-500 text-[10px]">VS Removal</div>
                  <div className="text-base font-bold text-gray-900 mt-0.5">
                    {mb.vsRemovalPct}%
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid: Mass Distribution & RSM Sensitivity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 5 Cols: Produk Biomassa TKKS Pie Chart */}
              <div className="lg:col-span-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  Distribusi Produk Upcycling TKKS &amp; Adsorben (Ton/hari)
                </h3>
                <p className="mb-4 text-xs text-gray-500">
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
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          color: "#111827",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right 7 Cols: Sensitivity Curve Biochar Dose vs Methane Yield & Power */}
              <div className="lg:col-span-7 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  Kurva Sensitivitas RSM-CCD: Dosis Mikro-Biochar (X₁) vs Methane Yield &amp; Listrik
                </h3>
                <p className="mb-4 text-xs text-gray-500">
                  Titik Puncak Desirability 0,940 tercapai pada dosis 2,00 g/L (+73,3% Biometana)
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mb.sensitivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="biocharDose" stroke="#6b7280" fontSize={11} />
                      <YAxis yAxisId="left" stroke="#15803d" fontSize={11} />
                      <YAxis yAxisId="right" orientation="right" stroke="#d97706" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          borderRadius: "0.75rem",
                          color: "#111827",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <ReferenceLine
                        yAxisId="left"
                        x={2.0}
                        stroke="#0d9488"
                        strokeDasharray="4 4"
                        label={{
                          value: "Optimum 2.0 g/L",
                          fill: "#0d9488",
                          fontSize: 11,
                        }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="methaneYield"
                        name="Methane Yield (L/g VS)"
                        stroke="#15803d"
                        strokeWidth={3}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="powerMW"
                        name="Potensi Listrik (MW)"
                        stroke="#d97706"
                        strokeWidth={2.5}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* POME Physicochemical Comparison Table */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold text-gray-900">
                Tabel Karakteristik Fisikokimia POME vs Baku Mutu Lingkungan (EQA 1977)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="border-b border-gray-200 bg-gray-50 text-[11px] uppercase text-emerald-800">
                    <tr>
                      <th className="px-4 py-3">Parameter</th>
                      <th className="px-4 py-3">POME Rata-rata</th>
                      <th className="px-4 py-3">Baku Mutu EQA 1977</th>
                      <th className="px-4 py-3">Implikasi Reaktor &amp; Solusi BioTrap-SIM™</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {POME_EQA_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 font-semibold text-gray-900">
                          {row.parameter}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-bold text-rose-600">
                          {row.pomeAvg}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-semibold text-emerald-700">
                          {row.eqaLimit}
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">{row.status}</td>
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
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-emerald-600">
                <p className="text-xs font-semibold text-emerald-700">
                  Net Present Value (WACC 10%)
                </p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-gray-900">
                  {formatRp(econ.metrics.npvIDR)}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  Skala SOM {econ.pksScaleCount} PKS Mitra
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-teal-600">
                <p className="text-xs font-semibold text-teal-700">
                  Internal Rate of Return (IRR)
                </p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-gray-900">
                  {econ.metrics.irrPct}% / Tahun
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  Jauh di atas hurdle rate 10%
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-amber-500">
                <p className="text-xs font-semibold text-amber-700">Payback Period</p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-gray-900">
                  ~{econ.metrics.paybackYears} Tahun
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  Didorong repeat order pelet kuartalan
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm border-l-4 border-l-emerald-700">
                <p className="text-xs font-semibold text-emerald-800">
                  Total Initial CAPEX Co-Location Hub
                </p>
                <p className="mt-1 font-mono text-2xl font-extrabold text-gray-900">
                  {formatRp(econ.coLocationHubCapexIDR)}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  TKDN ≥ 90% • Margin Skid 35%
                </p>
              </div>
            </div>

            {/* 5-Year Financial Projection & Cradle-to-Gate LCA Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 7 Cols: 5-Year SOM Financial Projection */}
              <div className="lg:col-span-7 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Proyeksi Keuangan 5 Tahun (Skala SOM {econ.pksScaleCount} PKS dalam Miliar Rupiah)
                    </h3>
                    <p className="text-xs text-gray-500">
                      Model B2B Razor &amp; Blade menjamin arus kas kumulatif positif +Rp22,1 Miliar pada Tahun ke-5
                    </p>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={econ.metrics.fiveYearProjections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="label" stroke="#6b7280" fontSize={11} />
                      <YAxis stroke="#6b7280" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          borderRadius: "0.75rem",
                          color: "#111827",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
                      <Bar
                        dataKey="revenueMiliar"
                        name="Revenue (Miliar Rp)"
                        fill="#15803d"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="opexMiliar"
                        name="OPEX (Miliar Rp)"
                        fill="#0f766e"
                        radius={[6, 6, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="cumulativeCashFlowMiliar"
                        name="Cumulative Cash Flow (Miliar Rp)"
                        stroke="#d97706"
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 5 Cols: Cradle-to-Gate LCA Carbon Intensity */}
              <div className="lg:col-span-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  Perbandingan Intensitas Karbon Cradle-to-Gate LCA
                </h3>
                <p className="mb-3 text-xs text-gray-500">
                  kg CO₂e / ton CPO : Penurunan drastis <strong className="text-emerald-700">-68,5%</strong> dibanding Open Ponding
                </p>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lcaComparisonData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 3.2]} stroke="#6b7280" fontSize={11} />
                      <YAxis
                        type="category"
                        dataKey="stage"
                        width={135}
                        stroke="#374151"
                        fontSize={10}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d1d5db",
                          color: "#111827",
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

            {/* Official GDI Prototype Budget Table (Rp 17.000.000) */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Rincian Anggaran Prototipe Fungsional (Sesuai Template Resmi GDI - Green Champions 2026)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Kebutuhan minimal dan realistis hingga purwarupa reaktor skid dan sistem BioTrap-SIM™ DSS teruji valid di laboratorium
                  </p>
                </div>
                <span className="rounded-xl bg-emerald-700 px-3.5 py-1.5 font-mono text-xs font-extrabold text-white shadow-sm">
                  TOTAL DANA PROTOTIPE: Rp17.000.000
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="border-b border-gray-200 bg-gray-50 text-[11px] uppercase text-emerald-800">
                    <tr>
                      <th className="px-4 py-2.5">No</th>
                      <th className="px-4 py-2.5">Komponen Biaya</th>
                      <th className="px-4 py-2.5">Kebutuhan / Item</th>
                      <th className="px-4 py-2.5">Spesifikasi / Keterangan</th>
                      <th className="px-4 py-2.5 text-right">Estimasi Biaya</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PROTOTYPE_BUDGET_ITEMS.map((b) => (
                      <tr key={b.no} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-mono text-gray-500">{b.no}</td>
                        <td className="px-4 py-2 font-semibold text-gray-900">{b.component}</td>
                        <td className="px-4 py-2 font-medium text-emerald-700">{b.item}</td>
                        <td className="px-4 py-2 text-gray-600">{b.spec}</td>
                        <td className="px-4 py-2 text-right font-mono font-bold text-gray-900">
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
