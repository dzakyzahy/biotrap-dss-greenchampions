"use client";

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Slider } from '@/components/ui/slider';
import { calculateKudValorization } from '@/lib/simulation/communityRecipe';
import { PROTOTYPE_BUDGET_ITEMS } from '@/lib/simulation/constants';
import {
  Sprout,
  ShieldCheck,
  Package,
  Coins,
  Leaf,
  Factory,
  Sparkles,
  Scale,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
} from 'lucide-react';
import Link from 'next/link';

export default function EmpowermentPage() {
  const [spentPelletKg, setSpentPelletKg] = useState<number>(18000);
  const [sulfurGrade, setSulfurGrade] = useState<'STANDARD' | 'HIGH_SULFUR'>('STANDARD');
  const [applicationTarget, setApplicationTarget] = useState<'SAWIT_PLASMA' | 'HORTIKULTURA'>('SAWIT_PLASMA');
  const [pksClusterCount, setPksClusterCount] = useState<number>(1);

  const totalSpentKg = spentPelletKg * pksClusterCount;
  const kud = calculateKudValorization(totalSpentKg, sulfurGrade, applicationTarget);

  const applyPreset = (
    kgPerPks: number,
    grade: 'STANDARD' | 'HIGH_SULFUR',
    target: 'SAWIT_PLASMA' | 'HORTIKULTURA',
    cluster: number
  ) => {
    setSpentPelletKg(kgPerPks);
    setSulfurGrade(grade);
    setApplicationTarget(target);
    setPksClusterCount(cluster);
  };

  return (
    <div className="min-h-screen bg-[#080d0b] text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-950/90 via-teal-950/85 to-slate-900 rounded-3xl p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold mb-4 uppercase tracking-wider">
              <Sprout className="w-4 h-4 mr-1 text-amber-400" />
              Hilirisasi Ekonomi Sirkular KUD Petani Sawit & PKS
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight text-white">
              Kalkulator Valorisasi <span className="text-amber-400">BioSulfur™</span> & Suplai Pelet{' '}
              <span className="text-emerald-400">BioTrap-TKKS™</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Berbeda dengan adsorben besi oksida (<code className="text-amber-300">Fe₂O₃</code>) atau karbon aktif batubara impor yang berakhir menjadi <strong>limbah B3 di TPA</strong>, pelet <strong>BioTrap-TKKS™</strong> yang telah jenuh mengikat sulfur (<code className="text-emerald-300">S⁰ / SO₄²⁻</code>) langsung di-<em>upcycle</em> menjadi pupuk <em>slow-release</em> <strong>BioSulfur™</strong> untuk Koperasi Unit Desa (KUD) petani sawit rakyat.
            </p>
          </div>
          <Sprout className="w-56 h-56 text-emerald-500/10 absolute -right-8 -bottom-8 transform rotate-12 pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Interactive Controls */}
          <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/20 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Parameter Kemitraan PKS & KUD</h2>
                <p className="text-xs text-slate-400">{kud.hubLocationName}</p>
              </div>
              <Factory className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => applyPreset(12000, 'STANDARD', 'SAWIT_PLASMA', 1)}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800/70 hover:border-emerald-500/50 text-slate-200 transition-all"
              >
                1 PKS Kecil
                <span className="block text-[10px] text-slate-400 font-mono">12 Ton/Thn</span>
              </button>
              <button
                onClick={() => applyPreset(18000, 'STANDARD', 'SAWIT_PLASMA', 1)}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold border border-emerald-500/50 bg-emerald-500/15 text-emerald-300 transition-all"
              >
                1 PKS Standar
                <span className="block text-[10px] text-emerald-400 font-mono">18 Ton/Thn</span>
              </button>
              <button
                onClick={() => applyPreset(18000, 'HIGH_SULFUR', 'SAWIT_PLASMA', 25)}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold border border-amber-500/40 bg-amber-500/15 text-amber-300 transition-all"
              >
                Klaster SOM
                <span className="block text-[10px] text-amber-400 font-mono">25 PKS (Sumatra)</span>
              </button>
            </div>

            <div className="space-y-5">
              {/* Slider 1: Massa Pelet Jenuh per PKS */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Panen Media Kolom Scrubber / PKS</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {(spentPelletKg / 1000).toFixed(1)} Ton/Thn ({spentPelletKg.toLocaleString('id-ID')} kg)
                  </span>
                </div>
                <Slider
                  value={[spentPelletKg]}
                  min={3000}
                  max={36000}
                  step={1500}
                  onValueChange={(v) => setSpentPelletKg(v[0])}
                />
              </div>

              {/* Slider 2: Jumlah Klaster PKS */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Jumlah Klaster PKS Mitra KUD</span>
                  <span className="font-mono font-bold text-lime-400">{pksClusterCount} Unit PKS</span>
                </div>
                <Slider
                  value={[pksClusterCount]}
                  min={1}
                  max={25}
                  step={1}
                  onValueChange={(v) => setPksClusterCount(v[0])}
                />
              </div>

              {/* Pilihan Grade Sulfur */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Grade Kandungan Sulfur Terikat</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSulfurGrade('STANDARD')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      sulfurGrade === 'STANDARD'
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    Standard Grade
                    <span className="block text-[10px] font-mono text-slate-400">6,4% S⁰/SO₄²⁻ • KTK 78,5</span>
                  </button>
                  <button
                    onClick={() => setSulfurGrade('HIGH_SULFUR')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      sulfurGrade === 'HIGH_SULFUR'
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    High-Sulfur Grade
                    <span className="block text-[10px] font-mono text-slate-400">7,8% S⁰/SO₄²⁻ • KTK 94,2</span>
                  </button>
                </div>
              </div>

              {/* Pilihan Komoditas Aplikasi */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Target Komoditas Pertanian KUD</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setApplicationTarget('SAWIT_PLASMA')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      applicationTarget === 'SAWIT_PLASMA'
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    Kebun Sawit Plasma
                    <span className="block text-[10px] font-mono text-slate-400">Dosis 2,5 kg/pokok/thn</span>
                  </button>
                  <button
                    onClick={() => setApplicationTarget('HORTIKULTURA')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      applicationTarget === 'HORTIKULTURA'
                        ? 'bg-teal-500/15 border-teal-500/50 text-teal-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    Hortikultura & Pangan
                    <span className="block text-[10px] font-mono text-slate-400">Dosis 1,2 kg/tanaman</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Safety Validation Box */}
            <div className="p-4 rounded-xl border bg-emerald-950/50 border-emerald-500/40 text-emerald-200 space-y-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-2">
                    Status Keamanan Tanah:
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      {kud.safetyStatus} (PP 22/2021)
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{kud.safetyMessage}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20 text-[10px] font-mono">
                {Object.entries(kud.labTestResults).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between bg-slate-950/70 px-2 py-1 rounded">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-emerald-300">
                      {val.actual} / {val.limit} {val.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Output Recipe & KUD Benefits */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top 4 Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/30">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  <span>Produksi Pupuk BioSulfur™</span>
                  <Package className="w-4 h-4" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-white">
                  {(kud.bioSulfurTotalKg / 1000).toFixed(1)}{' '}
                  <span className="text-base font-normal text-slate-400">Ton/Tahun</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Setara <strong className="text-amber-300">{kud.bioSulfurSacks50Kg.toLocaleString('id-ID')} Karung (@50 kg)</strong> pupuk S-organik <em>slow-release</em> siap sebar.
                </p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  <span>Cakupan Lahan Kebun Sawit</span>
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-white">
                  {kud.plantationAreaHectares.toLocaleString('id-ID')}{' '}
                  <span className="text-base font-normal text-slate-400">Hektar/Tahun</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Melayani nutrisi sulfur & karbon untuk <strong className="text-emerald-300">{kud.treesFertilizedCount.toLocaleString('id-ID')} pohon sawit</strong> produktif.
                </p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-teal-500/30">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
                  <span>Penghematan Belanja Pupuk Petani</span>
                  <Coins className="w-4 h-4" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-white">
                  Rp {(kud.farmerCostSavingsIDR / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })}{' '}
                  <span className="text-base font-normal text-slate-400">Juta/Thn</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Hemat <strong className="text-teal-300">{kud.farmerSavingsPct}%</strong> dibanding pupuk ZA/Kieserite komersial (Rp{kud.costPerTreeIDR.toLocaleString('id-ID')}/pohon).
                </p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-lime-500/30">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
                  <span>Nilai Hilirisasi BioSulfur™ PKS</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-white">
                  Rp {(kud.bioSulfurPurchaseCostIDR / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })}{' '}
                  <span className="text-base font-normal text-slate-400">Juta/Thn</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Pendapatan sirkular baru dari penjualan BioSulfur™ (@Rp2.500/kg) sekaligus <strong>Zero B3 Disposal Cost</strong>.
                </p>
              </div>
            </div>

            {/* Neraca Kuantitas Kemasan & Kualitas Agronomi */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  Spesifikasi Kemasan Logistik & Parameter Agronomi Tanah
                </h3>
                <Link
                  href="/simulation"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  Lihat di Simulator 3D <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Repeat Order Pelet (Blade)</span>
                  <span className="text-lg font-bold font-mono text-white block">
                    {kud.bladeReplacementSacks25Kg.toLocaleString('id-ID')} Karung
                  </span>
                  <span className="text-emerald-400 font-mono">Kemasan @25 kg Pelet Segar</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Kadar Sulfur & Karbon</span>
                  <span className="text-lg font-bold font-mono text-amber-300 block">
                    {kud.sulfurContentPct}% S • {kud.carbonContentPct}% C
                  </span>
                  <span className="text-slate-400">Rasio H/C 0,15 (Sekuestrasi Ratusan Tahun)</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Peningkatan KTK & Air Tanah</span>
                  <span className="text-lg font-bold font-mono text-lime-300 block">
                    +{kud.waterRetentionBoostPct}% Retensi Air
                  </span>
                  <span className="text-slate-400">KTK Tanah: {kud.ktkValueMeq} meq/100g</span>
                </div>
              </div>

              {/* SOP Steps */}
              <div className="pt-2 space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-amber-400" />
                  SOP Lapangan Co-Location Hub & Aplikasi KUD Petani Sawit:
                </div>
                <div className="space-y-2">
                  {kud.valorizationSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/90 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rincian Anggaran Prototipe GDI Rp 17.000.000 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-500/25 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                    Rencana Anggaran Biaya (RAB) Implementasi Prototipe GDI
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Alokasi Hibah Riset & Fabrikasi Pilot BioTrap-TKKS™ (Total Rp17.000.000)
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                  100% Sesuai Pagu GDI
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3">Komponen</th>
                      <th className="py-2.5 px-3">Item & Spesifikasi Teknis</th>
                      <th className="py-2.5 px-3 text-right">Biaya (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {PROTOTYPE_BUDGET_ITEMS.map((row) => (
                      <tr key={row.no} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-semibold text-emerald-300">{row.component}</td>
                        <td className="py-2.5 px-3 text-slate-300">
                          <span className="font-semibold text-white">{row.item}</span> — {row.spec}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-white">
                          Rp {row.costIDR.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-emerald-500/30 bg-emerald-950/30 font-bold text-white">
                      <td colSpan={2} className="py-3 px-3">
                        TOTAL ANGGARAN PROTOTIPE & VALIDASI (GREEN CHAMPIONS 2026)
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-400">Rp 17.000.000</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
