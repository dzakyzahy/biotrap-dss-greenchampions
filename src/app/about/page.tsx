"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 space-y-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
        </Link>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-gray-200 pb-8">
          <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Metodologi Ilmiah &amp; Bukti Eksperimental (TRL 5)
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Rekayasa <span className="text-emerald-700">BioTrap-TKKS™</span> &amp; Siklus Tertutup{' '}
            <span className="text-amber-700">BioSulfur™</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl">
            Inovasi material karbon berpori <em>Dual-Role</em> berbasis pirolisis Tandan Kosong Kelapa Sawit (TKKS) pada suhu <strong>950°C</strong> yang diintegrasikan dengan <strong>BioTrap-SIM™ v2.6 DSS</strong> untuk mengoptimalkan produksi biomethane POME dan mengeliminasi korosi H₂S secara simultan.
          </p>
        </div>

        {/* Section 1: Paradoks Limbah Ganda PKS */}
        <section className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Urgensi &amp; Paradoks Limbah Ganda Pabrik Kelapa Sawit (PKS)
              </h2>
              <p className="text-xs text-gray-500">
                Karakterisasi beban fisikokimia POME mentah dan potensi limbah padat TKKS di Indonesia (850+ unit PKS)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                Industri kelapa sawit Indonesia menghadapi <strong>Paradoks Limbah Ganda</strong>: setiap 1 ton TBS menghasilkan sekitar <strong className="text-amber-700">0,67 m³ limbah cair POME</strong> dengan beban organik ekstrem (<strong>COD 98,77 g/L</strong>; <strong>TS 64,23 g/L</strong>; <strong>VS 51,71 g/L</strong>) sekaligus <strong className="text-emerald-700">22-23% limbah padat TKKS</strong> yang menumpuk.
              </p>
              <p>
                Di dalam biodigester anaerobik, tingginya beban organik memicu akumulasi <em>Volatile Fatty Acids</em> (VFA) yang menghambat metanogenesis (fase lag panjang) serta menghasilkan biogas kotor dengan kandungan <strong className="text-red-600">H₂S 1.500-3.500 ppm</strong> (jauh melampaui ambang batas korosi <em>Gas Engine</em> sebesar <strong>250 ppm</strong>).
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-xs text-gray-500 block">COD POME Mentah vs Baku Mutu</span>
                  <span className="text-base font-bold font-mono text-amber-700">98.770 vs 350 mg/L</span>
                  <span className="text-xs text-red-600 block font-medium">282x di atas batas buang</span>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-xs text-gray-500 block">Rasio VS/TS POME</span>
                  <span className="text-base font-bold font-mono text-emerald-700">0,81 (81% Volatil)</span>
                  <span className="text-xs text-emerald-700 block font-medium">Substrat ideal metanogenesis</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <img
                src="/assets/fig_paradoks_pks.png"
                alt="Paradoks Limbah Ganda PKS dan Karakterisasi POME"
                className="w-full h-auto rounded-lg object-contain"
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Gambar 1. Karakterisasi beban fisikokimia POME mentah dan krisis korosi H₂S pada fasilitas PLTBg PKS.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Mekanisme 3 Tahap BioTrap-TKKS & BioSulfur */}
        <section className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Mekanisme Sirkular 3 Tahap: In-Situ DIET, Ex-Situ H₂S Scrubbing &amp; BioSulfur™
              </h2>
              <p className="text-xs text-gray-500">
                Konversi TKKS via pirolisis 950°C menjadi matriks karbon grafitik mesopori bermuatan mineral alkali intrinsik
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <img
              src="/assets/fig_tiga_tahap.png"
              alt="Mekanisme 3 Tahap BioTrap-TKKS dan BioSulfur"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs leading-relaxed">
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="font-bold text-emerald-800 text-sm">
                Tahap 1: Konduktor DIET In-Situ
              </div>
              <p className="text-gray-600">
                Pada suhu pirolisis <strong>950°C</strong>, jaringan lignoselulosa TKKS mengalami karbonisasi lanjut membentuk kisi turbostratik grafitik (<code className="text-emerald-700 font-semibold">S_BET = 485 m²/g</code>) yang bertindak sebagai jembatan konduktif <strong>Direct Interspecies Electron Transfer (DIET)</strong> antara bakteri asidogenik dan arkea metanogenik.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="font-bold text-teal-800 text-sm">
                Tahap 2: Kemisorpsi H₂S Ex-Situ
              </div>
              <p className="text-gray-600">
                Mineral bawaan TKKS (<code className="text-teal-700 font-semibold">CaCO₃ 4,94%</code>, K, Mg, SiO₂) membentuk situs basa aktif di permukaan pori yang mengkatalisis oksidasi kemisorpsi H₂S menjadi sulfur elemental (<code className="text-amber-700 font-semibold">S⁰</code>) dan sulfat (<code className="text-amber-700 font-semibold">SO₄²⁻</code>) pada kolom kembar <em>Lead-Lag</em> dengan efikasi <strong>96,4%</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="font-bold text-amber-800 text-sm">
                Tahap 3: Hilirisasi Pupuk BioSulfur™
              </div>
              <p className="text-gray-600">
                Pelet jenuh sulfur yang dikeluarkan dari kolom scrubber memiliki rasio <strong>H/C = 0,15</strong> dan <strong>O/C = 0,04</strong> (stabilitas karbon ratusan tahun di tanah) serta bebas lindian logam berat/PAH, sehingga langsung bernilai jual sebagai pupuk <strong>BioSulfur™</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Persamaan Matematis RSM-CCD & Kinetika TFM */}
        <section className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Pemodelan Statistik RSM-CCD &amp; Kinetika Transference Function Model (TFM)
              </h2>
              <p className="text-xs text-gray-500">
                Fondasi komputasi yang tertanam langsung di dalam mesin simulasi BioTrap-SIM™ v2.6 DSS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase">
                1. Model Polinomial Orde Dua RSM-CCD (2FI)
              </span>
              <div className="p-3.5 rounded-lg bg-white border border-gray-200 font-mono text-xs text-emerald-800 font-semibold overflow-x-auto">
                Y(CH₄) = β₀ + β₁X₁ + β₂X₂ + β₁₂X₁X₂ + β₁₁X₁² + β₂₂X₂²
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Variabel X₁ (Dosis BioTrap-TKKS™):</strong> Optimum pada <code className="text-emerald-700 font-semibold">2,0 g/L</code> (rentang uji 0 - 10,0 g/L).
                </li>
                <li>
                  <strong>Variabel X₂ (Rasio Food-to-Inoculum F/I):</strong> Optimum pada <code className="text-emerald-700 font-semibold">0,266</code> (rentang uji 0,10 - 0,50).
                </li>
                <li>
                  <strong>Output Optimum:</strong> Yield metana spesifik <code className="text-gray-900 font-bold">338,2 mL CH₄/g VS</code> (+16,5% dibanding kontrol tanpa biochar 290,3 mL/g VS).
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <span className="text-xs font-mono text-amber-700 font-bold uppercase">
                2. Kinetika Transference Function Model (TFM)
              </span>
              <div className="p-3.5 rounded-lg bg-white border border-gray-200 font-mono text-xs text-amber-800 font-semibold overflow-x-auto">
                M(t) = P · [ 1 - exp( - (Rₘₐₓ · (t - λ)) / P ) ]
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Potensi Produksi Maksimum (P):</strong> <code className="text-amber-700 font-semibold">128,89 mL CH₄</code> (skala reaktor validasi).
                </li>
                <li>
                  <strong>Laju Produksi Maksimum (Rₘₐₓ):</strong> <code className="text-amber-700 font-semibold">13,62 mL CH₄/hari</code>.
                </li>
                <li>
                  <strong>Fase Lag Negatif (λ):</strong> <code className="text-emerald-700 font-bold">-0,3362 hari</code> dengan koefisien determinasi <code className="text-gray-900 font-bold">R² = 0,9850</code> (p-value &lt; 0,0001), membuktikan bio-katalis langsung memicu metanogenesis seketika di hari ke-0.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <img
              src="/assets/fig_validasi_sem_rsm_tfm.png"
              alt="Bukti Validasi FE-SEM EDX, 3D RSM Contour, dan Kurva Kinetika TFM"
              className="w-full h-auto rounded-lg object-contain"
            />
            <p className="text-xs text-gray-500 text-center mt-2">
              Gambar 2. Bukti karakterisasi mikrostruktur FE-SEM/EDX (pori sarang lebah &amp; CaCO₃ 4,94%), permukaan respons 3D RSM-CCD, dan kurva fitting kinetika TFM (R² = 0,9850).
            </p>
          </div>
        </section>

        {/* Section 4: Life Cycle Assessment (LCA) & 4 Pilar SDGs */}
        <section className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Life Cycle Assessment (LCA) Cradle-to-Cradle &amp; Kontribusi SDGs
              </h2>
              <p className="text-xs text-gray-500">
                Kuantifikasi dekarbonisasi 42.500 tCO₂e/tahun pada skala SOM 25 PKS (1.700 tCO₂e/tahun per PKS)
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <img
              src="/assets/fig_lca_sirkular.png"
              alt="Diagram Alir Sirkularitas LCA dan 4 Pilar SDGs"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-gray-500">
              Seluruh parameter metodologi di atas dapat diuji sensitivitasnya secara interaktif pada halaman simulasi.
            </p>
            <Link
              href="/simulation"
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              Uji Model di Simulator DSS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
