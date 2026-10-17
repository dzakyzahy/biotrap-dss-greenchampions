"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TeamMember {
  name: string;
  role: string;
  major: string;
  faculty: string;
  bio: string;
  image: string;
  badge: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Muhammad Ilham Saripul Milah',
    role: 'Ketua Tim / Lead Process & Materials Engineer',
    major: 'Teknik Metalurgi',
    faculty: 'Fakultas Teknik Pertambangan dan Perminyakan (FTTM) ITB',
    bio: 'Bertanggung jawab atas rekayasa pirolisis dan aktivasi uap biochar suhu tinggi (950°C), perancangan perangkat keras Modular Lead-Lag Scrubbing Skid, serta ko-pengembangan algoritma optimasi BioTrap-SIM™ v2.6 DSS.',
    image: '/assets/pp_ilham_team.jpg',
    badge: 'Pyrolysis 950°C & Lead-Lag Hardware',
  },
  {
    name: 'Dzaky Zahy Rabbani',
    role: 'Anggota Tim / Environmental Modeler & Full-Stack DSS Architect',
    major: 'Oseanografi',
    faculty: 'Fakultas Ilmu dan Teknologi Kebumian (FITB) ITB',
    bio: 'Bertanggung jawab atas karakterisasi beban fisikokimia POME, pemodelan Life Cycle Assessment (LCA Cradle-to-Cradle), kuantifikasi reduksi emisi GRK (42.500 tCO₂e/tahun), kepatuhan 4 pilar SDGs, serta arsitektur komputasi 3D Digital Twin BioTrap-SIM™.',
    image: '/assets/pp_dzaky.jpg',
    badge: 'LCA Decarbonization & 3D Digital Twin DSS',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 space-y-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
        </Link>

        {/* Competition & Institution Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-700">
            GREEN CHAMPIONS 2026 | GREEN DEMOCRACY INSTITUTE (GDI)
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Profil <span className="text-emerald-700">TIM THINK3RS</span> ITB
          </h1>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Kolaborasi lintas disiplin ilmu antara <strong>Rekayasa Metalurgi &amp; Material Proses (FTTM ITB)</strong> serta <strong>Pemodelan Lingkungan &amp; Sistem Komputasi (FITB ITB)</strong> untuk kompetisi <strong>GREEN CHAMPIONS 2026 (Green Democracy Institute)</strong>.
          </p>
        </div>

        {/* Core Student Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-72 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 border border-gray-200 text-xs font-mono font-semibold text-emerald-800 shadow-sm">
                  {member.badge}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-xs font-semibold text-amber-700 mb-3">
                    {member.major} • {member.faculty}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Institut Teknologi Bandung</span>
                  <span className="font-mono font-bold text-emerald-700">TIM THINK3RS</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scientific Advisor Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                Dosen Pembimbing &amp; Supervisi Saintifik
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Ir. Tria Laksana Achmad, S.T., M.T., Ph.D.
              </h2>
              <p className="text-xs font-semibold text-emerald-700">
                Kelompok Keahlian Teknik Metalurgi - Fakultas Teknik Pertambangan dan Perminyakan (FTTM) ITB
              </p>
              <p className="text-sm text-gray-600 leading-relaxed pt-1">
                <em>Expert in Computational Process Modeling &amp; Simulation.</em> Memberikan supervisi saintifik pada pemodelan kinetika reaksi transfer elektron antar-spesies (DIET), optimasi statistik permukaan respons (RSM-CCD), serta validasi arsitektur komputasi <strong>BioTrap-SIM™ v2.6 Decision Support System</strong>.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center p-5 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <span className="text-xs font-bold text-gray-900">Scientific Validation</span>
              <span className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                R² = 0.9850 • TRL 4-5
              </span>
            </div>
          </div>
        </div>

        {/* Supported By Logos */}
        <div className="pt-8 flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Institusi &amp; Penyelenggara
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <img src="/assets/Logo_ITB.png" alt="ITB" className="h-16 w-auto object-contain" />
            <img src="/assets/GC.png" alt="Green Champions" className="h-14 w-auto object-contain" />
            <img src="/assets/GDI.png" alt="Green Democracy Institute" className="h-14 w-auto object-contain" />
          </div>
        </div>
      </main>
    </div>
  );
}
