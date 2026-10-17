"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 lg:h-28 lg:px-8">
        {/* Left: Prominent Logos (2-3x larger) + Huge Brand Title with TM */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="flex items-center gap-3 sm:gap-5">
            <img
              src="/assets/Logo_ITB.png"
              alt="Logo ITB"
              className="h-11 w-auto object-contain sm:h-14 lg:h-16"
            />
            <div className="h-9 w-[1px] bg-gray-300 sm:h-12" />
            <img
              src="/assets/GC.png"
              alt="Green Champions"
              className="h-10 w-auto object-contain sm:h-13 lg:h-15"
            />
            <div className="hidden h-9 w-[1px] bg-gray-300 sm:block sm:h-12" />
            <img
              src="/assets/GDI.png"
              alt="Green Democracy Institute"
              className="hidden h-10 w-auto object-contain sm:block sm:h-13 lg:h-15"
            />
          </div>

          <div className="h-10 w-[2px] bg-gray-200 hidden md:block" />

          <Link href="/" className="group">
            <h1
              className="bg-clip-text text-2xl font-black tracking-tight text-transparent transition-opacity group-hover:opacity-90 sm:text-4xl lg:text-5xl"
              style={{
                backgroundImage: 'linear-gradient(to right, #0f172a, #15803d, #0d9488)',
              }}
            >
              BioTrap-SIM<sup className="ml-0.5 text-sm sm:text-xl lg:text-2xl font-extrabold align-super text-teal-700">™</sup>
            </h1>
          </Link>
        </div>

        {/* Right: Simple Hamburger Menu Only */}
        <div className="relative flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu Navigasi"
            className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
              <Link
                href="/"
                className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/simulation"
                className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Simulasi DSS
              </Link>
              <Link
                href="/empowerment"
                className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Kalkulator KUD Sawit
              </Link>
              <Link
                href="/about"
                className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Metodologi
              </Link>
              <Link
                href="/documentation"
                className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Dokumentasi
              </Link>
              <Link
                href="/team"
                className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Tim Pengembang
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
