"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ChevronLeft, ChevronDown, Check, RotateCcw, ArrowRight, Search, ChevronRight, X, Send, ImagePlus } from "lucide-react";
import {
  BRANDS,
  PHONE_DATA,
  CONDITIONS,
  BATTERY_HEALTH_OPTIONS,
  QUESTIONS,
  calculateValue,
  type Brand,
  type Condition,
  type BatteryHealth,
  type ValueCheckInputs,
} from "../../lib/value-check-data";

type Step = "brand" | "model" | "storage" | "condition" | "battery" | "questions" | "result";
const STEP_ORDER: Step[] = ["brand", "model", "storage", "condition", "battery", "questions", "result"];
const STEP_LABELS: Record<Step, string> = {
  brand: "Brand", model: "Model", storage: "Storage",
  condition: "Condition", battery: "Battery", questions: "Details", result: "Result",
};

const BRAND_GRADIENT: Record<Brand, string> = {
  Apple:   "linear-gradient(145deg, #2a2a2e 0%, #1a1a1c 100%)",
  Samsung: "linear-gradient(145deg, #1428A0 0%, #0f1f85 100%)",
  Google:  "linear-gradient(145deg, #ea4335 0%, #4285f4 100%)",
  OnePlus: "linear-gradient(145deg, #d4001a 0%, #1a0008 100%)",
};

const BRAND_LOGO: Record<Brand, React.ReactNode> = {
  Apple: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/90">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  Samsung: <span className="text-white/90 font-black text-3xl tracking-tight leading-none">S</span>,
  Google:  <span className="text-white/90 font-black text-3xl tracking-tight leading-none">G</span>,
  OnePlus: <span className="text-white/90 font-black text-2xl tracking-tight leading-none">1+</span>,
};

