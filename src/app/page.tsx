"use client";

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header />

      {/* Hero Section: Full-width high-res plant background + Green Champions Animated Snaking Ribbon on the right */}
      <section className="relative w-full min-h-[84vh] flex items-end justify-end overflow-hidden bg-white border-b border-gray-200">
        {/* Crisp High-Res Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-left lg:bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/hero_biotrap_plant.jpg')",
          }}
        />
        {/* Smooth Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/75 to-white/95 lg:from-transparent lg:via-white/80 lg:to-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-85" />

        {/* Green Champions 2026 Signature Animated Multi-Color Snaking Ribbon (Right / Top-Right / Bottom-Right) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[65%] overflow-hidden z-[5] gc-snake-container"
        >
          <svg
            viewBox="0 0 900 760"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover opacity-90"
            preserveAspectRatio="xMaxYMid slice"
          >
            <defs>
              {/* Animated Green Champions Multi-Color Gradient (Royal Blue -> Gold Yellow -> Mint Aqua -> Emerald) */}
              <linearGradient id="gcRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8">
                  <animate
                    attributeName="stop-color"
                    values="#1d4ed8;#eab308;#14b8a6;#1d4ed8"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="32%" stopColor="#facc15">
                  <animate
                    attributeName="stop-color"
                    values="#facc15;#a7f3d0;#2563eb;#facc15"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="68%" stopColor="#5eead4">
                  <animate
                    attributeName="stop-color"
                    values="#5eead4;#10b981;#facc15;#5eead4"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#059669">
                  <animate
                    attributeName="stop-color"
                    values="#059669;#1d4ed8;#10b981;#059669"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>

              <linearGradient id="gcRibbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb">
                  <animate
                    attributeName="stop-color"
                    values="#2563eb;#10b981;#facc15;#2563eb"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#fde047">
                  <animate
                    attributeName="stop-color"
                    values="#fde047;#2dd4bf;#1d4ed8;#fde047"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#14b8a6">
                  <animate
                    attributeName="stop-color"
                    values="#14b8a6;#eab308;#059669;#14b8a6"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>

              {/* Soft 3D Tube Shadow */}
              <filter id="gcTubeShadow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#0f172a" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* Background Soft S-Curve Track */}
            <path
              d="M 460 -40 C 690 20, 860 110, 820 250 C 780 390, 560 340, 620 490 C 680 640, 880 590, 830 790"
              stroke="url(#gcRibbonGrad2)"
              strokeWidth="74"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.22"
            />

            {/* Primary Animated Snaking 3D Ribbon (Weaving along top-right & far-right edge) */}
            <path
              d="M 460 -40 C 690 20, 860 110, 820 250 C 780 390, 560 340, 620 490 C 680 640, 880 590, 830 790"
              stroke="url(#gcRibbonGrad1)"
              strokeWidth="74"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#gcTubeShadow)"
              className="gc-snake-ribbon"
            />

            {/* Secondary Intertwined Snaking Ribbon */}
            <path
              d="M 740 -60 C 910 80, 730 220, 840 360 C 930 480, 760 620, 890 770"
              stroke="url(#gcRibbonGrad2)"
              strokeWidth="52"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#gcTubeShadow)"
              opacity="0.85"
              className="gc-snake-ribbon-secondary"
            />
          </svg>
        </div>

        {/* Right-Aligned, Lower-Positioned Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-14 lg:pt-40 lg:pb-20 flex flex-col items-end text-right lg:pr-28">
          <div className="max-w-2xl flex flex-col items-end space-y-5 rounded-3xl bg-white/80 backdrop-blur-md p-6 sm:p-8 border border-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
            <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wide">
              GREEN CHAMPIONS 2026 | GREEN DEMOCRACY INSTITUTE (GDI)
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.08]">
              BioTrap-TKKS™ &amp;{' '}
              <span className="text-emerald-700">BioSulfur™</span> Decision Support System
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              Platform simulasi rekayasa proses dan evaluasi tekno-ekonomi berbasis{' '}
              <strong className="text-gray-900">Response Surface Methodology (RSM-CCD)</strong> dan{' '}
              <strong className="text-gray-900">Transference Function Model (TFM)</strong> untuk mengonversi limbah padat TKKS menjadi katalis{' '}
              <strong className="text-emerald-800">DIET In-Situ</strong>, adsorben desulfurisasi{' '}
              <strong className="text-emerald-800">H₂S Lead-Lag Ex-Situ</strong>, serta pupuk sirkular{' '}
              <strong className="text-amber-700">BioSulfur™</strong>.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="w-full max-w-lg pt-2 flex flex-col items-end gap-3">
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/simulation"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 py-4 px-5 text-base font-bold text-white shadow-md transition-all"
                >
                  Mulai Simulasi DSS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/empowerment"
                  className="flex w-full items-center justify-center rounded-xl border-2 border-emerald-700 bg-white hover:bg-emerald-50 py-4 px-5 text-base font-bold text-emerald-800 shadow-sm transition-all"
                >
                  Kalkulator KUD Sawit
                </Link>
              </div>

              <div className="grid w-full grid-cols-3 gap-2.5">
                <Link
                  href="/about"
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100 py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-700 transition-colors"
                >
                  Metodologi
                </Link>
                <Link
                  href="/documentation"
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100 py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-700 transition-colors"
                >
                  Dokumentasi
                </Link>
                <Link
                  href="/team"
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100 py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-700 transition-colors"
                >
                  Pengembang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 space-y-16">
        {/* Benchmark KPI Strip (Basis 1 PKS = 45 Ton TBS/Jam) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
              Yield Metana (RSM-CCD)
            </span>
            <div className="text-3xl font-extrabold font-mono text-gray-900">
              338.2 <span className="text-sm font-normal text-gray-500">mL/g VS</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 font-medium">
              +16.5% vs Kontrol Tanpa Biochar • R² = 0.9850
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-2">
              Efikasi Scrubber H₂S
            </span>
            <div className="text-3xl font-extrabold font-mono text-gray-900">
              96.4% <span className="text-sm font-normal text-gray-500">(90 ppm)</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 font-medium">
              Aman di bawah 250 ppm (Batas Korosi Gas Engine)
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-2">
              Daya PLTBg &amp; Valuasi
            </span>
            <div className="text-3xl font-extrabold font-mono text-gray-900">
              1.20 <span className="text-sm font-normal text-gray-500">MW • IRR 38.2%</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 font-medium">
              NPV Rp18,74 Miliar • Payback 2,4 Tahun
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
              Dekarbonisasi &amp; SDGs
            </span>
            <div className="text-3xl font-extrabold font-mono text-gray-900">
              42.500 <span className="text-sm font-normal text-gray-500">tCO₂e/thn</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 font-medium">
              Target SOM 25 PKS • BioSulfur™ 19,2 Ton/thn/PKS
            </p>
          </div>
        </section>

        {/* Visual Architecture Showcase */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">
              Arsitektur Hardware, Katalis &amp; Digital Twin
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Ekosistem Sirkular 3-in-1 BioTrap-TKKS™ &amp; BioSulfur™
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-700 font-bold">ARSITEKTUR PRODUK INTEGRATIF</span>
                  <h4 className="text-base font-bold text-gray-900">Pelet 5 mm + Modular Skid + BioTrap-SIM™ DSS</h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  TRL 5 Validated
                </span>
              </div>
              <div className="p-4 flex-1 flex items-center justify-center bg-gray-50">
                <img
                  src="/assets/slide_produk_hardware.png"
                  alt="Arsitektur Produk BioTrap-TKKS, Modular Skid, dan DSS"
                  className="w-full h-auto rounded-lg object-contain border border-gray-200"
                />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-700 font-bold">MEKANISME 3 TAHAP SIRKULAR</span>
                  <h4 className="text-base font-bold text-gray-900">In-Situ DIET, Ex-Situ Lead-Lag H₂S &amp; BioSulfur™</h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  Zero Secondary Waste
                </span>
              </div>
              <div className="p-4 flex-1 flex items-center justify-center bg-gray-50">
                <img
                  src="/assets/fig_tiga_tahap.png"
                  alt="Mekanisme 3 Tahap BioTrap-TKKS dan BioSulfur"
                  className="w-full h-auto rounded-lg object-contain border border-gray-200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 block mb-2">TAHAP 01</span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Konduktor DIET In-Situ</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pirolisis TKKS 950°C menciptakan matriks karbon grafitik (<span className="text-emerald-700 font-mono font-semibold">S_BET 485 m²/g</span>) yang mempercepat transfer elektron antar-spesies (DIET), mengeliminasi fase lag (<span className="text-gray-900 font-mono font-semibold">λ = -0,336 hari</span>), dan menurunkan risiko akumulasi VFA.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-emerald-700 font-mono font-semibold">
              Dosis Optimum: 2.0 g/L
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-teal-700 block mb-2">TAHAP 02</span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Adsorben H₂S Ex-Situ</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sistem kemisorpsi alkali-oksida logam (<span className="text-teal-700 font-mono font-semibold">CaCO₃ 4,94%</span>) pada kolom kembar <em>Lead-Lag</em> memangkas H₂S dari 2.500 ppm menjadi <span className="text-gray-900 font-mono font-semibold">90 ppm (96,4%)</span> dengan kapasitas <span className="text-teal-700 font-mono font-semibold">64,2 mg H₂S/g</span> tanpa korosi genset.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-teal-700 font-mono font-semibold">
              Zero Plant Downtime
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-700 block mb-2">TAHAP 03</span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Upcycling BioSulfur™</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Berbeda dari ferri oksida dan karbon batubara impor yang berakhir menjadi limbah B3, pelet jenuh sulfur (<span className="text-amber-700 font-mono font-semibold">S⁰/SO₄²⁻</span>) langsung tervalidasi aman (<span className="text-gray-900 font-mono font-semibold">TCLP &amp; PAH &lt; LoD</span>) sebagai pupuk <em>slow-release</em> kebun sawit.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-amber-700 font-mono font-semibold">
              Output: 19,2 Ton/Tahun/PKS
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 block mb-2">MODEL BISNIS</span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Skema Razor &amp; Blade B2B</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Penjualan atau sewa <em>Hardware Skid</em> (<span className="text-emerald-800 font-mono font-semibold">Rp185 Juta</span>) dikombinasikan dengan suplai berulang pelet BioTrap-TKKS™ (<span className="text-gray-900 font-mono font-semibold">Rp12.000/kg</span>) yang menghemat <strong>65,7% OPEX</strong> dibanding karbon aktif batubara impor.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-emerald-800 font-mono font-semibold">
              Hemat Rp362,5 Jt/PKS/Thn
            </div>
          </div>
        </section>
      </main>

      {/* Clean White Footer */}
      <footer className="py-8 px-6 text-gray-600 text-xs border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img src="/assets/Logo_ITB.png" alt="ITB" className="h-8 w-auto object-contain" />
            <img src="/assets/GC.png" alt="Green Champions" className="h-7 w-auto object-contain" />
            <img src="/assets/GDI.png" alt="Green Democracy Institute" className="h-7 w-auto object-contain" />
            <span className="font-bold text-gray-800">
              TIM THINK3RS - Institut Teknologi Bandung
            </span>
          </div>
          <p className="text-gray-500">
            &copy; 2026 BioTrap-SIM™ v2.6 Decision Support System • Green Champions 2026 (Green Democracy Institute).
          </p>
        </div>
      </footer>
    </div>
  );
}
