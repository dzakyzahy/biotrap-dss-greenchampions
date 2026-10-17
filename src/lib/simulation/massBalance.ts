import { BIOTRAP_CONSTANTS, PomeMode, DEFAULT_POME_PROFILES } from "./constants";

export interface KineticPoint {
  dayLabel: string;
  day: number;
  catalyzedYield: number; // L CH4 / g VS (BioTrap-TKKS™ DIET)
  controlYield: number; // L CH4 / g VS (Kontrol Konvensional)
}

export interface H2STelemetryPoint {
  hourLabel: string;
  outletPpm: number;
  safeLimitPpm: number;
  inletPpm: number;
}

export interface MassBalanceResult {
  // === INPUT ECHO ===
  tbsCapacityTonPerHour: number; // 30 - 60 Ton/jam
  codInletGpl: number; // 65 - 115 g/L
  biocharDoseGpl: number; // 0.0 - 4.0 g/L (X1)
  fiRatio: number; // 0.150 - 0.450 (X2)
  h2sInletPpm: number; // 1500 - 4000 ppm
  pyrolysisTempC: number; // 700 - 1000 °C
  isColumnALead: boolean;
  pksScaleCount: number; // 1 - 25 PKS (default 25 SOM)

  // === 1. RSM-CCD & TFM KINETICS OUTPUTS ===
  methaneYieldLgVS: number; // L CH4 / g VS (0.355 at optimum)
  yieldBoostPct: number; // +73.3% vs kontrol (0.205)
  desirabilityRSM: number; // 0.940 at optimum
  vsRemovalPct: number; // 95.1% at optimum
  lagPhaseDays: number; // -0.336 d (Zero Lag Phase)
  advisorStatus: "OPTIMAL" | "UNDER_DOSING" | "SUB_OPTIMAL";
  advisorTitle: string;
  advisorMessage: string;

  // === 2. DAILY & ANNUAL MASS & ENERGY BALANCE ===
  pomeDailyM3: number; // 700 m³/hari at 45 T/jam
  pomeHourlyM3: number; // 29.2 m³/jam
  microBiocharDailyKg: number; // 1,400 kg/hari at 2.0 g/L
  tkksDailyTon: number; // 230 Ton/hari at 45 T/jam
  tkksHourlyTon: number; // 9.6 T/jam
  pelletDailyTon: number; // 1.20 Ton/hari
  pelletMonthlyTon: number; // 36 Ton/bulan (atau 300 T/bulan klaster)
  fertilizerDailyTon: number; // 2.40 Ton/hari BioSulfur™
  fertilizerDailySacks50Kg: number; // 48 Karung 50 kg/hari
  rawBiogasDailyNm3: number; // 14,500 Nm³/hari
  cleanBiomethaneDailyNm3: number; // 14,200 Nm³/hari
  powerMW: number; // 1.20 MW Elektrik
  dailyElectricityKWh: number; // kWh/hari generated

  // Annual values (300 hari operasi efektif atau 365 hari kontinu)
  annualPomeM3: number;
  annualTkksTon: number;
  annualPelletTon: number;
  annualFertilizerTon: number;
  annualBiomethaneNm3: number;

  // === 3. LEAD-LAG H2S SCRUBBER TELEMETRY & ADSORBENT PROPERTIES ===
  h2sOutletPpm: number; // 18 ppm at 2500 ppm inlet (Column A Lead), 9 ppm (Column B Fresh Lead)
  h2sEfficiencyPct: number; // 99.28%
  betSurfaceAreaM2g: number; // 1,105 m²/g at 950°C
  phPzc: number; // 10.9
  colASaturationPct: number; // 78.4%
  colBSaturationPct: number; // 12.0%
  colAPressureDropMbar: number; // 11.4 mbar (< 15 mbar)
  colBPressureDropMbar: number; // 8.2 mbar
  colATempC: number; // 38.2 °C
  colBTempC: number; // 36.0 °C
  remainingServiceDays: number; // 16 Hari sebelum panen BioSulfur™
  nextRepeatOrderTon: number; // 3.6 Ton
  valveStatusMessage: string;
  autoSwitchTriggered: boolean;

  // === 4. ESG & CARBON ACCOUNTING ===
  singlePksCarbonTco2e: number; // ~1,700 tCO2e/tahun
  totalCarbonReductionTco2e: number; // 42,500 tCO2e/tahun (Skala SOM 25 PKS)
  lcaCarbonIntensityReductionPct: number; // -68.5%
  treeEquivalentCount: number; // 6.8 Juta Pohon

