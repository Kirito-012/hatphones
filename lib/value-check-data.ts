export type Brand = "Apple" | "Samsung" | "Google" | "OnePlus";

export interface PhoneModel {
  name: string;
  mrp: number; // CAD, launch MSRP
  storage: string[];
}

export const BRANDS: Brand[] = ["Apple", "Samsung", "Google", "OnePlus"];

export const PHONE_DATA: Record<Brand, PhoneModel[]> = {
  Apple: [
    // iPhone 16 series
    { name: "iPhone 16 Pro Max", mrp: 950, storage: ["256GB", "512GB", "1TB"] },
    { name: "iPhone 16 Pro", mrp: 800, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "iPhone 16 Plus", mrp: 700, storage: ["128GB", "256GB", "512GB"] },
    { name: "iPhone 16", mrp: 600, storage: ["128GB", "256GB", "512GB"] },
    // iPhone 15 series
    { name: "iPhone 15 Pro Max", mrp: 850, storage: ["256GB", "512GB", "1TB"] },
    { name: "iPhone 15 Pro", mrp: 700, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "iPhone 15 Plus", mrp: 600, storage: ["128GB", "256GB", "512GB"] },
    { name: "iPhone 15", mrp: 500, storage: ["128GB", "256GB", "512GB"] },
    // iPhone 14 series
    { name: "iPhone 14 Pro Max", mrp: 750, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "iPhone 14 Pro", mrp: 650, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "iPhone 14 Plus", mrp: 550, storage: ["128GB", "256GB", "512GB"] },
    { name: "iPhone 14", mrp: 450, storage: ["128GB", "256GB", "512GB"] },
    // iPhone 13 series
    { name: "iPhone 13 Pro Max", mrp: 650, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "iPhone 13 Pro", mrp: 550, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "iPhone 13", mrp: 400, storage: ["128GB", "256GB", "512GB"] },
    { name: "iPhone 13 mini", mrp: 350, storage: ["128GB", "256GB", "512GB"] },
    // iPhone 12 series
    { name: "iPhone 12 Pro Max", mrp: 500, storage: ["128GB", "256GB", "512GB"] },
    { name: "iPhone 12 Pro", mrp: 430, storage: ["128GB", "256GB", "512GB"] },
    { name: "iPhone 12", mrp: 320, storage: ["64GB", "128GB", "256GB"] },
    { name: "iPhone 12 mini", mrp: 270, storage: ["64GB", "128GB", "256GB"] },
    // iPhone 11 series
    { name: "iPhone 11 Pro Max", mrp: 400, storage: ["64GB", "256GB", "512GB"] },
    { name: "iPhone 11 Pro", mrp: 350, storage: ["64GB", "256GB", "512GB"] },
    { name: "iPhone 11", mrp: 250, storage: ["64GB", "128GB", "256GB"] },
    // iPhone XS series
    { name: "iPhone XS Max", mrp: 300, storage: ["64GB", "256GB", "512GB"] },
    { name: "iPhone XS", mrp: 250, storage: ["64GB", "256GB", "512GB"] },
    { name: "iPhone XR", mrp: 200, storage: ["64GB", "128GB", "256GB"] },
    // iPhone X
    { name: "iPhone X", mrp: 180, storage: ["64GB", "256GB"] },
    // iPhone 8 series
    { name: "iPhone 8 Plus", mrp: 160, storage: ["64GB", "128GB", "256GB"] },
    { name: "iPhone 8", mrp: 130, storage: ["64GB", "128GB", "256GB"] },
    // iPhone SE series
    { name: "iPhone SE (3rd Gen)", mrp: 220, storage: ["64GB", "128GB", "256GB"] },
    { name: "iPhone SE (2nd Gen)", mrp: 160, storage: ["64GB", "128GB", "256GB"] },
  ],
  Samsung: [
    // S25 series
    { name: "Galaxy S25 Ultra", mrp: 950, storage: ["256GB", "512GB", "1TB"] },
    { name: "Galaxy S25+", mrp: 720, storage: ["256GB", "512GB"] },
    { name: "Galaxy S25", mrp: 570, storage: ["128GB", "256GB", "512GB"] },
    // S24 series
    { name: "Galaxy S24 Ultra", mrp: 900, storage: ["256GB", "512GB", "1TB"] },
    { name: "Galaxy S24+", mrp: 670, storage: ["256GB", "512GB"] },
    { name: "Galaxy S24", mrp: 540, storage: ["128GB", "256GB"] },
    { name: "Galaxy S24 FE", mrp: 420, storage: ["128GB", "256GB"] },
    // S23 series
    { name: "Galaxy S23 Ultra", mrp: 800, storage: ["256GB", "512GB", "1TB"] },
    { name: "Galaxy S23+", mrp: 580, storage: ["256GB", "512GB"] },
    { name: "Galaxy S23", mrp: 460, storage: ["128GB", "256GB"] },
    { name: "Galaxy S23 FE", mrp: 350, storage: ["128GB", "256GB"] },
    // S22 series
    { name: "Galaxy S22 Ultra", mrp: 700, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "Galaxy S22+", mrp: 500, storage: ["128GB", "256GB"] },
    { name: "Galaxy S22", mrp: 390, storage: ["128GB", "256GB"] },
    // S21 series
    { name: "Galaxy S21 Ultra", mrp: 580, storage: ["128GB", "256GB", "512GB"] },
    { name: "Galaxy S21+", mrp: 430, storage: ["128GB", "256GB"] },
    { name: "Galaxy S21", mrp: 340, storage: ["128GB", "256GB"] },
    { name: "Galaxy S21 FE", mrp: 280, storage: ["128GB", "256GB"] },
    // S20 series
    { name: "Galaxy S20 Ultra", mrp: 420, storage: ["128GB", "256GB"] },
    { name: "Galaxy S20+", mrp: 320, storage: ["128GB", "256GB"] },
    { name: "Galaxy S20", mrp: 260, storage: ["128GB"] },
    { name: "Galaxy S20 FE", mrp: 220, storage: ["128GB", "256GB"] },
    // Z Fold series (popular in Canada)
    { name: "Galaxy Z Fold 6", mrp: 1100, storage: ["256GB", "512GB", "1TB"] },
    { name: "Galaxy Z Fold 5", mrp: 900, storage: ["256GB", "512GB", "1TB"] },
    { name: "Galaxy Z Fold 4", mrp: 700, storage: ["256GB", "512GB", "1TB"] },
    // Z Flip series (popular in Canada)
    { name: "Galaxy Z Flip 6", mrp: 650, storage: ["256GB", "512GB"] },
    { name: "Galaxy Z Flip 5", mrp: 520, storage: ["256GB", "512GB"] },
    { name: "Galaxy Z Flip 4", mrp: 400, storage: ["128GB", "256GB", "512GB"] },
    { name: "Galaxy Z Flip 3", mrp: 300, storage: ["128GB", "256GB"] },
    // A series (widely used mid-range in Canada)
    { name: "Galaxy A55", mrp: 320, storage: ["128GB", "256GB"] },
    { name: "Galaxy A54", mrp: 270, storage: ["128GB", "256GB"] },
    { name: "Galaxy A35", mrp: 250, storage: ["128GB", "256GB"] },
    { name: "Galaxy A34", mrp: 210, storage: ["128GB", "256GB"] },
    { name: "Galaxy A53", mrp: 200, storage: ["128GB", "256GB"] },
    { name: "Galaxy A15", mrp: 130, storage: ["128GB"] },
    { name: "Galaxy A14", mrp: 110, storage: ["64GB", "128GB"] },
  ],
  Google: [
    // Pixel 9 series
    { name: "Pixel 9 Pro Fold", mrp: 1200, storage: ["256GB", "512GB"] },
    { name: "Pixel 9 Pro XL", mrp: 800, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "Pixel 9 Pro", mrp: 650, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "Pixel 9", mrp: 520, storage: ["128GB", "256GB"] },
    // Pixel 8 series
    { name: "Pixel 8 Pro", mrp: 600, storage: ["128GB", "256GB", "512GB", "1TB"] },
    { name: "Pixel 8a", mrp: 400, storage: ["128GB", "256GB"] },
    { name: "Pixel 8", mrp: 460, storage: ["128GB", "256GB"] },
    // Pixel 7 series
    { name: "Pixel 7 Pro", mrp: 500, storage: ["128GB", "256GB", "512GB"] },
    { name: "Pixel 7a", mrp: 300, storage: ["128GB"] },
    { name: "Pixel 7", mrp: 380, storage: ["128GB", "256GB"] },
    // Pixel 6 series
    { name: "Pixel 6 Pro", mrp: 350, storage: ["128GB", "256GB", "512GB"] },
    { name: "Pixel 6a", mrp: 220, storage: ["128GB"] },
    { name: "Pixel 6", mrp: 280, storage: ["128GB", "256GB"] },
  ],
  OnePlus: [
    { name: "OnePlus 12", mrp: 550, storage: ["256GB", "512GB"] },
    { name: "OnePlus 11", mrp: 430, storage: ["128GB", "256GB"] },
    { name: "OnePlus 12R", mrp: 330, storage: ["128GB", "256GB"] },
    { name: "OnePlus Nord 4", mrp: 260, storage: ["128GB", "256GB"] },
    { name: "OnePlus Nord CE4", mrp: 210, storage: ["128GB", "256GB"] },
  ],
};

