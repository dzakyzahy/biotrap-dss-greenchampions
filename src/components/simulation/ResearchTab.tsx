"use client";

import { useState } from "react";
import { runBioTrapSimulation } from "@/lib/simulation/massBalance";
import { calculateBioTrapEconomics } from "@/lib/simulation/economics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, FlaskConical, Play } from "lucide-react";

export function ResearchTab() {
  const [indepVar, setIndepVar] = useState<"biocharDose" | "tbsCapacity" | "h2sInlet">("biocharDose");
  const [startVal, setStartVal] = useState<number>(0.0);
  const [endVal, setEndVal] = useState<number>(4.0);
  const [stepVal, setStepVal] = useState<number>(0.25);

  const [fixedTbs, setFixedTbs] = useState<number>(45);
  const [fixedBiochar, setFixedBiochar] = useState<number>(2.0);
  const [fixedFi, setFixedFi] = useState<number>(0.266);
  const [fixedCod, setFixedCod] = useState<number>(98.77);
  const [fixedH2s, setFixedH2s] = useState<number>(2500);

  const [results, setResults] = useState<any[]>([]);

  const handleVarChange = (v: "biocharDose" | "tbsCapacity" | "h2sInlet") => {
    setIndepVar(v);
    if (v === "biocharDose") {
      setStartVal(0.0);
      setEndVal(4.0);
      setStepVal(0.25);
    } else if (v === "tbsCapacity") {
      setStartVal(30);
      setEndVal(60);
      setStepVal(5);
    } else {
      setStartVal(1500);
      setEndVal(4000);
      setStepVal(250);
    }
  };

  const runExperiment = () => {
    const newResults = [];
    const safeStep = stepVal > 0 ? stepVal : 0.25;

    for (let v = startVal; v <= endVal + 1e-6; v += safeStep) {
      const val = +v.toFixed(3);
      const curBiochar = indepVar === "biocharDose" ? val : fixedBiochar;
      const curTbs = indepVar === "tbsCapacity" ? val : fixedTbs;
      const curH2s = indepVar === "h2sInlet" ? val : fixedH2s;

      const mb = runBioTrapSimulation({
        tbsCapacity: curTbs,
        codInlet: fixedCod,
        biocharDose: curBiochar,
        fiRatio: fixedFi,
        h2sInlet: curH2s,
        pyrolysisTemp: 950,
        isColumnALead: true,
        pksScaleCount: 25,
      });

      const econ = calculateBioTrapEconomics(mb);

      newResults.push({
        xValue: val,
        methaneYield: mb.methaneYieldLgVS,
        desirability: mb.desirabilityRSM,
        powerMW: mb.powerMW,
        h2sOutlet: mb.h2sOutletPpm,
        carbonReduction: mb.totalCarbonReductionTco2e,
        npvMiliar: +(econ.metrics.npvIDR / 1e9).toFixed(2),
        pelletTonDay: mb.pelletDailyTon,
        bioSulfurTonDay: mb.fertilizerDailyTon,
      });
    }
    setResults(newResults);
  };

  const downloadCSV = () => {
    if (results.length === 0) return;
    const headers = [
      "Variabel_X",
      "Methane_Yield_L_gVS",
      "Desirability_RSM",
      "Listrik_MW",
      "H2S_Outlet_ppm",
      "Reduksi_GRK_tCO2e_thn",
      "NPV_SOM_Miliar_Rp",
      "Pelet_BioTrap_Ton_hari",
      "Pupuk_BioSulfur_Ton_hari",
    ];
    const rows = results.map((r) => [
      r.xValue,
      r.methaneYield,
      r.desirability,
      r.powerMW,
      r.h2sOutlet,
      r.carbonReduction,
      r.npvMiliar,
      r.pelletTonDay,
      r.bioSulfurTonDay,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `eksperimen_biotrap_sim_${indepVar}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const xLabel =
    indepVar === "biocharDose"
      ? "Dosis Mikro-Biochar X₁ (g/L)"
      : indepVar === "tbsCapacity"
      ? "Kapasitas PKS (Ton TBS/jam)"
      : "Inlet H₂S Mentah (ppm)";

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                Mode Penelitian &amp; Eksperimen Parametrik RSM-CCD
              </h2>
              <p className="text-xs text-slate-400">
                Simulasi kolektif multi-titik untuk validasi sensitivitas kinetika metana (TFM), desulfurisasi H₂S, dan kelayakan ekonomi
              </p>
            </div>
          </div>
          <span className="rounded-lg bg-emerald-950 border border-emerald-700/50 px-3 py-1 font-mono text-xs text-emerald-400">
            Yan et al. (2025) • R² = 0,9850
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Variable Sweep Config */}
          <div className="space-y-4 border-b border-slate-800 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-300">
                Variabel Independen (Sumbu X)
              </label>
              <select
                value={indepVar}
                onChange={(e) => handleVarChange(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
              >
                <option value="biocharDose">
                  Dosis Mikro-Biochar TKKS / X₁ (0,0 – 4,0 g/L)
                </option>
                <option value="tbsCapacity">
                  Kapasitas Olah PKS / TBS (30 – 60 Ton/jam)
                </option>
                <option value="h2sInlet">
                  Beban H₂S Mentah Inlet Skid (1.500 – 4.000 ppm)
                </option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-[11px] text-slate-400">
                  Nilai Awal
                </label>
                <input
                  type="number"
                  step="any"
                  value={startVal}
                  onChange={(e) => setStartVal(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-xs text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-slate-400">
                  Nilai Akhir
                </label>
                <input
                  type="number"
                  step="any"
                  value={endVal}
                  onChange={(e) => setEndVal(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-xs text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-slate-400">
                  Interval (Step)
                </label>
                <input
                  type="number"
                  step="any"
                  value={stepVal}
                  onChange={(e) => setStepVal(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-xs text-white"
                />
              </div>
            </div>

            <button
              onClick={runExperiment}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            >
              <Play className="h-4 w-4" />
              Jalankan Pengambilan Data Eksperimen
            </button>
          </div>

          {/* Right: Control Variables */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Variabel Kontrol (Tetap)
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="mb-1 block text-[11px] text-slate-400">
                  Rasio F/I (X₂)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fixedFi}
                  onChange={(e) => setFixedFi(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-slate-400">
                  COD POME (g/L)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={fixedCod}
                  onChange={(e) => setFixedCod(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-white"
                />
              </div>
              {indepVar !== "tbsCapacity" && (
                <div>
                  <label className="mb-1 block text-[11px] text-slate-400">
                    Kapasitas TBS (T/jam)
                  </label>
                  <input
                    type="number"
                    value={fixedTbs}
                    onChange={(e) => setFixedTbs(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-white"
                  />
                </div>
              )}
              {indepVar !== "biocharDose" && (
                <div>
                  <label className="mb-1 block text-[11px] text-slate-400">
                    Dosis Biochar (g/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={fixedBiochar}
                    onChange={(e) => setFixedBiochar(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-white"
                  />
                </div>
              )}
              {indepVar !== "h2sInlet" && (
                <div>
                  <label className="mb-1 block text-[11px] text-slate-400">
                    Inlet H₂S (ppm)
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={fixedH2s}
                    onChange={(e) => setFixedH2s(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2 font-mono text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Graph 1: Methane Yield & Desirability */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400">
                1. Respon Methane Yield (L/g VS) &amp; Desirability RSM vs {xLabel}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="xValue" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        color: "#f8fafc",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="methaneYield"
                      stroke="#10b981"
                      name="Methane Yield (L/g VS)"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="desirability"
                      stroke="#06b6d4"
                      name="Desirability RSM"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graph 2: Clean Power & NPV */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-400">
                2. Potensi Listrik (MW) &amp; NPV Proyek (Miliar Rp) vs {xLabel}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="xValue" stroke="#94a3b8" fontSize={11} />
                    <YAxis yAxisId="left" stroke="#f59e0b" fontSize={11} />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        color: "#f8fafc",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="powerMW"
                      stroke="#f59e0b"
                      name="Daya Listrik (MW)"
                      strokeWidth={3}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="npvMiliar"
                      stroke="#10b981"
                      name="NPV SOM (Miliar Rp)"
                      strokeWidth={2.5}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="glass-card rounded-2xl p-5 overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                Tabel Hasil Pengambilan Data Parametrik
              </h3>
              <button
                onClick={downloadCSV}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Export Tabel ke CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-900/90 font-mono text-[11px] uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3">{xLabel}</th>
                    <th className="px-4 py-3">CH₄ Yield (L/g VS)</th>
                    <th className="px-4 py-3">Desirability</th>
                    <th className="px-4 py-3">Listrik (MW)</th>
                    <th className="px-4 py-3">H₂S Out (ppm)</th>
                    <th className="px-4 py-3">Reduksi GRK (tCO₂e)</th>
                    <th className="px-4 py-3">NPV SOM (Miliar Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {results.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-900/50">
                      <td className="px-4 py-2.5 font-bold text-white">
                        {r.xValue}
                      </td>
                      <td className="px-4 py-2.5 text-emerald-400">
                        {r.methaneYield.toFixed(3)}
                      </td>
                      <td className="px-4 py-2.5 text-cyan-400">
                        {r.desirability.toFixed(3)}
                      </td>
                      <td className="px-4 py-2.5 text-amber-400">
                        {r.powerMW.toFixed(2)} MW
                      </td>
                      <td className="px-4 py-2.5 text-slate-200">
                        {r.h2sOutlet} ppm
                      </td>
                      <td className="px-4 py-2.5 text-emerald-300">
                        {r.carbonReduction.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-2.5 font-bold text-white">
                        Rp {r.npvMiliar} M
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