  // === 5. CHART SERIES ===
  tfmKineticSeries: KineticPoint[];
  h2sTelemetrySeries: H2STelemetryPoint[];
  sensitivityData: {
    biocharDose: number; // g/L (0.0 - 4.0)
    methaneYield: number; // L/g VS
    desirability: number; // 0 - 1
    powerMW: number; // MW
    dailyAdditiveCostJuta: number; // Juta Rp/hari internal cost
  }[];
}

/**
 * Core RSM-CCD 2FI + Quadratic Approximation (Yan et al., 2025)
 * Matches HTML-nya broo.html & blueprintdss_kami.txt 100%
 */
export function calculateRSM(biocharDose: number, fiRatio: number, codInlet: number) {
  const doseDiff = biocharDose - 2.0;
  const fiDiff = fiRatio - 0.266;
  const codFactor = 1 - Math.abs(codInlet - 98.77) * 0.0012;

  let yieldVal =
    0.355 -
    0.0375 * doseDiff * doseDiff -
    1.85 * fiDiff * fiDiff +
    0.04 * doseDiff * fiDiff;

  if (biocharDose === 0) {
    yieldVal = 0.205;
  }
  yieldVal = Math.max(0.18, Math.min(0.362, yieldVal * codFactor));

  const desirability = Math.max(
    0.42,
    Math.min(0.94, (yieldVal / 0.355) * 0.94)
  );

  return { yieldVal, desirability };
}

