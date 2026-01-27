export const AI_TECH_CONSTANTS = {
    USER_IDEAL_TIME : 1,
    USER_TIMOUT: 0.5
}

export const STEPS_DATA = [
    { id: 1, stepperNumber: 1, stepperText: "Baseline (Client Profile on file)" },
    { id: 2, stepperNumber: 2, stepperText: "CAF Requirements Assessment" },
    { id: 3, stepperNumber: 3, stepperText: "Connected Parties" },
    { id: 4, stepperNumber: 4, stepperText: "Screening Assessment" },
    { id: 5, stepperNumber: 5, stepperText: "Finalize Client Attestation Form (CAF)" },
    { id: 6, stepperNumber: 6, stepperText: "Submit Review" }
];

export const DB_CONFIG = {
  NAME: 'CAF_Storage_2026',
  VERSION: 2, // Increment only when changing structure (adding stores/indexes)
  STORES: {
    LARGE_DATA: 'large_datasets',
    SESSION_META: 'session_meta'
  }
};

export const TABS = [
    { id: 'profile', label: 'Client Profile' },
    { id: 'products', label: `Products` },
    { id: 'parties', label: 'Connected Parties' },
];