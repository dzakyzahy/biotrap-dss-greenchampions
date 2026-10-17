// ============================================================
// BioTrap-SIM™ v2.6 DSS - Simulation Constants & Scientific Database
// GREEN CHAMPIONS 2026 | GREEN DEMOCRACY INSTITUTE (GDI)
// Kategori: Green Technology & Clean Energy
// TIM THINK3RS - INSTITUT TEKNOLOGI BANDUNG (ITB)
// 1. Muhammad Ilham Saripul Milah (Ketua Tim | Teknik Metalurgi - FTTM ITB)
// 2. Dzaky Zahy Rabbani (Anggota Tim | Oseanografi - FITB ITB)
// Dosen Pembimbing: Ir. Tria Laksana Achmad, S.T., M.T., Ph.D. (Teknik Metalurgi - FTTM ITB)
// ============================================================

export const POME_MODES = {
  STANDARD_DIET: "Operasi Optimal Dual-Stage (In-Situ DIET + Ex-Situ Lead-Lag)",
  HIGH_SHOCK_POME: "Beban Ekstrem POME & Shock Load H₂S Tinggi (3.500–4.000 ppm)",
} as const;

export type PomeMode = (typeof POME_MODES)[keyof typeof POME_MODES];

export interface PomeProfile {
  codDefault: number; // g/L (Rata-rata karakteristik asli: 98.77 g/L)
  bodDefault: number; // g/L (34.99 g/L)
  bodCodRatio: number; // 0.32 (< 0.50 -> biodegradabilitas rendah tanpa katalis)
  phDefault: number; // 4.62 (Sangat asam)
  olrDefault: number; // 4.536 g VS/L (Organic Loading Rate mesofilik 37.5°C)
  h2sDefault: number; // ppm (2500 ppm rata-rata, hingga 4000 ppm ekstrem)
  qualityGrade: "optimal" | "shock-resilient";
  productName: string;
  chemicalProfile: string;
  biocharCatalysisImpact: string;
}

export const DEFAULT_POME_PROFILES: Record<PomeMode, PomeProfile> = {
  [POME_MODES.STANDARD_DIET]: {
    codDefault: 98.77,
    bodDefault: 34.99,
    bodCodRatio: 0.32,
    phDefault: 4.62,
    olrDefault: 4.536,
    h2sDefault: 2500,
    qualityGrade: "optimal",
    productName: "Biometana Kemurnian Tinggi (<50 ppm H₂S) & Pupuk Sirkular BioSulfur™",
    chemicalProfile:
      "Limbah cair kelapa sawit (POME) memiliki beban organik ekstrem dengan COD rata-rata 98,77 g/L (494x melampaui baku mutu EQA 1977 sebesar 0,20 g/L), BOD 34,99 g/L (350x baku mutu 0,10 g/L), rasio BOD/COD 0,32 (<0,50 yang mengindikasikan biodegradabilitas rendah dan fase tunda/lag phase lama), serta pH sangat asam 4,62. Secara nasional terdapat 28,7 Juta Ton/Tahun POME dan 64 Juta Ton/Tahun biomassa padat TKKS dari 1.219 PKS.",
    biocharCatalysisImpact:
      "Injeksi serbuk mikro-biochar TKKS (10–500 µm) pada dosis optimum RSM-CCD 2,00 g/L dengan rasio F/I 0,266 mengaktifkan mekanisme Direct Interspecies Electron Transfer (DIET) antara bakteri hidrolitik dan arkea metanogenik di dalam reaktor mesofilik (37,5°C). Struktur makropori honeycomb (5–8 µm) dengan karbon stabil 92,33% dan situs alkali K (0,15%) & Ca (0,48%) mengeliminasi total fase tunda (λ = -0,3362 hari), mendongkrak Methane Yield +73,3% (0,355 L/g VS) dan VS removal 95,1%.",
  },
  [POME_MODES.HIGH_SHOCK_POME]: {
    codDefault: 108.5,
    bodDefault: 38.4,
    bodCodRatio: 0.3,
    phDefault: 4.35,
    olrDefault: 5.12,
    h2sDefault: 3600,
    qualityGrade: "shock-resilient",
    productName: "Mode Proteksi Shock-Load: Switching Otomatis Lead-Lag & Buffering Alkali",
    chemicalProfile:
      "Kondisi fluktuasi puncak musim panen raya TBS menyebabkan lonjakan COD POME (>105 g/L) dan akumulasi asam lemak volatil (VFA) yang memicu organic shock & asidifikasi reaktor, disertai lonjakan gas H₂S korosif hingga 3.500–4.000 ppm yang berisiko merusak turbin gas engine 1,2 MW.",
    biocharCatalysisImpact:
      "Kapasitas penyangga alkali alami (pH_PZC = 10,9) dari mikro-biochar TKKS mencegah penurunan pH drastis pada biodigester. Pada sisi hilir, kolom kembar paralel Modular Lead-Lag H₂S Scrubber Skid dengan pelet silinder 5 mm (BET 1.105 m²/g, mesopori 0,180 cm³/g) menjaga konsentrasi H₂S outlet tetap aman (<50 ppm) dengan pressure drop <15 mbar dan otomatis mengalihkan katup (Auto-Valve Switch) saat mendekati ambang 45 ppm.",
  },
};