// ─── Condition ───────────────────────────────────────────────────────────────

export type Condition = "like_new" | "excellent" | "good" | "poor";

export const CONDITIONS: { value: Condition; label: string; description: string }[] = [
  {
    value: "like_new",
    label: "Like New",
    description: "Barely used. No scratches, original accessories, flawless screen.",
  },
  {
    value: "excellent",
    label: "Excellent",
    description: "Light use. Minor wear, no visible scratches on screen.",
  },
  {
    value: "good",
    label: "Good",
    description: "Normal use. Some light scratches, small scuffs on body.",
  },
  {
    value: "poor",
    label: "Poor",
    description: "Heavy use. Visible damage, deep scratches, or major scuffs.",
  },
];

export const CONDITION_MULTIPLIERS: Record<Condition, number> = {
  like_new: 1.0,
  excellent: 0.9,
  good: 0.75,
  poor: 0.55,
};

// ─── Battery health (Apple only) ─────────────────────────────────────────────

export type BatteryHealth = "90_plus" | "80_89" | "under_80";

export const BATTERY_HEALTH_OPTIONS: { value: BatteryHealth; label: string; sublabel: string }[] = [
  { value: "90_plus", label: "90% or above", sublabel: "Great shape" },
  { value: "80_89", label: "80 – 89%", sublabel: "Decent" },
  { value: "under_80", label: "Below 80%", sublabel: "Needs replacement" },
];