export const runBioTrapSimulation = (params: {
  pomeMode?: PomeMode;
  tbsCapacity: number;
  codInlet: number;
  biocharDose: number;
  fiRatio: number;
  h2sInlet: number;
  pyrolysisTemp?: number;
  isColumnALead?: boolean;
  pksScaleCount?: number;
}): MassBalanceResult => {
  const {
    tbsCapacity,
    codInlet,
    biocharDose,
    fiRatio,
    h2sInlet,
    pyrolysisTemp = 950,
    isColumnALead = true,
    pksScaleCount = 25,
  } = params;

  // 1. RSM-CCD Calculation
  const { yieldVal, desirability } = calculateRSM(biocharDose, fiRatio, codInlet);
  const yieldBoostPct = +(((yieldVal - 0.205) / 0.205) * 100).toFixed(1);
  const vsRemovalPct = +(82.4 + (yieldVal - 0.205) * 84.6).toFixed(1);
  const lagPhaseDays = biocharDose > 0.2 ? -0.336 : 2.5;

  // 2. Mass & Energy Balance (exact formulas from HTML-nya broo.html + Page 16 PDF)
  const pomeDailyM3 = Math.round(tbsCapacity * 15.55); // 45 * 15.55 = 700 m³/hari
  const pomeHourlyM3 = +(pomeDailyM3 / 24).toFixed(1); // 29.2 m³/jam
  const microBiocharDailyKg = Math.round(pomeDailyM3 * biocharDose); // 1,400 kg/hari at 2.0 g/L
  const tkksDailyTon = Math.round(tbsCapacity * 5.11); // 230 Ton/hari
  const tkksHourlyTon = +(tkksDailyTon / 24).toFixed(1); // 9.6 T/jam
  const pelletDailyTon = +(tbsCapacity * 0.0266).toFixed(2); // 1.20 Ton/hari
  const pelletMonthlyTon = Math.round(pelletDailyTon * 30); // 36 Ton/bulan
  const fertilizerDailyTon = +(tbsCapacity * 0.0533).toFixed(2); // 2.40 Ton/hari
  const fertilizerDailySacks50Kg = Math.round((fertilizerDailyTon * 1000) / 50); // 48 karung 50kg/hari

  const cleanBiomethaneDailyNm3 = Math.round(
    (pomeDailyM3 / 700) * (yieldVal / 0.355) * 14200
  ); // 14,200 Nm³/hari at optimum
  const rawBiogasDailyNm3 = Math.round(cleanBiomethaneDailyNm3 * (14500 / 14200)); // 14,500 Nm³/hari
  const powerMW = +((cleanBiomethaneDailyNm3 / 14200) * 1.2).toFixed(2); // 1.20 MW
  const dailyElectricityKWh = Math.round(powerMW * 1000 * 24);

  // Annual values (330 operating days)
  const opDays = 330;
  const annualPomeM3 = pomeDailyM3 * opDays;
  const annualTkksTon = tkksDailyTon * opDays;
  const annualPelletTon = +(pelletDailyTon * opDays).toFixed(1);
  const annualFertilizerTon = +(fertilizerDailyTon * opDays).toFixed(1);
  const annualBiomethaneNm3 = cleanBiomethaneDailyNm3 * opDays;

  // 3. Pyrolysis Temp effect on BET Surface Area & H2S Scrubbing
  // Optimum 950°C -> BET = 1,105 m²/g, pH_PZC = 10.9
  const tempDiff = Math.abs(pyrolysisTemp - 950);
  const betSurfaceAreaM2g = Math.round(Math.max(680, 1105 - tempDiff * 1.4));
  const phPzc = +(Math.max(8.8, Math.min(11.2, 10.9 - (950 - pyrolysisTemp) * 0.006))).toFixed(1);
  const betEfficiencyFactor = 1105 / betSurfaceAreaM2g;

  const baseH2sOut = Math.max(
    8,
    Math.round((h2sInlet / 2500) * (isColumnALead ? 18 : 9) * betEfficiencyFactor)
  );
  const h2sOutletPpm = baseH2sOut;
  const h2sEfficiencyPct = +(((h2sInlet - h2sOutletPpm) / h2sInlet) * 100).toFixed(2);

  const colASaturationPct = isColumnALead
    ? +(Math.min(96.5, 78.4 * (h2sInlet / 2500) * 0.9 + 7.8)).toFixed(1)
    : 94.2; // Being harvested
  const colBSaturationPct = isColumnALead ? 12.0 : +(12.0 + (h2sInlet / 2500) * 4.5).toFixed(1);

  const colAPressureDropMbar = isColumnALead
    ? +(11.4 * (tbsCapacity / 45) * 0.3 + 8.0).toFixed(1)
    : 2.1;
  const colBPressureDropMbar = isColumnALead
    ? 8.2
    : +(8.2 * (tbsCapacity / 45) * 0.3 + 5.8).toFixed(1);

  const colATempC = isColumnALead ? 38.2 : 31.5;
  const colBTempC = isColumnALead ? 36.0 : 37.8;

  const remainingServiceDays = Math.max(
    5,
    Math.round(16 * (2500 / h2sInlet) * (45 / tbsCapacity))
  );
  const nextRepeatOrderTon = +(pelletDailyTon * 3.0).toFixed(1); // 3.6 Ton batch

  const autoSwitchTriggered =
    h2sOutletPpm >= BIOTRAP_CONSTANTS.VALVE_SWITCH_TRIGGER_PPM ||
    colAPressureDropMbar >= BIOTRAP_CONSTANTS.MAX_PRESSURE_DROP_MBAR;

  const valveStatusMessage = isColumnALead
    ? `Mode: Kolom A (Lead • Active) → Kolom B (Polishing/Lag). Sisa umur pakai Kolom A: ${remainingServiceDays} Hari sebelum panen BioSulfur™.`
    : `Mode VALVE SWITCHED: Aliran utama dialihkan ke Kolom B (Fresh Pelet). Kolom A sedang dipanen menjadi pupuk BioSulfur™ tanpa menghentikan genset ${powerMW.toFixed(2)} MW!`;

  // 4. Smart Dosing Advisor Logic (exact match with HTML-nya broo.html)
  let advisorStatus: "OPTIMAL" | "UNDER_DOSING" | "SUB_OPTIMAL" = "OPTIMAL";
  let advisorTitle = `KONDISI OPTIMAL (Desirability ${desirability.toFixed(3)})`;
  let advisorMessage = `Injeksi mikro-biochar ${biocharDose.toFixed(2)} g/L (10–500 µm) memfasilitasi mekanisme DIET secara maksimal, meningkatkan biometana +${yieldBoostPct}% tanpa fase tunda (λ = -0.336 d).`;

  if (Math.abs(biocharDose - 2.0) <= 0.3 && Math.abs(fiRatio - 0.266) <= 0.03) {
    advisorStatus = "OPTIMAL";
    advisorTitle = `KONDISI OPTIMAL (Desirability ${desirability.toFixed(3)})`;
    advisorMessage = `Injeksi mikro-biochar ${biocharDose.toFixed(2)} g/L (10–500 µm) memfasilitasi mekanisme DIET bakteri-arkea secara maksimal, meningkatkan biometana +${yieldBoostPct}% tanpa gejala inhibisi asam volatil (VFA).`;
  } else if (biocharDose < 1.5) {
    advisorStatus = "UNDER_DOSING";
    advisorTitle = "PERINGATAN UNDER-DOSING";
    advisorMessage = `Dosis biochar ${biocharDose.toFixed(2)} g/L belum mencukupi kapasitas koloni pori honeycomb (5–8 µm). Tingkatkan menuju 2.00 g/L untuk memulihkan konduktivitas DIET.`;
  } else {
    advisorStatus = "SUB_OPTIMAL";
    advisorTitle = "PERINGATAN OVER-DOSING / SUB-OPTIMAL";
    advisorMessage = `Dosis di atas titik jenuh (>2.5 g/L) atau deviasi rasio FI (${fiRatio.toFixed(3)}) menurunkan efisiensi pengadukan reaktor mesofilik. Klik "Set Optimum (RSM-CCD)" untuk kalibrasi otomatis.`;
  }

  // 5. ESG & Carbon Reduction (42,500 tCO2e/tahun at 45 T/jam, 0.355 yield, 25 PKS SOM)
  const scaleFactorPks = (tbsCapacity / 45) * (yieldVal / 0.355);
  const singlePksCarbonTco2e = Math.round(1700 * scaleFactorPks);
  const totalCarbonReductionTco2e = Math.round(
    singlePksCarbonTco2e * pksScaleCount
  );
  const treeEquivalentCount = Math.round(
    (totalCarbonReductionTco2e / 42500) * 6_800_000
  );

  // 6. TFM Kinetic Curve Series (16 points: Hari 0 to Hari 30)
  const kRate = biocharDose > 0 ? 0.26 : 0.14;
  const tfmKineticSeries: KineticPoint[] = Array.from({ length: 16 }, (_, i) => {
    const t = i * 2;
    const catalyzed = +(
      yieldVal *
      (1 - Math.exp(-kRate * (t + 0.336)))
    ).toFixed(3);
    const control = +(
      0.205 *
      (1 - Math.exp(-0.14 * Math.max(0, t - 2.5)))
    ).toFixed(3);
    return {
      dayLabel: `Hari ${t}`,
      day: t,
      catalyzedYield: catalyzed,
      controlYield: control,
    };
  });

  // 7. H2S Telemetry Series (24 Hours Live)
  const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00 (Live)"];
  const offsets = [-4, -3, -2, -1, 0, 0, 0];
  const h2sTelemetrySeries: H2STelemetryPoint[] = hours.map((hourLabel, idx) => ({
    hourLabel,
    outletPpm: Math.max(5, h2sOutletPpm + offsets[idx]),
    safeLimitPpm: 50,
    inletPpm: h2sInlet,
  }));

  // 8. Sensitivity Analysis Series (Biochar Dose 0.0 to 4.0 g/L)
  const dosePoints = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];
  const sensitivityData = dosePoints.map((d) => {
    const rsm = calculateRSM(d, fiRatio, codInlet);
    const simBiogas = (pomeDailyM3 / 700) * (rsm.yieldVal / 0.355) * 14200;
    const simMW = +((simBiogas / 14200) * 1.2).toFixed(2);
    // Internal marginal cost of micro-biochar preparation (Rp 1.500/kg internal waste steam)
    const dailyCostJuta = +((pomeDailyM3 * d * 1500) / 1_000_000).toFixed(2);
    return {
      biocharDose: d,
      methaneYield: +rsm.yieldVal.toFixed(3),
      desirability: +rsm.desirability.toFixed(3),
      powerMW: simMW,
      dailyAdditiveCostJuta: dailyCostJuta,
    };
  });

  return {
    tbsCapacityTonPerHour: tbsCapacity,
    codInletGpl: codInlet,
    biocharDoseGpl: biocharDose,
    fiRatio,
    h2sInletPpm: h2sInlet,
    pyrolysisTempC: pyrolysisTemp,
    isColumnALead,
    pksScaleCount,
    methaneYieldLgVS: +yieldVal.toFixed(3),
    yieldBoostPct,
    desirabilityRSM: +desirability.toFixed(3),
    vsRemovalPct,
    lagPhaseDays,
    advisorStatus,
    advisorTitle,
    advisorMessage,
    pomeDailyM3,
    pomeHourlyM3,
    microBiocharDailyKg,
    tkksDailyTon,
    tkksHourlyTon,
    pelletDailyTon,
    pelletMonthlyTon,
    fertilizerDailyTon,
    fertilizerDailySacks50Kg,
    rawBiogasDailyNm3,
    cleanBiomethaneDailyNm3,
    powerMW,
    dailyElectricityKWh,
    annualPomeM3,
    annualTkksTon,
    annualPelletTon,
    annualFertilizerTon,
    annualBiomethaneNm3,
    h2sOutletPpm,
    h2sEfficiencyPct,
    betSurfaceAreaM2g,
    phPzc,
    colASaturationPct,
    colBSaturationPct,
    colAPressureDropMbar,
    colBPressureDropMbar,
    colATempC,
    colBTempC,
    remainingServiceDays,
    nextRepeatOrderTon,
    valveStatusMessage,
    autoSwitchTriggered,
    singlePksCarbonTco2e,
    totalCarbonReductionTco2e,
    lcaCarbonIntensityReductionPct: 68.5,
    treeEquivalentCount,
    tfmKineticSeries,
    h2sTelemetrySeries,
    sensitivityData,
  };
};
