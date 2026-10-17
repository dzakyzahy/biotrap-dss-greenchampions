"use client";

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Slider } from '@/components/ui/slider';
import { calculateKudValorization } from '@/lib/simulation/communityRecipe';
import { PROTOTYPE_BUDGET_ITEMS } from '@/lib/simulation/constants';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header />

      {/* Clean Green Banner like reference */}
      <div className="bg-emerald-800 px-6 py-14 text-white">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-emerald-100 hover:text-white mb-4"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Kembali ke Beranda
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold mb-3 uppercase tracking-wider">
              Hilirisasi Ekonomi Sirkular KUD Petani Sawit &amp; PKS
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight text-white">
              Kalkulator Valorisasi BioSulfur™ &amp; Suplai Pelet BioTrap-TKKS™
            </h1>
            <p className="text-emerald-50 text-sm md:text-base leading-relaxed">
              Berbeda dengan adsorben besi oksida (<code className="text-amber-200 font-semibold">Fe₂O₃</code>) atau karbon aktif batubara impor yang berakhir menjadi <strong>limbah B3 di TPA</strong>, pelet <strong>BioTrap-TKKS™</strong> yang telah jenuh mengikat sulfur (<code className="text-white font-semibold">S⁰ / SO₄²⁻</code>) langsung di-<em>upcycle</em> menjadi pupuk <em>slow-release</em> <strong>BioSulfur™</strong> untuk Koperasi Unit Desa (KUD) petani sawit rakyat.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Interactive Controls */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-gray-900">Parameter Kemitraan PKS &amp; KUD</h2>
              <p className="text-xs text-gray-500 mt-0.5">{kud.hubLocationName}</p>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => applyPreset(12000, 'STANDARD', 'SAWIT_PLASMA', 1)}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold border border-gray-200 bg-gray-50 hover:border-emerald-600 text-gray-800 transition-all"
              >
                1 PKS Kecil
                <span className="block text-[10px] text-gray-500 font-mono">12 Ton/Thn</span>
              </button>
              <button
                onClick={() => applyPreset(18000, 'STANDARD', 'SAWIT_PLASMA', 1)}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold border border-emerald-600 bg-emerald-50 text-emerald-800 transition-all"
              >
                1 PKS Standar
                <span className="block text-[10px] text-emerald-700 font-mono">18 Ton/Thn</span>
              </button>
              <button
                onClick={() => applyPreset(18000, 'HIGH_SULFUR', 'SAWIT_PLASMA', 25)}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold border border-amber-500 bg-amber-50 text-amber-800 transition-all"
              >
                Klaster SOM
                <span className="block text-[10px] text-amber-700 font-mono">25 PKS (Sumatra)</span>
              </button>
            </div>

            <div className="space-y-5">
              {/* Slider 1: Massa Pelet Jenuh per PKS */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-700">Panen Media Kolom Scrubber / PKS</span>
                  <span className="font-mono font-bold text-emerald-700">
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
                  <span className="font-semibold text-gray-700">Jumlah Klaster PKS Mitra KUD</span>
                  <span className="font-mono font-bold text-emerald-700">{pksClusterCount} Unit PKS</span>
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
                <span className="text-xs font-semibold text-gray-700 block">Grade Kandungan Sulfur Terikat</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSulfurGrade('STANDARD')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      sulfurGrade === 'STANDARD'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    Standard Grade
                    <span className="block text-[10px] font-mono text-gray-500">6,4% S⁰/SO₄²⁻ • KTK 78,5</span>
                  </button>
                  <button
                    onClick={() => setSulfurGrade('HIGH_SULFUR')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      sulfurGrade === 'HIGH_SULFUR'
                        ? 'bg-amber-50 border-amber-600 text-amber-900'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    High-Sulfur Grade
                    <span className="block text-[10px] font-mono text-gray-500">7,8% S⁰/SO₄²⁻ • KTK 94,2</span>
                  </button>
                </div>
              </div>

              {/* Pilihan Komoditas Aplikasi */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-700 block">Target Komoditas Pertanian KUD</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setApplicationTarget('SAWIT_PLASMA')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      applicationTarget === 'SAWIT_PLASMA'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    Kebun Sawit Plasma
                    <span className="block text-[10px] font-mono text-gray-500">Dosis 2,5 kg/pokok/thn</span>
                  </button>
                  <button
                    onClick={() => setApplicationTarget('HORTIKULTURA')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      applicationTarget === 'HORTIKULTURA'
                        ? 'bg-teal-50 border-teal-600 text-teal-900'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    Hortikultura &amp; Pangan
                    <span className="block text-[10px] font-mono text-gray-500">Dosis 1,2 kg/tanaman</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Safety Validation Box */}
            <div className="p-4 rounded-xl border bg-emerald-50/70 border-emerald-200 text-gray-800 space-y-2">
              <div className="text-xs space-y-1.5">
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  Status Keamanan Tanah:
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px]">
                    {kud.safetyStatus} (PP 22/2021)
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-[11px]">{kud.safetyMessage}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200 text-[10px] font-mono">
                {Object.entries(kud.labTestResults).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between bg-white px-2 py-1 rounded border border-emerald-100">
                    <span className="text-gray-500">{key}:</span>
                    <span className="text-emerald-700 font-semibold">
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
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-2">
                  Produksi Pupuk BioSulfur™
                </span>
                <div className="text-3xl font-extrabold font-mono text-gray-900">
                  {(kud.bioSulfurTotalKg / 1000).toFixed(1)}{' '}
                  <span className="text-base font-normal text-gray-500">Ton/Tahun</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Setara <strong className="text-amber-700">{kud.bioSulfurSacks50Kg.toLocaleString('id-ID')} Karung (@50 kg)</strong> pupuk S-organik <em>slow-release</em> siap sebar.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                  Cakupan Lahan Kebun Sawit
                </span>
                <div className="text-3xl font-extrabold font-mono text-gray-900">
                  {kud.plantationAreaHectares.toLocaleString('id-ID')}{' '}
                  <span className="text-base font-normal text-gray-500">Hektar/Tahun</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Melayani nutrisi sulfur &amp; karbon untuk <strong className="text-emerald-700">{kud.treesFertilizedCount.toLocaleString('id-ID')} pohon sawit</strong> produktif.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-2">
                  Penghematan Belanja Pupuk Petani
                </span>
                <div className="text-3xl font-extrabold font-mono text-gray-900">
                  Rp {(kud.farmerCostSavingsIDR / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })}{' '}
                  <span className="text-base font-normal text-gray-500">Juta/Thn</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Hemat <strong className="text-teal-700">{kud.farmerSavingsPct}%</strong> dibanding pupuk ZA/Kieserite komersial (Rp{kud.costPerTreeIDR.toLocaleString('id-ID')}/pohon).
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Nilai Hilirisasi BioSulfur™ PKS
                </span>
                <div className="text-3xl font-extrabold font-mono text-gray-900">
                  Rp {(kud.bioSulfurPurchaseCostIDR / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })}{' '}
                  <span className="text-base font-normal text-gray-500">Juta/Thn</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Pendapatan sirkular baru dari penjualan BioSulfur™ (@Rp2.500/kg) sekaligus <strong>Zero B3 Disposal Cost</strong>.
                </p>
              </div>
            </div>

            {/* Neraca Kuantitas Kemasan & Kualitas Agronomi */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  Spesifikasi Kemasan Logistik &amp; Parameter Agronomi Tanah
                </h3>
                <Link
                  href="/simulation"
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                >
                  Lihat di Simulator 3D <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-500 block mb-1">Repeat Order Pelet (Blade)</span>
                  <span className="text-lg font-bold font-mono text-gray-900 block">
                    {kud.bladeReplacementSacks25Kg.toLocaleString('id-ID')} Karung
                  </span>
                  <span className="text-emerald-700 font-mono font-semibold">Kemasan @25 kg Pelet Segar</span>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-500 block mb-1">Kadar Sulfur &amp; Karbon</span>
                  <span className="text-lg font-bold font-mono text-amber-700 block">
                    {kud.sulfurContentPct}% S • {kud.carbonContentPct}% C
                  </span>
                  <span className="text-gray-500">Rasio H/C 0,15 (Sekuestrasi Ratusan Tahun)</span>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-500 block mb-1">Peningkatan KTK &amp; Air Tanah</span>
                  <span className="text-lg font-bold font-mono text-emerald-700 block">
                    +{kud.waterRetentionBoostPct}% Retensi Air
                  </span>
                  <span className="text-gray-500">KTK Tanah: {kud.ktkValueMeq} meq/100g</span>
                </div>
              </div>

              {/* SOP Steps */}
              <div className="pt-2 space-y-2">
                <div className="text-xs font-bold text-gray-800">
                  SOP Lapangan Co-Location Hub &amp; Aplikasi KUD Petani Sawit:
                </div>
                <div className="space-y-2">
                  {kud.valorizationSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700"
                    >
                      {step.replace(/-/g, '-')}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rincian Anggaran Prototipe GDI Rp 17.000.000 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
                    Rencana Anggaran Biaya (RAB) Implementasi Prototipe GDI
                  </span>
                  <h3 className="text-base font-bold text-gray-900">
                    Alokasi Hibah Riset &amp; Fabrikasi Pilot BioTrap-TKKS™ (Total Rp17.000.000)
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
                  100% Sesuai Pagu GDI
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500">
                      <th className="py-2.5 px-3">Komponen</th>
                      <th className="py-2.5 px-3">Item &amp; Spesifikasi Teknis</th>
                      <th className="py-2.5 px-3 text-right">Biaya (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PROTOTYPE_BUDGET_ITEMS.map((row) => (
                      <tr key={row.no} className="hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-semibold text-emerald-800">{row.component}</td>
                        <td className="py-2.5 px-3 text-gray-600">
                          <span className="font-semibold text-gray-900">{row.item}</span> : {row.spec}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold text-gray-900">
                          Rp {row.costIDR.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-emerald-200 bg-emerald-50/60 font-bold text-gray-900">
                      <td colSpan={2} className="py-3 px-3">
                        TOTAL ANGGARAN PROTOTIPE &amp; VALIDASI (GREEN CHAMPIONS 2026)
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-800">Rp 17.000.000</td>
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
