import { create } from "zustand";
import { PomeMode, POME_MODES, DEFAULT_POME_PROFILES } from "@/lib/simulation/constants";
import { runBioTrapSimulation, MassBalanceResult } from "@/lib/simulation/massBalance";
import { calculateBioTrapEconomics, EconomicResult } from "@/lib/simulation/economics";

interface SimulationStore {
  // Inputs (matching HTML-nya broo.html & blueprintdss_kami.txt)
  pomeMode: PomeMode;
  tbsCapacity: number; // Ton/jam (30 - 60, default 45)
  codInlet: number; // g/L (65 - 115, default 98.77)
  biocharDose: number; // g/L (0.0 - 4.0, default 2.0)
  fiRatio: number; // Ratio (0.150 - 0.450, default 0.266)
  h2sInlet: number; // ppm (1500 - 4000, default 2500)
  pyrolysisTemp: number; // °C (700 - 1000, default 950)
  isColumnALead: boolean; // Lead-Lag Valve state
  pksScaleCount: number; // 1 - 25 PKS (default 25 SOM)

  // Results
  isSimulating: boolean;
  massBalanceResult: MassBalanceResult;
  economicResults: EconomicResult;

  // Actions
  setPomeMode: (mode: PomeMode) => void;
  setParams: (params: Partial<SimulationStore>) => void;
  toggleLeadLag: () => void;
  resetOptimal: () => void;
  runSimulation: () => Promise<void>;
}

const initialMb = runBioTrapSimulation({
  pomeMode: POME_MODES.STANDARD_DIET,
  tbsCapacity: 45,
  codInlet: 98.77,
  biocharDose: 2.0,
  fiRatio: 0.266,
  h2sInlet: 2500,
  pyrolysisTemp: 950,
  isColumnALead: true,
  pksScaleCount: 25,
});

const initialEcon = calculateBioTrapEconomics(initialMb);

const recomputeState = (state: SimulationStore, overrides: Partial<SimulationStore> = {}) => {
  const next = { ...state, ...overrides };
  const mb = runBioTrapSimulation({
    pomeMode: next.pomeMode,
    tbsCapacity: next.tbsCapacity,
    codInlet: next.codInlet,
    biocharDose: next.biocharDose,
    fiRatio: next.fiRatio,
    h2sInlet: next.h2sInlet,
    pyrolysisTemp: next.pyrolysisTemp,
    isColumnALead: next.isColumnALead,
    pksScaleCount: next.pksScaleCount,
  });
  const econ = calculateBioTrapEconomics(mb);
  return {
    ...overrides,
    massBalanceResult: mb,
    economicResults: econ,
  };
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  pomeMode: POME_MODES.STANDARD_DIET,
  tbsCapacity: 45,
  codInlet: 98.77,
  biocharDose: 2.0,
  fiRatio: 0.266,
  h2sInlet: 2500,
  pyrolysisTemp: 950,
  isColumnALead: true,
  pksScaleCount: 25,

  isSimulating: false,
  massBalanceResult: initialMb,
  economicResults: initialEcon,

  setPomeMode: (mode) =>
    set((state) => {
      const profile = DEFAULT_POME_PROFILES[mode];
      return recomputeState(state, {
        pomeMode: mode,
        codInlet: profile.codDefault,
        h2sInlet: profile.h2sDefault,
      });
    }),

  setParams: (params) =>
    set((state) => recomputeState(state, params)),

  toggleLeadLag: () =>
    set((state) =>
      recomputeState(state, { isColumnALead: !state.isColumnALead })
    ),

  resetOptimal: () =>
    set((state) =>
      recomputeState(state, {
        pomeMode: POME_MODES.STANDARD_DIET,
        tbsCapacity: 45,
        codInlet: 98.77,
        biocharDose: 2.0,
        fiRatio: 0.266,
        h2sInlet: 2500,
        pyrolysisTemp: 950,
        isColumnALead: true,
        pksScaleCount: 25,
      })
    ),

  runSimulation: async () => {
    set({ isSimulating: true });
    await new Promise((resolve) => setTimeout(resolve, 450));
    const state = get();
    set({
      isSimulating: false,
      ...recomputeState(state),
    });
  },
}));
