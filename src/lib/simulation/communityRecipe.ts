import { KUD_COMMUNITY_CONSTANTS } from "./constants";

export interface KudValorizationResult {
  // Input Echo
  spentPelletKg: number;
  sulfurGrade: "STANDARD" | "HIGH_SULFUR";
  applicationTarget: "SAWIT_PLASMA" | "HORTIKULTURA";

  // Output Products (Satuan Lapangan KUD & Petani)
  bioSulfurTotalKg: number; // Setelah formulasi & granulasi (+stabilisasi matriks)
  bioSulfurSacks50Kg: number; // Kemasan Karung 50 kg
  bladeReplacementSacks25Kg: number; // Kebutuhan repeat order Pelet BioTrap-TKKS™ 25 kg

  // Agronomic Impact (Kebun Kelapa Sawit Rakyat)
  treesFertilizedCount: number; // Jumlah pokok kelapa sawit terlayani
  plantationAreaHectares: number; // Luas lahan kebun sawit (Ha)
  sulfurContentPct: number; // 6.4% - 7.8% S⁰/SO₄²⁻
  carbonContentPct: number; // >75% C-organik
  ktkValueMeq: number; // >56 - 94 meq/100g
  waterRetentionBoostPct: number; // +58.9% retensi air tanah

  // Financial Impact for KUD & Smallholders
  bioSulfurPurchaseCostIDR: number; // Harga tebus KUD @ Rp2.500/kg
  commercialFertilizerEquivalentIDR: number; // Harga pupuk ZA/Kieserite komersial @ Rp6.500/kg
  farmerCostSavingsIDR: number; // Penghematan biaya pupuk petani (Rp)
  farmerSavingsPct: number; // % penghematan biaya pupuk
  costPerTreeIDR: number; // Biaya pemupukan per pohon sawit (Rp/pokok)

  // Step-by-step Valorization & Field Application SOP
  valorizationSteps: string[];

  // Environmental Safety Validation (TCLP PP 22/2021 & PAH < LoD)
  safetyStatus: "CLEARED";
  safetyMessage: string;
  hubLocationName: string;
  availableTonsInHub: number;
  lastValidatedDate: string;
  labTestResults: typeof KUD_COMMUNITY_CONSTANTS.TCLP_AND_PAH_LIMITS;
}

