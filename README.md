# BioTrap-SIM™ v2.6 — Decision Support System (DSS)

**Waste-to-Resource Command Center: BioTrap-TKKS™ & BioSulfur™**  
**TIM THINK3RS — Institut Teknologi Bandung (ITB)**  
*Kompetisi GREEN CHAMPIONS 2026 | Green Democracy Institute (GDI) — Kategori: Green Technology & Clean Energy*

---

## Ringkasan Inovasi

**BioTrap-SIM™ v2.6 DSS** adalah platform *Digital Twin* dan Sistem Pendukung Keputusan berbasis web interaktif untuk mengoptimalkan pemanfaatan limbah padat **Tandan Kosong Kelapa Sawit (TKKS)** menjadi karbon aktif berpori tinggi (*S_BET* 485 m²/g via pirolisis & aktivasi uap 950°C) dengan mekanisme sirkular 3-tahap di Pabrik Kelapa Sawit (PKS):

1. **In-Situ DIET Bio-Catalyst (Biodigester POME):** Dosis optimum **2,0 g/L** dan rasio **F/I 0,266** meningkatkan *specific methane yield* hingga **338,2 mL CH₄/g VS** (+16,5% vs kontrol) dan mengeliminasi fase lag (**λ = -0,3362 hari**, **R² = 0,9850**).
2. **Ex-Situ Lead-Lag H₂S Scrubbing Skid:** Kemisorpsi selektif berbasis mineral alkali intrinsik ($\text{CaCO}_3$ 4,94%) menurunkan $\text{H}_2\text{S}$ dari **2.500 ppm menjadi 90 ppm (efikasi 96,4%)**, melindungi *Gas Engine* **1,20 MW** dari korosi asam dengan *Zero Plant Downtime*.
3. **Upcycling Pupuk Sirkular BioSulfur™:** Pelet jenuh sulfur ($\text{S}^0 / \text{SO}_4^{2-}$) tervalidasi aman (**TCLP & PAH < LoD**) dan di-upcycle menjadi pupuk *slow-release* **BioSulfur™** (19,2 Ton/tahun/PKS) untuk KUD petani sawit rakyat.

---

## Fitur Utama Aplikasi

- **Command Center IoT (`/simulation`):** Kontrol real-time 6 parameter operasi (Kapasitas TBS, COD POME, Dosis BioTrap-TKKS™, Rasio F/I, H₂S Inlet, Suhu Pirolisis), kurva kinetika TFM, profil penurunan H₂S, dan telemetri katup *Lead-Lag*.
- **3D Digital Twin Pabrik & Pelet (`/simulation`):** Visualisasi 3D interaktif *Three.js / React Three Fiber* untuk 4 unit pabrik (Furnace Pirolisis 950°C → Biodigester POME DIET → Twin Column Lead-Lag Scrubber Skid → Gas Engine 1,2 MW & Granulator BioSulfur™) serta penampang pori *honeycomb* pelet silinder 5 mm.
- **Kalkulator KUD & BioSulfur™ (`/empowerment`):** Simulasi hilirisasi pupuk BioSulfur™ (@50 kg), suplai *Blade* pelet (@25 kg), cakupan hektar kebun sawit, dan rincian RAB Prototipe GDI (Rp17.000.000).
- **Metodologi & Bukti Lab (`/about`):** Dokumentasi model kuadratik RSM-CCD, kinetika TFM, FE-SEM/EDX, dan LCA *Cradle-to-Cradle* (42.500 $\text{tCO}_2\text{e}$/tahun pada 25 PKS).
- **Dokumentasi & Valuasi Bisnis (`/documentation`):** Neraca massa & energi harian, komparasi *head-to-head* kompetitor, valuasi *Razor & Blade* (NPV Rp18,74 Miliar, IRR 38,2%, *Payback* 2,4 Tahun), serta matriks FMEA.

---

## Menjalankan Secara Lokal & Build Produksi (Vercel Ready)

```bash
npm install
npm run dev
```

Untuk menguji build produksi:

```bash
npm run build
npm start
```
