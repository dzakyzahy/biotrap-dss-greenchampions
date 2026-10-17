"use client";

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  ShieldCheck,
  TrendingUp,
  Leaf,
  ArrowRight,
  Cpu,
  BookOpen,
  Users,
  FileCode2,
  Sprout,
  CheckCircle2,
  Gauge,
  Sparkles,
  Award,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080d0b] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[140px]" />
      </div>

      {/* Top Navigation */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-emerald-500/15 bg-[#080d0b]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
            <div className="bg-white p-0.5 rounded-full flex items-center justify-center">
              <img src="/assets/Logo_ITB.png" alt="ITB Logo" className="h-6 w-auto object-contain" />
            </div>
            <div className="h-4 w-[1px] bg-slate-700" />
            <img src="/assets/GC.png" alt="Green Champions" className="h-6 w-auto object-contain" />
            <div className="h-4 w-[1px] bg-slate-700" />
            <img src="/assets/GDI.png" alt="Green Democracy Institute" className="h-6 w-auto object-contain" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block leading-none">
              BioTrap-SIM<span className="text-emerald-400">™ v2.6</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/90">
              TIM THINK3RS — ITB • GREEN CHAMPIONS 2026
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            Metodologi & Inovasi
          </Link>
          <Link href="/documentation" className="hover:text-emerald-400 transition-colors">
            Dokumentasi & Bisnis
          </Link>
          <Link href="/empowerment" className="hover:text-amber-400 transition-colors font-semibold text-amber-300 flex items-center gap-1">
            <Sprout className="w-4 h-4" /> Kalkulator KUD Sawit
          </Link>
          <Link href="/team" className="hover:text-emerald-400 transition-colors">
            Tim Think3rs
          </Link>
          <Link
            href="/simulation"
            className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-1.5"
          >
            Buka Simulasi DSS <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pt-12 pb-20 max-w-7xl mx-auto w-full">
        {/* Competition Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
          <Award className="w-4 h-4 text-amber-400" />
          <span>GREEN CHAMPIONS 2026 | GREEN DEMOCRACY INSTITUTE (GDI)</span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-300 font-mono">Kategori: Green Technology & Clean Energy</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12] text-center max-w-5xl">
          Waste-to-Resource Command Center:{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
            BioTrap-TKKS™ & BioSulfur™
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed text-center">
          Sistem Pendukung Keputusan (<strong className="text-emerald-300">BioTrap-SIM™ v2.6 DSS</strong>) berbasis{' '}
          <strong className="text-white">Response Surface Methodology (RSM-CCD)</strong> &{' '}
          <strong className="text-white">Transference Function Model (TFM)</strong> untuk menyelesaikan{' '}
          <em>Paradoks Limbah Ganda</em> Pabrik Kelapa Sawit (PKS): mengonversi limbah padat TKKS menjadi katalis{' '}
          <strong className="text-emerald-300">DIET In-Situ</strong> & adsorben desulfurisasi{' '}
          <strong className="text-amber-300">H₂S Lead-Lag Ex-Situ</strong> hingga menghasilkan pupuk sirkular{' '}
          <strong className="text-lime-300">BioSulfur™</strong>.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
          <Link
            href="/simulation"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center group"
          >
            <Cpu className="w-5 h-5 mr-2" />
            Jalankan BioTrap-SIM™ DSS
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/empowerment"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-base border border-amber-500/35 transition-all flex items-center justify-center"
          >
            <Sprout className="w-5 h-5 mr-2 text-amber-400" />
            Kalkulator KUD & BioSulfur™
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700 transition-all flex items-center justify-center"
          >
            <BookOpen className="w-5 h-5 mr-2 text-emerald-400" />
            Metodologi & Bukti Ilmiah
          </Link>
        </div>

        {/* Live Telemetry Benchmark Banner (Basis 1 PKS = 45 Ton TBS/Jam) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-slate-900/75 border border-emerald-500/25 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Yield Metana (RSM-CCD)</span>
              <Flame className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              338.2 <span className="text-sm font-normal text-slate-400">mL/g VS</span>
            </div>
            <p className="text-xs text-emerald-300/90 mt-1 font-medium">
              +16.5% vs Kontrol Tanpa Biochar • R² = 0.9850
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/75 border border-teal-500/25 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">Efikasi Scrubber H₂S</span>
              <ShieldCheck className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              96.4% <span className="text-sm font-normal text-slate-400">(90 ppm)</span>
            </div>
            <p className="text-xs text-teal-300/90 mt-1 font-medium">
              Aman &lt; 250 ppm (Batas Korosi Gas Engine)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/75 border border-amber-500/25 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Daya PLTBg & Valuasi</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              1.20 <span className="text-sm font-normal text-slate-400">MW • IRR 38.2%</span>
            </div>
            <p className="text-xs text-amber-300/90 mt-1 font-medium">
              NPV Rp18,74 Miliar • Payback 2,4 Tahun
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/75 border border-lime-500/25 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400">Dekarbonisasi & SDGs</span>
              <Leaf className="w-4 h-4 text-lime-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              42.500 <span className="text-sm font-normal text-slate-400">tCO₂e/thn</span>
            </div>
            <p className="text-xs text-lime-300/90 mt-1 font-medium">
              Target SOM 25 PKS • BioSulfur™ 19,2 Ton/thn/PKS
            </p>
          </div>
        </div>

        {/* Visual Architecture Showcase from Pitch Deck */}
        <div className="w-full mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Integrated Hardware, Catalyst & Digital Twin
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Ekosistem Sirkular 3-in-1 BioTrap-TKKS™ & BioSulfur™
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden border border-emerald-500/25 bg-slate-900/70 shadow-xl flex flex-col">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">ARSITEKTUR PRODUK INTEGRATIF</span>
                  <h3 className="text-base font-bold text-white">Pelet 5 mm + Modular Skid + BioTrap-SIM™ DSS</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  TRL 4–5 Validated
                </span>
              </div>
              <div className="relative bg-slate-950 p-2 flex-1 flex items-center justify-center">
                <img
                  src="/assets/slide_produk_hardware.png"
                  alt="Arsitektur Produk BioTrap-TKKS, Modular Skid, dan DSS"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-amber-500/25 bg-slate-900/70 shadow-xl flex flex-col">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-semibold">MEKANISME 3 TAHAP SIRKULAR</span>
                  <h3 className="text-base font-bold text-white">In-Situ DIET → Ex-Situ Lead-Lag H₂S → BioSulfur™</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Zero Secondary Waste
                </span>
              </div>
              <div className="relative bg-slate-950 p-2 flex-1 flex items-center justify-center">
                <img
                  src="/assets/fig_tiga_tahap.png"
                  alt="Mekanisme 3 Tahap BioTrap-TKKS dan BioSulfur"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Konduktor DIET In-Situ</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Pirolisis TKKS 950°C menciptakan matriks karbon grafitik (<span className="text-emerald-300 font-mono">S_BET 485 m²/g</span>) yang mempercepat transfer elektron antar-spesies (DIET), mengeliminasi fase lag (<span className="text-white font-mono">λ = -0,336 hari</span>), dan menurunkan risiko akumulasi VFA.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
              <span>Dosis Optimum: 2.0 g/L</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mb-4 text-teal-400">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Adsorben H₂S Ex-Situ</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Sistem kemisorpsi alkali-oksida logam (<span className="text-teal-300 font-mono">CaCO₃ 4,94%</span>) pada kolom kembar <em>Lead-Lag</em> memangkas H₂S dari 2.500 ppm menjadi <span className="text-white font-mono">90 ppm (96,4%)</span> dengan kapasitas <span className="text-teal-300 font-mono">64,2 mg H₂S/g</span> tanpa korosi genset.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-teal-400 font-mono">
              <span>Zero Plant Downtime</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Upcycling BioSulfur™</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Berbeda dari ferri oksida dan karbon batubara impor yang berakhir menjadi limbah B3, pelet jenuh sulfur (<span className="text-amber-300 font-mono">S⁰/SO₄²⁻</span>) langsung tervalidasi aman (<span className="text-white font-mono">TCLP & PAH &lt; LoD</span>) sebagai pupuk <em>slow-release</em> kebun sawit.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400 font-mono">
              <span>19,2 Ton/Tahun/PKS</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-lime-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center mb-4 text-lime-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Model Razor & Blade B2B</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Penjualan/sewa <em>Hardware Skid</em> (<span className="text-lime-300 font-mono">Rp185 Juta</span>) dikombinasikan dengan suplai berulang pelet BioTrap-TKKS™ (<span className="text-white font-mono">Rp12.000/kg</span>) yang menghemat <strong>65,7% OPEX</strong> dibanding karbon aktif batubara impor.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-lime-400 font-mono">
              <span>Hemat Rp362,5 Jt/PKS/Thn</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/about"
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300">Metodologi & Validasi Lab</h4>
                <p className="text-xs text-slate-400">RSM-CCD, Kinetika TFM, FE-SEM/EDX & TCLP</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/documentation"
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <FileCode2 className="w-6 h-6 text-amber-400" />
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300">Dokumentasi & Model Bisnis</h4>
                <p className="text-xs text-slate-400">Neraca Massa, Valuasi SOM 25 PKS & FMEA</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/team"
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <Users className="w-6 h-6 text-teal-400" />
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-teal-300">Profil TIM THINK3RS ITB</h4>
                <p className="text-xs text-slate-400">Kolaborasi FTTM & FITB ITB + Dosen Pembimbing</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 text-center text-slate-400 text-xs border-t border-emerald-500/15 bg-[#060a08]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-0.5 rounded-full">
              <img src="/assets/Logo_ITB.png" alt="ITB" className="h-5 w-auto" />
            </div>
            <img src="/assets/GC.png" alt="Green Champions" className="h-5 w-auto" />
            <img src="/assets/GDI.png" alt="Green Democracy Institute" className="h-5 w-auto" />
            <span className="font-semibold text-slate-300">
              TIM THINK3RS — Institut Teknologi Bandung
            </span>
          </div>
          <p className="text-slate-400">
            &copy; 2026 BioTrap-SIM™ v2.6 Decision Support System • Green Champions 2026 (Green Democracy Institute).
          </p>
        </div>
      </footer>
    </div>
  );
}
