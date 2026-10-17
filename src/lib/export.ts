import { MassBalanceResult } from "./simulation/massBalance";
import { EconomicResult } from "./simulation/economics";

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportSimulationData = (result: MassBalanceResult) => {
  const rows = [
    ["BioTrap-SIM™ v2.6 DSS — Laporan Neraca Massa, Kinetika TFM & Telemetri H2S", "", ""],
    ["Kompetisi GREEN CHAMPIONS 2026 | Green Democracy Institute (GDI)", "", ""],
    ["Tim Think3rs — Institut Teknologi Bandung (ITB)", "", ""],
    ["Tanggal Export", new Date().toLocaleDateString("id-ID"), ""],
    ["", "", ""],
    ["=== 1. PARAMETER OPERASIONAL PKS & REAKTOR ===", "", ""],
    ["Parameter", "Nilai", "Satuan"],
    ["Kapasitas Olah PKS (TBS)", result.tbsCapacityTonPerHour.toFixed(0), "Ton/jam"],
    ["Konsentrasi COD POME Inlet", result.codInletGpl.toFixed(2), "g/L"],
    ["Dosis Aditif Mikro-Biochar TKKS (X1)", result.biocharDoseGpl.toFixed(2), "g/L"],
    ["Feed-to-Inoculum Ratio / FI (X2)", result.fiRatio.toFixed(3), "-"],
    ["Kadar Gas H2S Mentah (Inlet Skid)", result.h2sInletPpm.toFixed(0), "ppm"],
    ["Suhu Aktivasi Uap Pirolisis TKKS", result.pyrolysisTempC.toFixed(0), "°C"],
    ["", "", ""],
    ["=== 2. HASIL OPTIMASI RSM-CCD & KINETIKA TFM ===", "", ""],
    ["Prediksi Methane Yield (DIET)", result.methaneYieldLgVS.toFixed(3), "L CH4 / g VS"],
    ["Peningkatan vs Kontrol (0.205)", `${result.yieldBoostPct >= 0 ? "+" : ""}${result.yieldBoostPct}`, "%"],
    ["Desirability RSM-CCD", result.desirabilityRSM.toFixed(3), "-"],
    ["Penyisihan Volatile Solids (VS Removal)", result.vsRemovalPct.toFixed(1), "%"],
    ["Konstanta Fase Tunda (Lag Phase λ)", result.lagPhaseDays.toFixed(3), "hari"],
    ["Status AI Smart Dosing Advisor", result.advisorStatus, "-"],
    ["", "", ""],
    ["=== 3. NERACA MASSA & ENERGI HARIAN (CLOSED-LOOP) ===", "", ""],
    ["Umpan Limbah Cair POME Harian", result.pomeDailyM3.toString(), "m3/hari"],
    ["Kebutuhan Mikro-Biochar Digester", result.microBiocharDailyKg.toString(), "kg/hari"],
    ["Timbulan Biomassa Padat TKKS", result.tkksDailyTon.toString(), "Ton/hari"],
    ["Produksi Pelet BioTrap-TKKS™ (5 mm)", result.pelletDailyTon.toFixed(2), "Ton/hari"],
    ["Output Pupuk Sirkular BioSulfur™", result.fertilizerDailyTon.toFixed(2), "Ton/hari"],
    ["Produksi Biometana Bersih (<50 ppm H2S)", result.cleanBiomethaneDailyNm3.toString(), "Nm3/hari"],
    ["Potensi Listrik Bersih On-Site (Gas Engine)", result.powerMW.toFixed(2), "MW Elektrik"],
    ["", "", ""],
    ["=== 4. TELEMETRI PURIFIKASI H2S LEAD-LAG SKID ===", "", ""],
    ["Konsentrasi H2S Outlet Skid", result.h2sOutletPpm.toString(), "ppm (Target <50)"],
    ["Efisiensi Serap H2S", result.h2sEfficiencyPct.toFixed(2), "%"],
    ["Luas Permukaan Spesifik BET", result.betSurfaceAreaM2g.toString(), "m2/g"],
    ["Tingkat Kejenuhan Kolom A", result.colASaturationPct.toFixed(1), "%"],
    ["Tingkat Kejenuhan Kolom B", result.colBSaturationPct.toFixed(1), "%"],
    ["Sisa Umur Pakai sebelum Panen BioSulfur™", result.remainingServiceDays.toString(), "Hari"],
    ["", "", ""],
    ["=== 5. DAMPAK ESG & DEKARBONISASI ===", "", ""],
    ["Reduksi Emisi GRK (1 PKS)", result.singlePksCarbonTco2e.toString(), "tCO2e/tahun"],
    [`Reduksi Emisi GRK (${result.pksScaleCount} PKS SOM)`, result.totalCarbonReductionTco2e.toString(), "tCO2e/tahun"],
    ["Penurunan Intensitas Karbon LCA", `-${result.lcaCarbonIntensityReductionPct}`, "%"],
    ["Ekuivalensi Daya Serap Pohon", result.treeEquivalentCount.toLocaleString("id-ID"), "Pohon/tahun"],
  ];

  const tsv = rows.map((row) => row.join("\t")).join("\n");
  downloadFile(
    tsv,
    `BioTrap_SIM_Neraca_Massa_Kinetika_${new Date().toISOString().slice(0, 10)}.xls`,
    "application/vnd.ms-excel"
  );
};

