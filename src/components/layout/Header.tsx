"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cpu,
  Menu,
  X,
  Sparkles,
  Activity,
  Calculator,
  BookOpen,
  FileCode2,
  Users,
  Home,
} from "lucide-react";
import { useState } from "react";
import { useSimulationStore } from "@/lib/store";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const resetOptimal = useSimulationStore((s) => s.resetOptimal);

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/simulation", label: "Simulasi DSS", icon: Activity },
    { href: "/empowerment", label: "Kalkulator KUD & BioSulfur™", icon: Calculator },
    { href: "/about", label: "Metodologi", icon: BookOpen },
    { href: "/documentation", label: "Dokumentasi", icon: FileCode2 },
    { href: "/team", label: "Tim Think3rs", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-slate-800/80 px-4 py-3 lg:px-6">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-3">
        {/* Left: Logos (ITB + Green Champions GC.png + Green Democracy Institute GDI.png) & Brand */}
        <div className="flex items-center gap-3.5">
          {/* Official Logos Pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900/95 border border-emerald-500/30 px-2.5 py-1.5 shadow-inner">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white p-0.5 shadow-sm shrink-0">
              <Image
                src="/assets/Logo_ITB.png"
                alt="Logo ITB"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="h-6 w-px bg-slate-700/80" />
            <div className="relative h-8 w-24 shrink-0">
              <Image
                src="/assets/GC.png"
                alt="Green Champions 2026"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-8 w-24 shrink-0">
              <Image
                src="/assets/GDI.png"
                alt="Green Democracy Institute"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  BioTrap-SIM™
                </span>
                <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-400">
                  v2.6 DSS
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-950/90 border border-emerald-700/50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                  TELEMETRY ONLINE
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 line-clamp-1">
                Dual-Stage Biochar Engineering, H₂S Lead-Lag Scrubber &amp; Circular BioSulfur™ Decision Support System
              </p>
            </div>
          </Link>
        </div>

        {/* Center/Right Desktop Navigation */}
        <nav className="hidden 2xl:flex items-center gap-1 rounded-xl bg-slate-900/80 border border-slate-800 p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Credentials, Quick Optimum Button & Menu Dropdown */}
        <div className="flex items-center gap-2.5">
          <div className="hidden xl:block border-r border-slate-800 pr-3 text-right">
            <p className="text-[11px] font-bold text-emerald-300 tracking-wide">
              TIM THINK3RS — INSTITUT TEKNOLOGI BANDUNG (ITB)
            </p>
            <p className="text-[10px] text-slate-400">
              M. Ilham S. Milah (Metalurgi) • Dzaky Zahy R. (Oseanografi) | Advisor: Ir. Tria Laksana Achmad, Ph.D.
            </p>
          </div>

          <button
            onClick={resetOptimal}
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            title="Kalibrasi Otomatis ke Titik Optimum RSM-CCD (Desirability 0.940)"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Set Optimum (RSM-CCD)</span>
          </button>

          {/* Hamburger Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/90 p-2 text-slate-300 transition hover:border-emerald-500/50 hover:text-white cursor-pointer"
              aria-label="Menu Navigasi"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-700/80 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl z-50">
                <div className="mb-2 border-b border-slate-800 px-3 py-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                    GREEN CHAMPIONS 2026 • GDI
                  </p>
                  <p className="text-xs font-bold text-white">
                    Navigasi BioTrap-SIM™ DSS
                  </p>
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                          isActive
                            ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 text-emerald-400" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-2 border-t border-slate-800 pt-2">
                  <button
                    onClick={() => {
                      resetOptimal();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Set Optimum RSM-CCD (2.0 g/L)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
