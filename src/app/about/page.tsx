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

          <div className="space-y-6">
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                Industri kelapa sawit Indonesia menghadapi <strong>Paradoks Limbah Ganda</strong>: setiap 1 ton TBS menghasilkan sekitar <strong className="text-amber-700">0,67 m³ limbah cair POME</strong> dengan beban organik ekstrem (<strong>COD 98,77 g/L</strong>; <strong>TS 64,23 g/L</strong>; <strong>VS 51,71 g/L</strong>) sekaligus <strong className="text-emerald-700">22-23% limbah padat TKKS</strong> yang menumpuk.
              </p>
              <p>
                Di dalam biodigester anaerobik, tingginya beban organik memicu akumulasi <em>Volatile Fatty Acids</em> (VFA) yang menghambat metanogenesis (fase lag panjang) serta menghasilkan biogas kotor dengan kandungan <strong className="text-red-600">H₂S 1.500-3.500 ppm</strong> (jauh melampaui ambang batas korosi <em>Gas Engine</em> sebesar <strong>250 ppm</strong>).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-xs text-gray-500 block">COD POME Mentah vs Baku Mutu</span>
                  <span className="text-base font-bold font-mono text-amber-700">98.770 vs 350 mg/L</span>
                  <span className="text-xs text-red-600 block font-medium">282x di atas batas buang</span>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-xs text-gray-500 block">Rasio VS/TS POME &amp; Penyisihan VS</span>
                  <span className="text-base font-bold font-mono text-emerald-700">0,81 (95,1% VS Removal)</span>
                  <span className="text-xs text-emerald-700 block font-medium">Substrat ideal metanogenesis terfasilitasi DIET</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <img
                src="/assets/jurnal_fig1_pome_vfa.png"
                alt="Profil Akumulasi VFA, Penyangga pH, dan Efisiensi Penyisihan VS/COD POME"
                className="w-full h-auto rounded-lg object-contain"
              />
              <p className="text-xs text-gray-500 italic text-center mt-3 max-w-4xl mx-auto">
                Gambar 3.1 Profil akumulasi VFA dan kapasitas penyangga pH intrinsik pada digesti anaerobik POME (a), serta efisiensi penyisihan VS/COD dan kemurnian CH₄ terhadap variasi dosis biochar TKKS (b) (Dimodifikasi dari Yan dkk., 2025).
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
                Karakterisasi Fisikokimia Material: FE-SEM, EDX, Isoterm BET &amp; Konduktivitas DIET
              </h2>
              <p className="text-xs text-gray-500">
                Konversi TKKS via aktivasi uap satu tahap (950°C) menjadi matriks karbon grafitik mesopori bermuatan mineral alkali intrinsik
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <img
              src="/assets/jurnal_fig2_fesem_bet_xrd.png"
              alt="Karakterisasi FE-SEM, Spektrum EDX, Isoterm N2 BET, dan Konduktivitas DIET BioTrap-TKKS"
              className="w-full h-auto rounded-lg object-contain"
            />
            <p className="text-xs text-gray-500 italic text-center mt-3 max-w-4xl mx-auto">
              Gambar 3.2 Karakterisasi material BioTrap-TKKS™: (a) mikrograf FE-SEM struktur makropori sarang lebah (5-8 μm) dan kolonisasi biofilm konsorsium metanogen, (b) spektrum unsur EDX kaya mineral alkali (CaCO₃ 4,94%), (c) isoterm adsorpsi-desorpsi N₂ BET (Tipe IV, S_BET = 1.105 m²/g pada 950°C), serta (d) evolusi konduktivitas listrik DIET dan kapasitas kemisorpsi H₂S (Yan dkk., 2025; Angel dkk., 2025).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs leading-relaxed">
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="font-bold text-emerald-800 text-sm">
                Tahap 1: Konduktor DIET In-Situ
              </div>
              <p className="text-gray-600">
                Pada suhu pirolisis <strong>750-950°C</strong>, jaringan lignoselulosa TKKS mengalami karbonisasi lanjut membentuk kisi turbostratik grafitik (<code className="text-emerald-700 font-semibold">S_BET = 485-1.105 m²/g</code>) yang bertindak sebagai jembatan konduktif <strong>Direct Interspecies Electron Transfer (DIET)</strong> antara bakteri asidogenik dan arkea metanogenik.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="font-bold text-teal-800 text-sm">
                Tahap 2: Kemisorpsi H₂S Ex-Situ
              </div>
              <p className="text-gray-600">
                Mineral bawaan TKKS (<code className="text-teal-700 font-semibold">CaCO₃ 4,94%</code>, K, Mg, SiO₂; <code className="text-teal-700 font-semibold">pH_pzc = 10,9</code>) membentuk situs basa aktif di permukaan pori yang mengkatalisis oksidasi kemisorpsi H₂S menjadi sulfur elemental (<code className="text-amber-700 font-semibold">S⁰</code>) dan sulfat (<code className="text-amber-700 font-semibold">SO₄²⁻</code>) dengan kapasitas <strong>64,2 mg H₂S/g</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="font-bold text-amber-800 text-sm">
                Tahap 3: Hilirisasi Pupuk BioSulfur™
              </div>
              <p className="text-gray-600">
                Pelet jenuh sulfur yang dikeluarkan dari kolom scrubber memiliki matriks karbon sangat stabil (<strong>C = 92,33%</strong>) serta bebas lindian logam berat/PAH, sehingga langsung bernilai jual sebagai pembenah tanah dan pupuk lepas lambat <strong>BioSulfur™</strong>.
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
                  <strong>Variabel X₁ (Dosis BioTrap-TKKS™):</strong> Optimum pada <code className="text-emerald-700 font-semibold">2,0 g/L</code> (rentang uji 0 - 4,0 g/L).
                </li>
                <li>
                  <strong>Variabel X₂ (Rasio Food-to-Inoculum F/I):</strong> Optimum pada <code className="text-emerald-700 font-semibold">0,266</code> (rentang uji 0,10 - 0,50).
                </li>
                <li>
                  <strong>Output Optimum (Desirability 0,940):</strong> Yield metana spesifik <code className="text-gray-900 font-bold">0,355 L CH₄/g VS</code> (+73,3% dibanding kontrol tanpa biochar 0,205 L/g VS; deviasi model &lt; 1,41%).
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
                  <strong>Potensi Produksi Maksimum (P):</strong> <code className="text-amber-700 font-semibold">0,355 L CH₄/g VS</code> (setara 2.950 mL biogas pada reaktor validasi, +45,0%).
                </li>
                <li>
                  <strong>Galat Pemodelan (RMSE):</strong> <code className="text-amber-700 font-semibold">0,0827</code> (presisi tinggi terhadap kurva aktual 30 hari).
                </li>
                <li>
                  <strong>Fase Lag Negatif (λ):</strong> <code className="text-emerald-700 font-bold">-0,3362 hari</code> dengan koefisien determinasi <code className="text-gray-900 font-bold">R² = 0,9850</code> (p-value &lt; 0,0001), membuktikan bio-katalis mengeliminasi total fase tunda metanogenesis.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <img
              src="/assets/jurnal_fig3_rsm_tfm.png"
              alt="Permukaan Respons 3D RSM-CCD, Peta Kontur 2D, dan Kurva Kinetika TFM"
              className="w-full h-auto rounded-lg object-contain"
            />
            <p className="text-xs text-gray-500 italic text-center mt-3 max-w-4xl mx-auto">
              Gambar 3.3 Optimasi statistik dan kinetika bioproses: (a) permukaan respons 3D RSM-CCD hasil spesifik metana (p &lt; 0,0001; Desirability = 0,940), (b) peta kontur 2D dan matriks titik desain CCD (deviasi &lt; 1,41%), serta (c) kurva fitting kinetika Transference Function Model (TFM) terhadap data eksperimental (R² = 0,9850; RMSE = 0,0827; λ = -0,3362 hari) (Yan dkk., 2025).
            </p>
          </div>
        </section>

        {/* Section 4: Validasi Purifikasi H2S, Slow-Release BioSulfur & Uji TCLP */}
        <section className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
              04
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Dinamika Breakthrough H₂S, Pelepasan Hara Lambat &amp; Keamanan Pelindihan TCLP
              </h2>
              <p className="text-xs text-gray-500">
                Validasi kolom adsorber Lead-Lag, retensi air tanah +58,9% (KTK &gt; 56 meq/100g), dan kepatuhan 100% Non-B3 (PP No. 22/2021)
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <img
              src="/assets/jurnal_fig4_h2s_tclp_biosulfur.png"
              alt="Kurva Breakthrough H2S, Kinetika Slow-Release BioSulfur, dan Uji Pelindihan TCLP"
              className="w-full h-auto rounded-lg object-contain"
            />
            <p className="text-xs text-gray-500 italic text-center mt-3 max-w-4xl mx-auto">
              Gambar 3.4 Validasi purifikasi hilir dan keamanan lingkungan: (a) kurva breakthrough adsorpsi dinamis H₂S pada kolom tetap (C_in = 3.200 ppm; q_e = 64,2 mg/g), (b) kinetika pelepasan lambat (slow-release) sulfat (SO₄²⁻) pupuk BioSulfur™ di tanah Ultisol, serta (c) hasil uji pelindihan logam berat TCLP yang dimodifikasi terhadap baku mutu PP No. 22 Tahun 2021 (Angel dkk., 2025; Kavand &amp; Kazemian, 2025).
            </p>
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
