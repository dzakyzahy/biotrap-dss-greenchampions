"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Award, GraduationCap, ShieldCheck, Sparkles, Cpu, Leaf } from 'lucide-react';

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
    role: 'Ketua Tim — Lead Process & Materials Engineer',
    major: 'Teknik Metalurgi',
    faculty: 'Fakultas Teknik Pertambangan dan Perminyakan (FTTM) ITB',
    bio: 'Bertanggung jawab atas rekayasa pirolisis & aktivasi uap biochar suhu tinggi (950°C), perancangan perangkat keras Modular Lead-Lag Scrubbing Skid, serta ko-pengembangan algoritma optimasi BioTrap-SIM™ v2.6 DSS.',
    image: '/assets/pp_ilham_team.jpg',
    badge: 'Pyrolysis 950°C & Lead-Lag Hardware',
  },
  {
    name: 'Dzaky Zahy Rabbani',
    role: 'Anggota Tim — Environmental Modeler & Full-Stack DSS Architect',
    major: 'Oseanografi',
    faculty: 'Fakultas Ilmu dan Teknologi Kebumian (FITB) ITB',
    bio: 'Bertanggung jawab atas karakterisasi beban fisikokimia POME, pemodelan Life Cycle Assessment (LCA Cradle-to-Cradle), kuantifikasi reduksi emisi GRK (42.500 tCO₂e/tahun), kepatuhan 4 pilar SDGs, serta arsitektur komputasi 3D Digital Twin BioTrap-SIM™.',
    image: '/assets/pp_dzaky.jpg',
    badge: 'LCA Decarbonization & 3D Digital Twin DSS',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#080d0b] text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 space-y-12">
        {/* Competition & Institution Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900 border border-emerald-500/30 shadow-md">
            <div className="bg-white p-0.5 rounded-full">
              <img src="/assets/Logo_ITB.png" alt="Logo ITB" className="h-7 w-auto object-contain" />
            </div>
            <div className="h-5 w-[1px] bg-slate-700" />
            <img src="/assets/GC.png" alt="Green Champions" className="h-7 w-auto object-contain" />
            <div className="h-5 w-[1px] bg-slate-700" />
            <img src="/assets/GDI.png" alt="Green Democracy Institute" className="h-7 w-auto object-contain" />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Profil <span className="text-emerald-400">TIM THINK3RS</span> — ITB
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Kolaborasi lintas disiplin ilmu antara <strong>Rekayasa Metalurgi & Material Proses (FTTM ITB)</strong> serta <strong>Pemodelan Lingkungan & Sistem Komputasi (FITB ITB)</strong> untuk kompetisi <strong>GREEN CHAMPIONS 2026 — Green Democracy Institute (GDI)</strong>.
          </p>
        </div>

        {/* Core Student Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-slate-900/80 rounded-2xl border border-emerald-500/25 shadow-xl overflow-hidden hover:border-emerald-400/50 transition-all flex flex-col"
            >
              <div className="h-28 bg-gradient-to-r from-emerald-950 via-teal-900/70 to-slate-900 relative border-b border-emerald-500/20">
                <div className="absolute top-3 right-4 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  {member.badge}
                </div>
                <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-2xl border-4 border-[#080d0b] bg-slate-800 flex items-center justify-center overflow-hidden shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-16 p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mb-1">{member.name}</h3>
                  <p className="text-xs font-semibold text-amber-300 mb-3">
                    {member.major} • {member.faculty}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed">{member.bio}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    Institut Teknologi Bandung
                  </span>
                  <span className="font-mono text-emerald-400">TIM THINK3RS</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scientific Advisor Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 rounded-2xl border border-amber-500/30 p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Award className="w-4 h-4" />
                Dosen Pembimbing & Supervisi Saintifik
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Ir. Tria Laksana Achmad, S.T., M.T., Ph.D.
              </h2>
              <p className="text-xs font-semibold text-emerald-300">
                Kelompok Keahlian Teknik Metalurgi — Fakultas Teknik Pertambangan dan Perminyakan (FTTM) ITB
              </p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                <em>Expert in Computational Process Modeling &amp; Simulation.</em> Memberikan supervisi saintifik pada pemodelan kinetika reaksi transfer elektron antar-spesies (DIET), optimasi statistik permukaan respons (RSM-CCD), serta validasi arsitektur komputasi <strong>BioTrap-SIM™ v2.6 Decision Support System</strong>.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <ShieldCheck className="w-8 h-8 text-amber-400 mb-1.5" />
              <span className="text-xs font-bold text-white">Scientific Validation</span>
              <span className="text-[10px] font-mono text-emerald-400">R² = 0.9850 • TRL 4–5</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