export function calculateKudValorization(
  spentPelletKg: number,
  sulfurGrade: "STANDARD" | "HIGH_SULFUR" = "STANDARD",
  applicationTarget: "SAWIT_PLASMA" | "HORTIKULTURA" = "SAWIT_PLASMA"
): KudValorizationResult {
  const KC = KUD_COMMUNITY_CONSTANTS;
  const hub = KC.HUB_LOCATIONS[sulfurGrade];

  // 1. Mass conversion: Spent pellet + natural K/Ca/Mg conditioning -> BioSulfur™ Granules
  const conditioningFactor = sulfurGrade === "HIGH_SULFUR" ? 1.08 : 1.05;
  const bioSulfurTotalKg = Math.round(spentPelletKg * conditioningFactor);
  const bioSulfurSacks50Kg = +(bioSulfurTotalKg / KC.BIOSULFUR_SACK_WEIGHT_KG).toFixed(1);
  const bladeReplacementSacks25Kg = +(spentPelletKg / KC.PELLET_PACK_WEIGHT_KG).toFixed(1);

  // 2. Agronomic Coverage
  const dosePerTree = applicationTarget === "SAWIT_PLASMA" ? 2.5 : 1.2;
  const treesFertilizedCount = Math.floor(bioSulfurTotalKg / dosePerTree);
  const plantationAreaHectares = +(
    treesFertilizedCount / KC.TREES_PER_HECTARE_SAWIT
  ).toFixed(2);

  // 3. Financial Savings for Farmers
  const bioSulfurPurchaseCostIDR = bioSulfurTotalKg * KC.BIOSULFUR_PRICE_PER_KG;
  const commercialFertilizerEquivalentIDR =
    bioSulfurTotalKg * KC.COMMERCIAL_ZA_FERTILIZER_PRICE_PER_KG;
  const farmerCostSavingsIDR =
    commercialFertilizerEquivalentIDR - bioSulfurPurchaseCostIDR;
  const farmerSavingsPct = +(
    (farmerCostSavingsIDR / commercialFertilizerEquivalentIDR) *
    100
  ).toFixed(1);
  const costPerTreeIDR =
    treesFertilizedCount > 0
      ? Math.round(bioSulfurPurchaseCostIDR / treesFertilizedCount)
      : 0;

  // 4. Practical SOP Steps for Co-Location Hub & KUD Petani Sawit
  const valorizationSteps = [
    `Langkah 1 - Panen Media Kolom Lead-Lag: Keluarkan ${spentPelletKg.toLocaleString("id-ID")} Kg pelet BioTrap-TKKS™ jenuh sulfur dari Kolom A saat indikator telemetri DSS mencapai ambang jenuh (≥45 ppm H₂S) sementara aliran gas otomatis dialihkan ke Kolom B.`,
    `Langkah 2 - Stabilisasi & Granulasi BioSulfur™: Lakukan aerasi ringan untuk mengoksidasi sisa sulfida menjadi sulfat terikat (SO₄²⁻ ${hub.sulfurContentPct}%) dan sulfur elemental (S⁰), menyatu dengan matriks karbon stabil (>75% C), K₂O (2–4%), dan CaO/MgO alami TKKS.`,
    `Langkah 3 - Pengemasan Standar KUD: Kemas produk menjadi ${bioSulfurSacks50Kg} Karung BioSulfur™ (@ 50 kg). Kirim notifikasi otomatis repeat order ${bladeReplacementSacks25Kg} Karung pelet segar (@ 25 kg) ke Co-Location Hub.`,
    `Langkah 4 - Aplikasi Piringan Kebun Sawit: Sebarkan secara melingkar pada piringan pohon sawit dengan dosis ${dosePerTree} kg/pokok (${treesFertilizedCount.toLocaleString("id-ID")} pohon ≈ ${plantationAreaHectares} Ha). Struktur pori honeycomb meningkatkan KTK tanah (${hub.ktkValueMeq} meq/100g) dan retensi air +${hub.waterRetentionBoostPct}%.`,
  ];

  const safetyMessage =
    "✅ LULUS UJI TOKSIKOLOGI TCLP (PP No. 22 Tahun 2021) & GC/MS PAH < LoD: Pelet BioTrap-TKKS™ diproduksi dari biomassa murni Tandan Kosong Kelapa Sawit melalui aktivasi uap fisik 950°C tanpa bahan kimia B3. Hasil elusi logam berat (Pb, Cd, Cr⁶⁺, As) dan Hidrokarbon Aromatik Polisiklik (PAH) berada jauh di bawah ambang deteksi laboratorium, 100% aman ditebar sebagai soil conditioner & pupuk organik sirkular.";

  return {
    spentPelletKg,
    sulfurGrade,
    applicationTarget,
    bioSulfurTotalKg,
    bioSulfurSacks50Kg,
    bladeReplacementSacks25Kg,
    treesFertilizedCount,
    plantationAreaHectares,
    sulfurContentPct: hub.sulfurContentPct,
    carbonContentPct: 92.33,
    ktkValueMeq: hub.ktkValueMeq,
    waterRetentionBoostPct: hub.waterRetentionBoostPct,
    bioSulfurPurchaseCostIDR,
    commercialFertilizerEquivalentIDR,
    farmerCostSavingsIDR,
    farmerSavingsPct,
    costPerTreeIDR,
    valorizationSteps,
    safetyStatus: "CLEARED",
    safetyMessage,
    hubLocationName: hub.locationName,
    availableTonsInHub: hub.availableSpentPelletTons,
    lastValidatedDate: hub.lastValidated,
    labTestResults: KC.TCLP_AND_PAH_LIMITS,
  };
}