export const BIOTRAP_CONSTANTS = {
  // 1. RSM-CCD & TFM Mathematical Model Constants (Yan et al., 2025)
  RSM_BASE_YIELD_CONTROL: 0.205, // L CH4 / g VS (Kontrol tanpa biochar)
  RSM_OPTIMUM_YIELD: 0.355, // L CH4 / g VS (+73.3% pada X1 = 2.0 g/L, X2 = 0.266)
  RSM_OPTIMUM_BIOCHAR_DOSE: 2.0, // g/L (X1)
  RSM_OPTIMUM_FI_RATIO: 0.266, // Feed-to-Inoculum Ratio (X2)
  RSM_OPTIMUM_DESIRABILITY: 0.94, // Desirability 0.940
  RSM_R_SQUARED: 0.9196, // R² = 0.9196 (2FI Regression Model)
  RSM_MODEL_DEVIATION_PCT: 1.41, // Deviasi model < 1.41%
  BIOGAS_VOLUME_BOOST_PCT: 45.0, // 2,950 mL biogas (+45.0%)
  VS_REMOVAL_OPTIMUM_PCT: 95.1, // 95.1% Volatile Solids removal

  // 2. Transference Function Model (TFM) Constants
  TFM_LAG_PHASE_DAYS: -0.3362, // λ = -0.3362 hari (Zero Lag Phase)
  TFM_R_SQUARED: 0.985, // R² = 0.9850
  TFM_RMSE: 0.0827, // RMSE = 0.0827

  // 3. Adsorbent Pellet BioTrap-TKKS™ (Angel et al., 2025; Kavand & Kazemian, 2025)
  PYROLYSIS_TEMP_OPT: 950, // °C (Direct Single-Step Steam Activation, ramp 5°C/min, hold 0.75 jam)
  BET_SURFACE_AREA: 1105, // 1,105 ± 12 m²/g
  MESOPORE_VOLUME: 0.18, // 0.180 cm³/g
  PH_PZC: 10.9, // Point of Zero Charge (situs basa alami K 0.15%, Ca 0.48%)
  FIXED_CARBON_PCT: 92.33, // Karbon stabil 92.33% (FE-SEM & EDX)
  HONEYCOMB_PORE_UM: "5–8 µm", // Makropori honeycomb terkolonisasi mikroba
  PELLET_DIAMETER_MM: 5.0, // Pelet silinder 5 mm (Anti-channeling)
  PELLET_LENGTH_MM: 12.0, // Panjang rata-rata 12 mm
  MAX_SAFE_H2S_OUTLET_PPM: 50, // Target < 50 ppm (batas aman gas engine)
  VALVE_SWITCH_TRIGGER_PPM: 45, // Trigger switch otomatis >= 45 ppm
  MAX_PRESSURE_DROP_MBAR: 15.0, // Trigger switch otomatis ΔP >= 15 mbar
  POSITIVE_NER_RANGE: "13,6% – 21,2%", // Swasembada energi termal pirolisis

  // 4. Circular Fertilizer BioSulfur™ Specifications
  BIOSULFUR_S_PCT: "4 – 8%", // Sulfur terikat (S⁰ / SO₄²⁻)
  BIOSULFUR_C_PCT: "> 75%", // Karbon organik stabil
  BIOSULFUR_K2O_PCT: "2 – 4%", // Kalium alami TKKS
  BIOSULFUR_KTK_MEQ: 56.5, // Kapasitas Tukar Kation > 56 meq/100g (hingga 105 meq/100g)
  BIOSULFUR_WATER_RETENTION_BOOST: 58.9, // Retensi air tanah +58.9%

  // 5. Market & Financial Constants (Razor & Blade B2B Model)
  TAM_PKS_COUNT: 1219, // 1.219 PKS Nasional (Rp1,82 Triliun/tahun)
  SAM_PKS_COUNT: 360, // 360 PKS di Riau, Sumut & Kalteng (Rp540 Miliar/tahun)
  SOM_PKS_COUNT: 25, // 25 PKS Mitra Tahun ke-3 (Rp28,5 Miliar/tahun)
  SKID_CAPEX_RAZOR_IDR: 185_000_000, // Rp185 Juta / unit Modular Skid (Margin 35%, TKDN >= 90%)
  COLOCATION_HUB_CAPEX_IDR: 2_800_000_000, // Rp2,80 Miliar Total Initial CAPEX Pabrik Co-Location
  PELLET_PRICE_BLADE_PER_KG: 12_000, // Rp12.000/kg Pelet BioTrap-TKKS™ (Kemasan 25 kg)
  COAL_CARBON_PRICE_PER_KG: 35_000, // Rp30.000 - Rp45.000/kg (Rata-rata Rp35.000/kg karbon aktif fosil)
  BIOSULFUR_PRICE_PER_KG: 2_500, // Rp2.500/kg Pupuk BioSulfur™ (Kemasan 50 kg)
  B3_OPEX_SAVINGS_PER_PKS_YEAR: 1_200_000_000, // Rp1,20 Miliar / PKS / tahun (Zero Landfill & OPEX hemat 60%)
  PROTOTYPE_BUDGET_GDI_IDR: 17_000_000, // Rp17.000.000 Rincian Anggaran Prototipe Resmi GDI
  WACC_DISCOUNT_RATE: 0.1, // 10% Hurdle rate industri energi
  REF_NPV_SOM_IDR: 18_740_000_000, // Rp18,74 Miliar (SOM 25 PKS)
  REF_IRR_PCT: 38.2, // 38,2% / Tahun
  REF_PAYBACK_YEARS: 2.4, // ~2,4 Tahun

  // 6. ESG & Carbon Accounting (LCA Cradle-to-Gate)
  SOM_CARBON_REDUCTION_TCO2E: 42_500, // 42.500 tCO2e / tahun (Skala SOM 25 PKS)
  SINGLE_PKS_CARBON_TCO2E: 1_700, // 1.700 tCO2e / tahun / PKS (basis 45 Ton TBS/jam)
  LCA_OPEN_PONDING_KG_CO2_PER_TON_CPO: 2.85,
  LCA_EXISTING_AD_KG_CO2_PER_TON_CPO: 1.32,
  LCA_BIOTRAP_KG_CO2_PER_TON_CPO: 0.9, // -68,5% Carbon Intensity
  LCA_REDUCTION_PCT: 68.5,
  TREE_EQUIVALENT_SOM: 6_800_000, // Setara 6,8 Juta Pohon / tahun
  METHANE_GWP_FACTOR: 32, // GWP Metana 28 - 36x CO2
};

