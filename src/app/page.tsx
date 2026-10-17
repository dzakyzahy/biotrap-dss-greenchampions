"use client";

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header />

      {/* HERO SECTION:
          Layer 1 (z-0): Plant Background Image + White Right-Side Fade
          Layer 2 (z-10): Animated Colorful Snaking Ribbons (Right Text Area + Left/Upper Plant Area)
          Layer 3 (z-20): Invisible Compartment with Larger Title & Description + Thin Black Text Outline
      */}
      <section className="relative isolate w-full min-h-[85vh] flex items-end justify-end overflow-hidden bg-white border-b border-gray-200">
        {/* LAYER 1 (BOTTOM): Crisp High-Res Plant Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-left lg:bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/hero_biotrap_plant.jpg')",
          }}
        />
        {/* Smooth Editorial Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/85 to-white lg:from-transparent lg:via-white/90 lg:to-white" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />

        {/* LAYER 2 (MIDDLE): Green Champions 2026 Full-Canvas Snaking Ribbons */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 w-full h-full overflow-hidden"
        >
          <svg
            viewBox="0 0 1600 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Gradient 1: Royal Blue -> Gold -> Teal -> Deep Emerald */}
              <linearGradient id="gcRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8">
                  <animate
                    attributeName="stop-color"
                    values="#1d4ed8;#047857;#eab308;#1d4ed8"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="35%" stopColor="#eab308">
                  <animate
                    attributeName="stop-color"
                    values="#eab308;#1d4ed8;#0d9488;#eab308"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="70%" stopColor="#0d9488">
                  <animate
                    attributeName="stop-color"
                    values="#0d9488;#eab308;#1d4ed8;#0d9488"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#047857">
                  <animate
                    attributeName="stop-color"
                    values="#047857;#0d9488;#047857;#047857"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>

              {/* Gradient 2: Deep Emerald -> Gold -> Royal Blue -> Teal */}
              <linearGradient id="gcRibbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#047857">
                  <animate
                    attributeName="stop-color"
                    values="#047857;#2563eb;#d97706;#047857"
                    dur="9s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="45%" stopColor="#f59e0b">
                  <animate
                    attributeName="stop-color"
                    values="#f59e0b;#0d9488;#1d4ed8;#f59e0b"
                    dur="9s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#1d4ed8">
                  <animate
                    attributeName="stop-color"
                    values="#1d4ed8;#eab308;#047857;#1d4ed8"
                    dur="9s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>

            {/* Subtle Full Track Guide 1 (Upper-Left Plant -> Right Text Zone) */}
            <path
              d="M -80 180 C 220 -30, 480 340, 820 170 C 1140 10, 1010 520, 1340 470 C 1560 440, 1410 770, 1680 860"
              stroke="url(#gcRibbonGrad1)"
              strokeWidth="68"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.14"
            />

            {/* Subtle Full Track Guide 2 (Top-Right -> Behind Text -> Left Over Plant Dome) */}
            <path
              d="M 1520 -60 C 1220 120, 1520 350, 1140 430 C 780 510, 620 250, 310 470 C 110 610, 220 820, -80 870"
              stroke="url(#gcRibbonGrad2)"
              strokeWidth="62"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.14"
            />

            {/* Animated Ribbon 1: Sweeps from Upper-Left Plant Towers across Center into Right-Bottom Text Area */}
            <path
              d="M -80 180 C 220 -30, 480 340, 820 170 C 1140 10, 1010 520, 1340 470 C 1560 440, 1410 770, 1680 860"
              stroke="url(#gcRibbonGrad1)"
              strokeWidth="68"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gc-snake-ribbon-main"
            />

            {/* Animated Ribbon 2: Snakes from Top-Right down through the Hero Text and left across the Plant Dome */}
            <path
              d="M 1520 -60 C 1220 120, 1520 350, 1140 430 C 780 510, 620 250, 310 470 C 110 610, 220 820, -80 870"
              stroke="url(#gcRibbonGrad2)"
              strokeWidth="62"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gc-snake-ribbon-cross"
            />
          </svg>
        </div>

        {/* LAYER 3 (TOP): Invisible Compartment Positioned Bottom-Right & Wider to the Left */}
        <div className="relative z-20 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-14 pt-36 pb-8 lg:pt-44 lg:pb-12 flex flex-col items-end text-right">
          {/* Invisible bounding wrapper */}
          <div className="w-full max-w-4xl flex flex-col items-end space-y-6">
            {/* Competition Pill Badge (Unchanged size) */}
            <span className="inline-block rounded-full bg-emerald-50/95 border border-emerald-300 px-4 py-1.5 text-xs sm:text-sm font-bold text-emerald-900 tracking-wide">
              GREEN CHAMPIONS 2026 | GREEN DEMOCRACY INSTITUTE (GDI)
            </span>

            {/* Enlarged Title with Thin Black Outline */}
            <h2
              className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-gray-900 leading-[1.06]"
              style={{
                paintOrder: 'stroke fill',
                WebkitTextStroke: '1.5px #000000',
                textShadow: '0 2px 12px rgba(255, 255, 255, 0.85)',
              }}
            >
              BioTrap-TKKS™ &amp;{' '}
              <span
                className="text-emerald-600"
                style={{
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '1.8px #000000',
                }}
              >
                BioSulfur™
              </span>{' '}
              Decision Support System
            </h2>

            {/* Enlarged Description with Thin Black Outline */}
            <p
              className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-semibold leading-relaxed max-w-3xl"
              style={{
                paintOrder: 'stroke fill',
                WebkitTextStroke: '0.65px #000000',
                textShadow: '0 1px 10px rgba(255, 255, 255, 0.9)',
              }}
            >
              Platform simulasi rekayasa proses dan evaluasi tekno-ekonomi berbasis{' '}
              <strong className="text-gray-950 font-extrabold">Response Surface Methodology (RSM-CCD)</strong> dan{' '}
              <strong className="text-gray-950 font-extrabold">Transference Function Model (TFM)</strong> untuk mengonversi limbah padat TKKS menjadi katalis{' '}
              <strong
                className="text-emerald-600 font-extrabold"
                style={{
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '0.9px #000000',
                }}
              >
                DIET In-Situ
              </strong>
              , adsorben desulfurisasi{' '}
              <strong
                className="text-emerald-600 font-extrabold"
                style={{
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '0.9px #000000',
                }}
              >
                H₂S Lead-Lag Ex-Situ
              </strong>
              , serta pupuk sirkular{' '}
              <strong
                className="text-amber-500 font-extrabold"
                style={{
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '0.9px #000000',
                }}
              >
                BioSulfur™
              </strong>
              .
            </p>

            {/* Primary & Secondary Action Buttons (Unchanged size and no text outline) */}
            <div className="relative z-30 w-full max-w-xl pt-2 flex flex-col items-end gap-3">
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
                  className="flex w-full items-center justify-center rounded-xl border-2 border-emerald-700 bg-white/95 hover:bg-emerald-50 py-4 px-5 text-base font-bold text-emerald-800 shadow-sm transition-all"
                >
                  Kalkulator KUD Sawit
                </Link>
              </div>

              <div className="grid w-full grid-cols-3 gap-2.5">
                <Link
                  href="/about"
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white/95 hover:bg-gray-100 py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-800 transition-colors"
                >
                  Metodologi
                </Link>
                <Link
                  href="/documentation"
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white/95 hover:bg-gray-100 py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-800 transition-colors"
                >
                  Dokumentasi
                </Link>
                <Link
                  href="/team"
                  className="flex items-center justify-center rounded-lg border border-gray-300 bg-white/95 hover:bg-gray-100 py-2.5 px-3 text-xs sm:text-sm font-semibold text-gray-800 transition-colors"
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