export const exportEconomicReport = (econ: EconomicResult) => {
  const formatNum = (n: number) => Math.round(n).toLocaleString("id-ID");

  const rows = [
    ["BioTrap-SIM™ v2.6 DSS — Laporan Valuasi Tekno-Ekonomi (Razor & Blade) & ESG", "", ""],
    ["Kompetisi GREEN CHAMPIONS 2026 | Green Democracy Institute (GDI)", "", ""],
    ["Tim Think3rs — Institut Teknologi Bandung (ITB)", "", ""],
    ["Tanggal Export", new Date().toLocaleDateString("id-ID"), ""],
    ["", "", ""],
    ["=== 1. UNIT ECONOMICS PER PKS (RAZOR & BLADE) ===", "", ""],
    ["Metrik", "Nilai (Rp)", "Keterangan"],
    ["CAPEX Modular Lead-Lag Skid ('Razor')", formatNum(econ.skidCapexRazorIDR), "Margin 35% • TKDN >= 90%"],
    ["Biaya Tahunan Pelet BioTrap-TKKS™ ('Blade')", formatNum(econ.annualBioTrapBladeCostIDR), "Rp 12.000/kg (Kemasan 25 kg)"],
    ["Biaya Konvensional Karbon Aktif Fosil + B3", formatNum(econ.annualCoalCarbonCostIDR), "Rp 35.000/kg + Landfill B3"],
    ["Penghematan Biaya B3 & OPEX per PKS", formatNum(econ.annualOpexSavingsPerPksIDR), "Hemat 60% OPEX • 100% Zero B3 Waste"],
    ["Pendapatan Valorisasi Pupuk BioSulfur™ per PKS", formatNum(econ.annualBioSulfurRevenuePerPksIDR), "Rp 2.500/kg (Kemasan 50 kg)"],
    ["", "", ""],
    [`=== 2. KELAYAKAN INVESTASI CO-LOCATION HUB (SKALA ${econ.pksScaleCount} PKS MITRA) ===`, "", ""],
    ["Total Initial CAPEX Pabrik Co-Location", formatNum(econ.coLocationHubCapexIDR), "IDR"],
    ["Pendapatan Tahunan Co-Location Hub", formatNum(econ.annualHubRevenueIDR), "IDR/tahun"],
    ["Biaya Operasional (OPEX) Tahunan Hub", formatNum(econ.annualHubOpexIDR), "IDR/tahun"],
    ["Laba Kotor (Gross Profit)", formatNum(econ.grossProfitIDR), "IDR/tahun"],
    ["Laba Bersih (Net Profit)", formatNum(econ.netProfitIDR), "IDR/tahun"],
    ["Net Present Value (NPV, WACC 10%)", formatNum(econ.metrics.npvIDR), "IDR"],
    ["Internal Rate of Return (IRR)", econ.metrics.irrPct.toFixed(1), "% / tahun"],
    ["Payback Period", econ.metrics.paybackYears.toFixed(1), "Tahun"],
    ["", "", ""],
    ["=== 3. PROYEKSI ARUS KAS 5 TAHUN (MILIAR IDR) ===", "", ""],
    ["Tahun", "Revenue (Miliar Rp)", "OPEX (Miliar Rp)", "Cumulative Cash Flow (Miliar Rp)"],
    ...econ.metrics.fiveYearProjections.map((p) => [
      p.label,
      p.revenueMiliar.toFixed(2),
      p.opexMiliar.toFixed(2),
      p.cumulativeCashFlowMiliar.toFixed(2),
    ]),
  ];

  const tsv = rows.map((row) => row.join("\t")).join("\n");
  downloadFile(
    tsv,
    `BioTrap_SIM_Laporan_Ekonomi_ESG_${new Date().toISOString().slice(0, 10)}.xls`,
    "application/vnd.ms-excel"
  );
};