// Tabel Perbandingan Karakteristik POME vs Baku Mutu EQA 1977 (Halaman 3 PDF)
export const POME_EQA_COMPARISON = [
  {
    parameter: "COD (g/L)",
    pomeAvg: "98,77",
    eqaLimit: "0,20",
    status: "Sangat tinggi (494x lipat baku mutu)",
  },
  {
    parameter: "BOD (g/L)",
    pomeAvg: "34,99",
    eqaLimit: "0,10",
    status: "Sangat tinggi (350x lipat baku mutu)",
  },
  {
    parameter: "Rasio BOD/COD",
    pomeAvg: "0,32",
    eqaLimit: "≥ 0,50 (Ideal)",
    status: "Biodegradabilitas rendah, memicu lag phase lama",
  },
  {
    parameter: "Derajat Keasaman (pH)",
    pomeAvg: "4,62",
    eqaLimit: "6,0 – 9,0",
    status: "Sangat asam, memicu korosi cepat infrastruktur",
  },
];

// Rincian Anggaran Prototipe Rp17.000.000 (Halaman 12 PDF - Template Resmi GDI)
export const PROTOTYPE_BUDGET_ITEMS = [
  {
    no: 1,
    component: "Riset & Pengembangan",
    item: "Uji Adsorpsi H₂S Lab",
    spec: "Analisis BET Surface Area & GC/MS",
    costIDR: 3_500_000,
  },
  {
    no: 2,
    component: "Bahan / Material",
    item: "TKKS Sawit & Aditif",
    spec: "Biomassa TKKS lokal & perekat pelet",
    costIDR: 1_000_000,
  },
  {
    no: 3,
    component: "Komponen / Peralatan",
    item: "Kolom Reaktor & IoT",
    spec: "Bejana kembar Lead-Lag akrilik/SS + sensor gas H₂S",
    costIDR: 4_500_000,
  },
  {
    no: 4,
    component: "Jasa / Produksi",
    item: "Aktivasi Uap & Peletasi",
    spec: "Fabrikasi pelet silinder 5 mm suhu 950°C",
    costIDR: 2_500_000,
  },
  {
    no: 5,
    component: "Pengujian / Uji Coba",
    item: "Uji Toksisitas Pupuk",
    spec: "Analisis elusi TCLP (bebas logam berat/B3)",
    costIDR: 2_000_000,
  },
  {
    no: 6,
    component: "Kemasan / Desain Prototipe",
    item: "Sampel Kemasan Produk",
    spec: "Karung pelet 25 kg & pupuk BioSulfur 50 kg",
    costIDR: 1_000_000,
  },
  {
    no: 7,
    component: "Transportasi / Implementasi",
    item: "Logistik Bahan Baku",
    spec: "Pengambilan sampel POME & TKKS dari PKS mitra",
    costIDR: 1_500_000,
  },
  {
    no: 8,
    component: "Lain-lain",
    item: "Cloud Server & Dokumentasi",
    spec: "Hosting web BioTrap-SIM™ DSS & pelaporan",
    costIDR: 1_000_000,
  },
];