export const BATTERY_HEALTH_DEDUCTIONS: Record<BatteryHealth, number> = {
  "90_plus": 0,
  "80_89": 0.05,
  under_80: 0.1,
};

// ─── Yes/No questions ─────────────────────────────────────────────────────────

export interface Question {
  id: string;
  text: string;
  deduction: number; // fraction deducted if answer is false
}

export const QUESTIONS: Question[] = [
  { id: "screen_crack", text: "Is the screen free of cracks?", deduction: 0.1 },
  { id: "screen_original", text: "Is the screen original (not replaced)?", deduction: 0.1 },
  { id: "battery_original", text: "Is the battery original (not replaced)?", deduction: 0.08 },
  { id: "speaker", text: "Is the speaker working fine?", deduction: 0.05 },
  { id: "charging_port", text: "Is the charging port working fine?", deduction: 0.05 },
  { id: "cameras", text: "Are all cameras working fine?", deduction: 0.07 },
  { id: "biometrics", text: "Is Face ID / fingerprint working fine?", deduction: 0.06 },
  { id: "never_repaired", text: "Has your phone never been repaired?", deduction: 0.07 },
];

// ─── Calculation ──────────────────────────────────────────────────────────────

// Base price = 62% of MRP (i.e., ~38% below MRP) for the base storage tier
const BASE_PRICE_FACTOR = 0.62;
// Each storage tier above the base adds this premium
const STORAGE_TIER_PREMIUM = 0.08;
// Final range spread: ±5%
const RANGE_SPREAD = 0.05;

export interface ValueCheckInputs {
  brand: Brand;
  modelName: string;
  storage: string;
  condition: Condition;
  batteryHealth?: BatteryHealth;
  answers: Record<string, boolean>; // questionId → true (yes) / false (no)
}

export function calculateValue(inputs: ValueCheckInputs): {
  low: number;
  high: number;
  mid: number;
} {
  const models = PHONE_DATA[inputs.brand];
  const model = models.find((m) => m.name === inputs.modelName);
  if (!model) return { low: 0, high: 0, mid: 0 };

  // Storage premium: each tier above base adds 8%
  const storageIndex = model.storage.indexOf(inputs.storage);
  const storageFactor = storageIndex > 0 ? 1 + storageIndex * STORAGE_TIER_PREMIUM : 1;

  let value = model.mrp * BASE_PRICE_FACTOR * storageFactor;

  // Condition
  value *= CONDITION_MULTIPLIERS[inputs.condition];

  // Battery health (Apple only)
  if (inputs.brand === "Apple" && inputs.batteryHealth) {
    value *= 1 - BATTERY_HEALTH_DEDUCTIONS[inputs.batteryHealth];
  }

  // Yes/No questions — multiplicative deductions
  for (const q of QUESTIONS) {
    if (inputs.answers[q.id] === false) {
      value *= 1 - q.deduction;
    }
  }

  const mid = Math.round(value);
  const low = Math.round(value * (1 - RANGE_SPREAD));
  const high = Math.round(value * (1 + RANGE_SPREAD));

  return { low, high, mid };
}
