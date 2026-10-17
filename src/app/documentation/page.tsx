"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import {
  FileCode2,
  Cpu,
  Scale,
  TrendingUp,
  ShieldAlert,
  BookOpenCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-[#080d0b] text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 space-y-12">
        {/* Page Header */}
        <div className="space-y-4 border-b border-emerald-500/20 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <FileCode2 className="w-3.5 h-3.5 mr-1.5" />
            Dokumentasi Teknis, Neraca Massa & Valuasi Bisnis B2B
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Arsitektur Komputasi <span className="text-emerald-400">BioTrap-SIM™ v2.6</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Dokumentasi lengkap mesin perhitungan stokastik-deterministik, neraca massa & energi harian (Basis 1 PKS = 45 Ton TBS/jam), matriks komparasi kompetitor, valuasi finansial <em>Razor & Blade</em>, serta mitigasi risiko FMEA.
          </p>
        </div>

        {/* Section 1: Arsitektur Komputasi 4 Mesin */}
        <section className="space-y-6 bg-slate-900/75 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center space-x-3">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                1. Arsitektur 4 Mesin Komputasi BioTrap-SIM™ DSS
              </h2>
              <p className="text-xs text-slate-400">
                Integrasi model kinetika bioproses, termodinamika adsorpsi, dan finansial di dalam satu antarmuka
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20">
            <img
              src="/assets/fig_arsitektur_komputasi.png"
              alt="Arsitektur Komputasi BioTrap-SIM v2.6 DSS"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-mono font-bold">ENGINE 01 — RSM-CCD 2FI Optimizer</span>
              <p className="text-slate-300">
                Menghitung respons permukaan hasil spesifik CH₄ (<code className="text-emerald-300">mL/g VS</code>) sebagai fungsi kuadratik dari dosis BioTrap-TKKS™ (<code className="text-white">X₁</code>) dan rasio F/I (<code className="text-white">X₂</code>) serta memberikan peringatan dini <em>VFA Acidosis</em> maupun <em>Over-dosing Viscosity</em>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
              <span className="text-teal-400 font-mono font-bold">ENGINE 02 — TFM Lag-Time & Kinetics</span>
              <p className="text-slate-300">
                Memproyeksikan kurva akumulasi biomethane harian <code className="text-teal-300">M(t)</code> selama 30 hari dengan parameter <code className="text-white">λ = -0,3362 hari</code> dan <code className="text-white">R² = 0,9850</code> dibanding kontrol tanpa katalis (<code className="text-slate-400">λ = +2,85 hari</code>).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-mono font-bold">ENGINE 03 — Lead-Lag H₂S Breakthrough Telemetry</span>
              <p className="text-slate-300">
                Menghitung laju kejenuhan bed adsorben (<code className="text-amber-300">64,2 mg H₂S/g</code> pada 950°C), memantau konsentrasi H₂S outlet (<code className="text-white">90 ppm</code>), dan mengotomasi simulasi pergantian katup <em>Column A ↔ Column B</em> tanpa menghentikan operasi genset.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
              <span className="text-lime-400 font-mono font-bold">ENGINE 04 — Razor & Blade Techno-Economics & LCA</span>
              <p className="text-slate-300">
                Mengkalkulasi neraca massa harian/tahunan, daya listrik PLTBg (<code className="text-lime-300">1,20 MW</code>), penghematan OPEX adsorben, arus kas 5 tahun (NPV, IRR, Payback), dan reduksi emisi GRK.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Diagram Alir Neraca Massa & Energi */}
        <section className="space-y-6 bg-slate-900/75 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center space-x-3">
            <Scale className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                2. Diagram Alir Neraca Massa & Energi (Basis 1 PKS = 45 Ton TBS/Jam)
              </h2>
              <p className="text-xs text-slate-400">
                Kuantifikasi penuh aliran masuk POME & TKKS hingga output listrik 1,20 MW dan pupuk BioSulfur™ 19,2 Ton/tahun
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20">
            <img
              src="/assets/fig_diagram_neraca_massa.png"
              alt="Diagram Alir Neraca Massa dan Energi Harian PKS"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </section>

        {/* Section 3: Matriks Komparasi Head-to-Head & Model Bisnis */}
        <section className="space-y-6 bg-slate-900/75 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-teal-400" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                3. Komparasi Kompetitor, Model Bisnis Razor & Blade, dan Valuasi Finansial
              </h2>
              <p className="text-xs text-slate-400">
                Keunggulan biaya OPEX 65,7% lebih hemat dibanding karbon aktif batubara impor serta proyeksi SOM 25 PKS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <img
                src="/assets/slide_komparasi_usp.png"
                alt="Komparasi Head-to-Head BioTrap-TKKS vs Kompetitor"
                className="w-full h-auto rounded-lg object-contain"
              />
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <img
                src="/assets/slide_keuangan_som.png"
                alt="Valuasi Tekno-Ekonomi dan Proyeksi Keuangan 5 Tahun"
                className="w-full h-auto rounded-lg object-contain"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Roadmap Eksekusi & Mitigasi Risiko FMEA */}
        <section className="space-y-6 bg-slate-900/75 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                4. Peta Jalan Implementasi (2026–2030) & Mitigasi Risiko Operasional (FMEA)
              </h2>
              <p className="text-xs text-slate-400">
                Strategi ekspansi dari klaster Sumatra menuju 200 PKS Nasional dan protokol keselamatan proses
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <img
              src="/assets/slide_roadmap_fmea.png"
              alt="Roadmap Implementasi 2026-2030 dan Matriks FMEA"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </section>

        {/* Section 5: Referensi Ilmiah Utama (2025) */}
        <section className="space-y-4 bg-slate-900/75 p-6 md:p-8 rounded-2xl border border-emerald-500/25 shadow-lg">
          <div className="flex items-center space-x-3">
            <BookOpenCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg md:text-xl font-bold text-white">
              5. Referensi Ilmiah Primer (Peer-Reviewed 2025)
            </h2>
          </div>

          <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
            <li className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <strong>Yan, M., et al. (2025).</strong>{' '}
              <em>
                Enhancement of Anaerobic Digestion of Palm Oil Mill Effluent Using Oil Palm Empty Fruit Bunch Biochar via Direct Interspecies Electron Transfer (DIET): RSM-CCD Optimization and TFM Kinetic Modeling.
              </em>{' '}
              Bioresource Technology / Renewable Energy Journal.
            </li>
            <li className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <strong>Angel, P., et al. (2025).</strong>{' '}
              <em>
                High-Temperature Steam-Activated Biochar (950°C) Derived from Lignocellulosic Palm Waste for Selective Chemisorption of Hydrogen Sulfide (H₂S) in Biogas Streams.
              </em>{' '}
              Chemical Engineering Journal / Fuel Processing Technology.
            </li>
            <li className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <strong>Kavand, M., &amp; Kazemian, H. (2025).</strong>{' '}
              <em>
                Valorization of Sulfur-Saturated Biochar Adsorbents as Slow-Release BioSulfur Fertilizer Amendments: Soil Leaching (TCLP), PAH Safety, and Circular Agronomy.
              </em>{' '}
              Journal of Cleaner Production / Environmental Science &amp; Technology.
            </li>
          </ol>

          <div className="pt-2 flex justify-end">
            <Link
              href="/simulation"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all"
            >
              Kembali ke Simulator BioTrap-SIM™ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