const BRAND_LOGO_MONO: Record<Brand, React.ReactNode> = {
  Apple: (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  Samsung: <span className="font-black text-2xl tracking-tight leading-none">S</span>,
  Google:  <span className="font-black text-2xl tracking-tight leading-none">G</span>,
  OnePlus: <span className="font-black text-xl tracking-tight leading-none">1+</span>,
};

const CONDITION_STYLE: Record<Condition, { ring: string; dot: string; tag: string }> = {
  like_new:  { ring: "ring-emerald-400 dark:ring-emerald-500", dot: "bg-emerald-500", tag: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" },
  excellent: { ring: "ring-blue-400 dark:ring-blue-500",       dot: "bg-blue-500",    tag: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"             },
  good:      { ring: "ring-amber-400 dark:ring-amber-500",     dot: "bg-amber-500",   tag: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"         },
  poor:      { ring: "ring-red-400 dark:ring-red-500",         dot: "bg-red-500",     tag: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400"                 },
};

const slide = {
  enter:  { x: 20, opacity: 0 },
  center: { x: 0,  opacity: 1, transition: { duration: 0.18, ease: "easeOut" as const } },
  exit:   { x: -20, opacity: 0, transition: { duration: 0.12, ease: "easeIn" as const } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function ValueCheck() {
  const [step, setStep] = useState<Step>("brand");
  const [brand, setBrand] = useState<Brand | null>(null);
  const [modelName, setModelName] = useState<string | null>(null);
  const [modelSearch, setModelSearch] = useState("");
  const [storage, setStorage] = useState<string | null>(null);
  const [condition, setCondition] = useState<Condition | null>(null);
  const [batteryHealth, setBatteryHealth] = useState<BatteryHealth | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  // Send-details modal state
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [sendStatus, setSendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [photos, setPhotos] = useState<Array<{ file: File; preview: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke object URLs when modal closes to avoid memory leaks
  useEffect(() => {
    if (!sendModalOpen) {
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
      setPhotos([]);
    }
  }, [sendModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const visibleSteps = STEP_ORDER.filter((s) => {
    if (s === "battery") return brand === "Apple";
    return true;
  });
  const stepsNoResult = visibleSteps.filter((s) => s !== "result");
  const currentIdx = visibleSteps.indexOf(step);

  function advance(next: Step) { setStep(next); }
  function goBack() {
    const i = visibleSteps.indexOf(step);
    if (i > 0) setStep(visibleSteps[i - 1]);
  }
  function reset() {
    setBrand(null); setModelName(null); setModelSearch(""); setStorage(null);
    setCondition(null); setBatteryHealth(null); setAnswers({}); setStep("brand");
  }

  const result =
    step === "result" && brand && modelName && storage && condition
      ? calculateValue({ brand, modelName, storage, condition, batteryHealth: batteryHealth ?? undefined, answers } as ValueCheckInputs)
      : null;

  // ── Brand ──────────────────────────────────────────────────────────────────

  function renderBrand() {
    return (
      <div className="flex flex-col gap-6">
        <Q title="What brand is your phone?" />
        <div className="grid grid-cols-2 gap-3">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => {
                setBrand(b); setModelName(null); setStorage(null);
                setCondition(null); setBatteryHealth(null); setAnswers({}); setModelSearch("");
                advance("model");
              }}
              className="flex flex-col items-center justify-center gap-2.5 h-32 sm:h-36 rounded-2xl border-2 border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-800/60 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-150 cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-200">
                {BRAND_LOGO_MONO[b]}
              </div>
              <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{b}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Model ──────────────────────────────────────────────────────────────────

  function renderModel() {
    if (!brand) return null;
    const models = PHONE_DATA[brand];
    const filtered = modelSearch.trim()
      ? models.filter((m) => m.name.toLowerCase().includes(modelSearch.toLowerCase()))
      : models;

    return (
      <div className="flex flex-col gap-4">
        <Q title={`Which ${brand} model?`} />
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search model…"
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
          />
        </div>
        <div className="flex flex-col max-h-[360px] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-white/[0.08] divide-y divide-zinc-100 dark:divide-white/[0.05] bg-white dark:bg-zinc-900/60">
          {filtered.length === 0
            ? <p className="text-sm text-zinc-400 text-center py-10">No models found.</p>
            : filtered.map((m) => (
              <button
                key={m.name}
                onClick={() => { setModelName(m.name); setStorage(null); advance("storage"); }}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{m.name}</span>
                <ChevronRight size={14} className="text-zinc-300 dark:text-zinc-600 group-hover:text-indigo-500 transition-colors shrink-0" />
              </button>
            ))
          }
        </div>
      </div>
    );
  }

  // ── Storage ────────────────────────────────────────────────────────────────

  function renderStorage() {
    if (!brand || !modelName) return null;
    const model = PHONE_DATA[brand].find((m) => m.name === modelName)!;
    return (
      <div className="flex flex-col gap-5">
        <Q title="How much storage?" hint="Settings → General → About → Capacity" />
        <div className="grid grid-cols-2 gap-2.5">
          {model.storage.map((s) => (
            <button
              key={s}
              onClick={() => { setStorage(s); advance("condition"); }}
              className={`py-5 rounded-2xl font-bold text-base transition-all duration-150 cursor-pointer border-2 ${
                storage === s
                  ? "border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:border-indigo-400 hover:bg-white dark:hover:bg-zinc-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Condition ──────────────────────────────────────────────────────────────

  function renderCondition() {
    const needsAssessment = condition === "good" || condition === "poor";
    return (
      <div className="flex flex-col gap-5">
        <Q title="What's the condition?" hint="Be honest — it leads to a more accurate estimate" />
        <div className="flex flex-col gap-2">
          {CONDITIONS.map((c) => {
            const s = CONDITION_STYLE[c.value];
            const active = condition === c.value;
            return (
              <button
                key={c.value}
                onClick={() => {
                  setCondition(c.value);
                  if (c.value !== "good" && c.value !== "poor") {
                    advance(brand === "Apple" ? "battery" : "questions");
                  }
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-150 cursor-pointer text-left ${
                  active
                    ? `ring-2 ${s.ring} border-transparent bg-white dark:bg-zinc-900 shadow-sm`
                    : "border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800/70 hover:border-zinc-300 dark:hover:border-white/15"
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${active ? s.dot : "bg-zinc-300 dark:bg-zinc-600"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">{c.label}</span>
                    {active && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.tag}`}>Selected</span>}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{c.description}</p>
                </div>
                {active && <Check size={15} className="shrink-0 text-indigo-500" />}
              </button>
            );
          })}
        </div>

        {needsAssessment && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 px-5 py-5 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <p className="font-bold text-sm text-amber-800 dark:text-amber-300">In-person assessment needed</p>
              <p className="text-sm text-amber-700 dark:text-amber-400/80 leading-relaxed">
                Since your phone is in <span className="font-semibold">{condition === "good" ? "good" : "poor"}</span> condition, we can only determine its value after a proper in-store assessment. Bring it in and we&apos;ll give you an honest offer on the spot.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => { window.location.href = "/contact"; }}
                className="w-full py-3 rounded-xl font-bold text-sm text-center transition-colors cursor-pointer"
                style={{ backgroundColor: "#d97706", color: "#ffffff" }}
              >
                Reach out to us
              </button>
              <button
                onClick={reset}
                className="w-full py-3 rounded-xl border border-amber-300 dark:border-amber-500/30 bg-white dark:bg-zinc-900 text-amber-700 dark:text-amber-400 font-bold text-sm hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors cursor-pointer"
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // ── Battery ────────────────────────────────────────────────────────────────

  function renderBattery() {
    const bars: Record<BatteryHealth, number> = { "90_plus": 4, "80_89": 3, "under_80": 1 };
    const barColor: Record<BatteryHealth, string> = {
      "90_plus": "bg-emerald-500", "80_89": "bg-amber-400", "under_80": "bg-red-500",
    };
    return (
      <div className="flex flex-col gap-5">
        <Q title="What's the battery health?" hint="Settings → Battery → Battery Health & Charging" />
        <div className="flex flex-col gap-2">
          {BATTERY_HEALTH_OPTIONS.map((b) => {
            const active = batteryHealth === b.value;
            return (
              <button
                key={b.value}
                onClick={() => { setBatteryHealth(b.value); advance("questions"); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-150 cursor-pointer text-left ${
                  active
                    ? "border-indigo-500 bg-white dark:bg-zinc-900 shadow-sm"
                    : "border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800/70 hover:border-zinc-300 dark:hover:border-white/15"
                }`}
              >
                {/* Battery icon */}
                <div className="relative flex items-center shrink-0">
                  <div className="w-9 h-5 rounded border-2 border-zinc-400 dark:border-zinc-500 flex items-center gap-0.5 px-0.5">
                    {[1,2,3,4].map((n) => (
                      <div key={n} className={`flex-1 h-2.5 rounded-sm ${n <= bars[b.value] ? barColor[b.value] : "bg-zinc-200 dark:bg-zinc-700"}`} />
                    ))}
                  </div>
                  <div className="w-1 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-r-sm ml-px" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">{b.label}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{b.sublabel}</p>
                </div>
                {active && <Check size={15} className="shrink-0 text-indigo-500" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Questions ──────────────────────────────────────────────────────────────

  function renderQuestions() {
    const allAnswered = QUESTIONS.every((q) => q.id in answers);
    return (
      <div className="flex flex-col gap-5">
        <Q title="A few quick checks" hint="Answer all questions to see your estimate" />
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] overflow-hidden divide-y divide-zinc-100 dark:divide-white/[0.05] bg-white dark:bg-zinc-900/60">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="flex items-center gap-3 px-4 sm:px-5 py-4">
              <p className="flex-1 text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug pr-2">
                {q.text}
              </p>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => setAnswers((p) => ({ ...p, [q.id]: true }))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                    answers[q.id] === true
                      ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setAnswers((p) => ({ ...p, [q.id]: false }))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                    answers[q.id] === false
                      ? "bg-red-500 text-white shadow-sm shadow-red-500/25"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          disabled={!allAnswered}
          onClick={() => advance("result")}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          See my estimate <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────────

  function renderResult() {
    if (!result || !brand || !modelName || !storage || !condition) return null;
    const conditionLabel = CONDITIONS.find((c) => c.value === condition)?.label ?? condition;
    const issues = QUESTIONS.filter((q) => answers[q.id] === false);

    return (
      <div className="flex flex-col gap-4">
        {/* Price hero */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg, #3730a3 0%, #6366f1 100%)" }}>
          <div className="px-6 pt-8 pb-6 text-center">
            <p className="text-indigo-300 text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
              Estimated Buy Price
            </p>
            <p className="font-black text-white leading-none" style={{ fontSize: "clamp(2.8rem, 10vw, 3.8rem)" }}>
              ${result.low}
              <span className="text-indigo-300 mx-2" style={{ fontSize: "0.5em" }}>–</span>
              ${result.high}
            </p>
            <p className="text-indigo-300/80 text-xs mt-3 font-medium">Canadian Dollars · Rough estimate</p>
          </div>
          <div className="bg-black/20 px-5 py-3.5 flex flex-wrap gap-1.5 justify-center">
            {[brand, modelName, storage, conditionLabel].map((l) => (
              <span key={l} className="px-2.5 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium">{l}</span>
            ))}
          </div>
        </div>

        {/* Issues breakdown */}
        {issues.length > 0 && (
          <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] overflow-hidden bg-white dark:bg-zinc-900/60">
            <p className="px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-white/[0.05]">
              Deductions applied
            </p>
            {issues.map((q) => (
              <div key={q.id} className="flex items-center justify-between px-5 py-3 border-b last:border-b-0 border-zinc-100 dark:border-white/[0.05]">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 capitalize">
                  {q.text.replace(/^Is the |^Are all /, "").replace(/ working fine\?$/, " issue").replace(/\?$/, "")}
                </p>
                <span className="text-xs font-bold text-red-500 shrink-0 ml-4">−{Math.round(q.deduction * 100)}%</span>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-zinc-400 text-center leading-relaxed">
          Final offer confirmed after in-person inspection. Prices vary with market demand.
        </p>

        {/* CTAs */}
        <button
          onClick={() => { setSendModalOpen(true); setSendStatus("idle"); setSenderName(""); setSenderContact(""); }}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer"
        >
          <Send size={15} /> Send my details to HatPhones
        </button>

        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 mx-auto transition-colors cursor-pointer mt-1"
        >
          <RotateCcw size={12} /> Check another device
        </button>
      </div>
    );
  }

  const stepContent: Record<Step, () => React.ReactNode> = {
    brand: renderBrand, model: renderModel, storage: renderStorage,
    condition: renderCondition, battery: renderBattery,
    questions: renderQuestions, result: renderResult,
  };

  // ── Shell ──────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative w-full h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #09090f 0%, #0f0e24 50%, #131238 100%)" }}
      >
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-25 blur-[100px] pointer-events-none" style={{ background: "radial-gradient(ellipse, #4f46e5, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        {/* Main content — centered in the full screen */}
        <div className="relative flex-1 flex items-center pt-20">
          <div className="container mx-auto max-w-6xl px-6 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

            {/* Left: Copy */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Free · Instant · No Obligation
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6">
                What&apos;s your<br />
                <span className="text-indigo-400">phone worth?</span>
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-md mb-8">
                Answer a few quick questions and get an honest, fair estimate in under 2 minutes. No signup required.
              </p>

              <div className="flex flex-col sm:flex-row gap-y-2.5 gap-x-5 mb-10">
                {[
                  "Backed by real market prices",
                  "Local Medicine Hat store",
                  "No pressure, no commitment",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Check size={13} className="text-indigo-400 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold rounded-2xl transition-colors text-base shadow-xl shadow-indigo-900/50 cursor-pointer"
              >
                Get My Estimate <ArrowRight size={17} />
              </button>
            </div>

            {/* Right: Decorative mock result (desktop only) */}
            <div className="hidden lg:flex flex-col items-center gap-3 shrink-0">
              <div
                className="w-72 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/60"
                style={{ background: "linear-gradient(145deg, #312e81 0%, #4f46e5 100%)", transform: "rotate(2deg)" }}
              >
                <div className="px-6 pt-7 pb-5 text-center">
                  <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">Estimated Buy Price</p>
                  <p className="text-5xl font-black text-white leading-none">$740</p>
                  <p className="text-2xl font-black text-indigo-300 leading-none mt-1">– $820</p>
                  <p className="text-indigo-300/70 text-xs mt-3">Canadian Dollars</p>
                </div>
                <div className="bg-black/25 px-5 py-3.5 flex flex-wrap gap-1.5 justify-center">
                  {["Apple", "iPhone 14 Pro", "128GB", "Excellent"].map((l) => (
                    <span key={l} className="px-2.5 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium">{l}</span>
                  ))}
                </div>
              </div>
              <p className="text-zinc-600 text-xs">Example estimate</p>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative flex flex-col items-center gap-1.5 pb-8 text-zinc-600">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">Scroll to start</p>
          <ChevronDown size={15} className="animate-bounce" />
        </div>
      </section>

      {/* ── Wizard ── */}
      <div id="wizard" className="flex-1 flex flex-col items-center justify-start pt-12 pb-20 px-4">
        <div className="w-full max-w-lg">

          {/* Step indicator */}
          {step !== "result" && (
            <div className="flex items-start mb-7 px-0.5">
              {stepsNoResult.map((s, i) => {
                const done = i < currentIdx;
                const active = i === currentIdx;
                return (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                        done    ? "bg-indigo-600 text-white" :
                        active  ? "bg-indigo-600 text-white ring-[3px] ring-indigo-500/25" :
                                  "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                      }`}>
                        {done ? <Check size={12} strokeWidth={2.5} /> : i + 1}
                      </div>
                      <span className={`text-[10px] font-semibold hidden sm:block leading-none transition-colors ${
                        active ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 dark:text-zinc-600"
                      }`}>
                        {STEP_LABELS[s]}
                      </span>
                    </div>
                    {i < stepsNoResult.length - 1 && (
                      <div className={`flex-1 h-px mx-1.5 mb-4 sm:mb-3.5 transition-colors duration-300 ${
                        done ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-800"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Wizard card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/[0.07] shadow-sm min-h-screen sm:min-h-0">
            {/* Thin progress stripe */}
            {step !== "result" && (
              <div className="h-1 rounded-t-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                  style={{ width: `${(currentIdx / (stepsNoResult.length - 1)) * 100}%` }}
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* Back button */}
              {step !== "brand" && step !== "result" && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 mb-5 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={15} /> Back
                </button>
              )}

              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} variants={slide} initial="enter" animate="center" exit="exit">
                  {stepContent[step]()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      {/* ── Send Details Modal ── */}
      <AnimatePresence>
        {sendModalOpen && result && brand && modelName && storage && condition && (
          <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setSendModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-zinc-900 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-white/[0.07] shrink-0">
                <div>
                  <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-0.5">Sell Inquiry</p>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white leading-tight">Send your details</h3>
                </div>
                <button
                  onClick={() => setSendModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
                {sendStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                      <Check size={28} className="text-emerald-500" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-xl font-black text-zinc-900 dark:text-white mb-1">We got it!</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
                        We&apos;ll review your device details and reach out to arrange a time that works for you.
                      </p>
                    </div>
                    <button
                      onClick={() => setSendModalOpen(false)}
                      className="mt-2 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm cursor-pointer hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Device summary (read-only) */}
                    <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/[0.07] overflow-hidden">
                      <p className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-b border-zinc-200 dark:border-white/[0.07]">
                        Device details
                      </p>
                      <div className="px-4 py-3 flex flex-wrap gap-1.5">
                        {[
                          brand,
                          modelName,
                          storage,
                          CONDITIONS.find((c) => c.value === condition)?.label ?? condition,
                          ...(batteryHealth ? [BATTERY_HEALTH_OPTIONS.find((b) => b.value === batteryHealth)?.label ?? batteryHealth] : []),
                        ].map((chip) => (
                          <span key={chip} className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 text-xs font-semibold">
                            {chip}
                          </span>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-zinc-200 dark:border-white/[0.07] flex items-center justify-between">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Estimate</span>
                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">${result.low} – ${result.high} CAD</span>
                      </div>
                    </div>

                    {/* Photo upload */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          Photos <span className="normal-case font-normal text-zinc-400 dark:text-zinc-500">(optional · up to 5)</span>
                        </label>
                        {photos.length > 0 && (
                          <span className="text-xs text-zinc-400">{photos.length}/5</span>
                        )}
                      </div>

                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const incoming = Array.from(e.target.files ?? []);
                          const slots = 5 - photos.length;
                          const valid = incoming
                            .filter((f) => f.size <= 5 * 1024 * 1024)
                            .slice(0, slots);
                          setPhotos((prev) => [
                            ...prev,
                            ...valid.map((f) => ({ file: f, preview: URL.createObjectURL(f) })),
                          ]);
                          // reset so same file can be re-selected
                          e.target.value = "";
                        }}
                      />

                      {photos.length === 0 ? (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-500/5 transition-colors cursor-pointer group"
                        >
                          <ImagePlus size={22} className="text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                          <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 transition-colors">
                            Tap to add photos
                          </span>
                          <span className="text-xs text-zinc-400 dark:text-zinc-600">Max 5MB per photo</span>
                        </button>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {photos.map((p, i) => (
                            <div key={p.preview} className="relative w-[72px] h-[72px] rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.preview} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  URL.revokeObjectURL(p.preview);
                                  setPhotos((prev) => prev.filter((_, idx) => idx !== i));
                                }}
                                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-zinc-900/70 flex items-center justify-center hover:bg-red-500 transition-colors"
                              >
                                <X size={10} className="text-white" />
                              </button>
                            </div>
                          ))}
                          {photos.length < 5 && (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-[72px] h-[72px] rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-1 hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-500/5 transition-colors cursor-pointer group shrink-0"
                            >
                              <ImagePlus size={16} className="text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                              <span className="text-[10px] text-zinc-400 group-hover:text-indigo-500 transition-colors">Add</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Contact form */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Your name</label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email or phone number</label>
                        <input
                          type="text"
                          placeholder="you@email.com or (403) 555-0100"
                          value={senderContact}
                          onChange={(e) => setSenderContact(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                        />
                      </div>
                    </div>

                    {sendStatus === "error" && (
                      <p className="text-xs text-red-500 font-medium -mt-1">Something went wrong. Please try again.</p>
                    )}

                    <button
                      disabled={!senderName.trim() || !senderContact.trim() || sendStatus === "loading"}
                      onClick={async () => {
                        setSendStatus("loading");
                        try {
                          const encodedPhotos = await Promise.all(
                            photos.map((p) =>
                              new Promise<{ filename: string; content: string }>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () =>
                                  resolve({
                                    filename: p.file.name,
                                    content: (reader.result as string).split(",")[1],
                                  });
                                reader.onerror = reject;
                                reader.readAsDataURL(p.file);
                              })
                            )
                          );
                          const res = await fetch("/api/sell-inquiry", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              name: senderName.trim(),
                              contact: senderContact.trim(),
                              brand,
                              model: modelName,
                              storage,
                              condition,
                              batteryHealth: batteryHealth ?? null,
                              estimatedLow: result.low,
                              estimatedHigh: result.high,
                              photos: encodedPhotos,
                            }),
                          });
                          if (!res.ok) throw new Error();
                          setSendStatus("success");
                        } catch {
                          setSendStatus("error");
                        }
                      }}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer shadow-sm"
                    >
                      {sendStatus === "loading" ? "Sending…" : <><Send size={15} /> Send to HatPhones</>}
                    </button>

                    <p className="text-xs text-zinc-400 text-center -mt-1 pb-2">
                      We&apos;ll get back to you to arrange a time to come in.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Q({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
        {title}
      </h2>
      {hint && <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{hint}</p>}
    </div>
  );
}