// Konstanta KUD Petani Sawit & Co-Location Hub (untuk Halaman Kalkulator KUD /empowerment)
export const KUD_COMMUNITY_CONSTANTS = {
  PELLET_PACK_WEIGHT_KG: 25, // Karung Pelet BioTrap-TKKS™ 25 kg
  BIOSULFUR_SACK_WEIGHT_KG: 50, // Karung Pupuk BioSulfur™ 50 kg
  BIOSULFUR_PRICE_PER_KG: 2_500, // Rp2.500/kg untuk petani KUD/Plasma
  COMMERCIAL_ZA_FERTILIZER_PRICE_PER_KG: 6_500, // Harga pupuk ZA/Kieserite sintetis impor Rp6.500/kg
   TREES_PER_HECTARE_SAWIT: 136, // Standar populasi pohon kelapa sawit per hektar (136 pokok/Ha)
  BIOSULFUR_DOSE_KG_PER_TREE_YEAR: 2.5, // Dosis rekomendasi 2,5 kg/pokok/tahun (340 kg/Ha/tahun)

  // Baku Mutu TCLP (PP No. 22 Tahun 2021 Lampiran XI) & PAH < LoD
  TCLP_AND_PAH_LIMITS: {
    Pb: { limit: 5.0, actual: 0.08, unit: "mg/L", name: "Timbal (Pb)" },
    Cd: { limit: 1.0, actual: 0.02, unit: "mg/L", name: "Kadmium (Cd)" },
    Cr6: { limit: 0.5, actual: 0.04, unit: "mg/L", name: "Kromium Heksavalen (Cr⁶⁺)" },
    As: { limit: 0.5, actual: 0.03, unit: "mg/L", name: "Arsen (As)" },
    PAH: { limit: 0.1, actual: 0.001, unit: "mg/kg (< LoD)", name: "Hidrokarbon Aromatik Polisiklik (PAH)" },
  },

  HUB_LOCATIONS: {
    STANDARD: {
      locationName: "Co-Location Hub Klaster Riau (213 PKS) & Sumatera Utara (147 PKS)",
      availableSpentPelletTons: 36.0,
      lastValidated: "2026-10-15",
      sulfurContentPct: 6.4,
      ktkValueMeq: 78.5,
      waterRetentionBoostPct: 58.9,
    },
    HIGH_SULFUR: {
      locationName: "Co-Location Hub Klaster Kalimantan Tengah (±100 PKS) - High-S Grade",
      availableSpentPelletTons: 24.5,
      lastValidated: "2026-10-16",
      sulfurContentPct: 7.8,
      ktkValueMeq: 94.2,
      waterRetentionBoostPct: 62.4,
    },
  },
};
