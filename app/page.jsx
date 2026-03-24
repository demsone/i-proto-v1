"use client";

import { useState, useEffect } from "react";

// ============================================================
// STRAIN DATABASE — Replace/expand with Catalyst data later
// ============================================================
const strainDB = [
  {
    name: "Electric Honeydew",
    thc: 26, cbd: 0,
    category: "Day / Functional",
    status: "tried",
    verdict: "Benchmark intelligent sativa hybrid",
    terpenes: { limonene: 0.8, caryophyllene: 0.5, pinene: 0.4, myrcene: 0.2, linalool: 0.1 },
    totalTerpenes: 2.0,
    notes: "Clean, creative, zero heaviness. Strong top-end lift + grounding backbone.",
  },
  {
    name: "Greenline Banjo",
    thc: 26, cbd: 0,
    category: "Day / Functional",
    status: "tried",
    verdict: "Near-perfect day hybrid",
    terpenes: { limonene: 0.65, caryophyllene: 0.45, farnesene: 0.3, pinene: 0.25, myrcene: 0.15 },
    totalTerpenes: 1.8,
    notes: "Bright, productive, enjoyable. Lift + cushion + structure.",
  },
  {
    name: "Crystal Locomotive",
    thc: 28, cbd: 0,
    category: "Day / Functional",
    status: "tried",
    verdict: "Safe creative haze",
    terpenes: { limonene: 0.5, terpinolene: 0.35, caryophyllene: 0.4, myrcene: 0.2 },
    totalTerpenes: 1.45,
    notes: "Light haze, functional. Controlled stimulation without overload.",
  },
  {
    name: "Runtz Punch",
    thc: 28, cbd: 0,
    category: "Day / Functional",
    status: "tried",
    verdict: "Reliable hybrid",
    terpenes: { caryophyllene: 0.5, limonene: 0.45, myrcene: 0.4 },
    totalTerpenes: 1.35,
    notes: "Versatile, smooth. Even terpene spread, no dominance.",
  },
  {
    name: "Southern Sky Hybrid",
    thc: 26, cbd: 1.0,
    category: "Day / Functional",
    status: "tried",
    verdict: "Ideal heavy-functional crossover",
    terpenes: { myrcene: 0.45, caryophyllene: 0.4, limonene: 0.35 },
    totalTerpenes: 1.2,
    notes: "Heavy but controlled. CBD + terpene balance = structured sedation. FAVOURITE.",
    favourite: true,
  },
  {
    name: "MAC-1",
    thc: 22, cbd: 0,
    category: "Deep Think / Creative",
    status: "tried",
    verdict: "Intellectual + emotional balance",
    terpenes: { limonene: 0.45, caryophyllene: 0.4, farnesene: 0.3, linalool: 0.25 },
    totalTerpenes: 1.4,
    notes: "Deep thinking + calm. High terpene density despite low THC.",
  },
  {
    name: "Rosa 22:1",
    thc: 22, cbd: 0,
    category: "Deep Think / Creative",
    status: "tried",
    verdict: "Unique, body-aware deep state",
    terpenes: { farnesene: 0.55, caryophyllene: 0.35, bisabolol: 0.25, linalool: 0.2, myrcene: 0.15 },
    totalTerpenes: 1.5,
    notes: "Sedative + sensual + head massage. Rare terpene combo (soft + enveloping).",
  },
  {
    name: "Lemon Zkittlez",
    thc: 28, cbd: 0,
    category: "Deep Think / Creative",
    status: "tried",
    verdict: "Edge-case deep thinker",
    terpenes: { limonene: 0.7, myrcene: 0.4, terpinolene: 0.3 },
    totalTerpenes: 1.4,
    notes: "Hazy, slightly anxious. Strong lift without enough grounding.",
  },
  {
    name: "Frost'd Flakes",
    thc: 30, cbd: 0,
    category: "Sleep / KO",
    status: "tried",
    verdict: "Reliable KO",
    terpenes: { myrcene: 0.7, caryophyllene: 0.35, linalool: 0.25 },
    totalTerpenes: 1.3,
    notes: "Fast knockout. Classic sedation stack.",
  },
  {
    name: "Hawaiian Apple",
    thc: 24, cbd: 0,
    category: "Day / Functional",
    status: "predicted",
    verdict: "Likely bright but grounded",
    terpenes: { limonene: 0.5, myrcene: 0.35 },
    totalTerpenes: 0.85,
    notes: "Predicted: limonene lift with moderate myrcene grounding.",
  },
  {
    name: "Black Cherry Pie",
    thc: 27, cbd: 0,
    category: "Day / Functional",
    status: "predicted",
    verdict: "Slightly playful",
    terpenes: { caryophyllene: 0.5, limonene: 0.4 },
    totalTerpenes: 0.9,
    notes: "Predicted: caryophyllene-forward with limonene support.",
  },
  {
    name: "Chem De La Chem",
    thc: 30, cbd: 0,
    category: "Deep Think / Creative",
    status: "predicted",
    verdict: "Ideal deep-think candidate",
    terpenes: { limonene: 0.5, myrcene: 0.4, farnesene: 0.3 },
    totalTerpenes: 1.2,
    notes: "Predicted: strong creative potential with rare softener.",
  },
  {
    name: "Moonlight (Gelato OG)",
    thc: 22, cbd: 0,
    category: "Sleep / KO",
    status: "predicted",
    verdict: "Comfort sleep, not brutal KO",
    terpenes: { myrcene: 0.5, caryophyllene: 0.3, nerolidol: 0.2 },
    totalTerpenes: 1.0,
    notes: "Predicted: warm, cozy wind-down.",
  },
  {
    name: "True North",
    thc: 28, cbd: 0,
    category: "Day / Functional",
    status: "predicted",
    verdict: "Clean but less expressive",
    terpenes: { pinene: 0.6, limonene: 0.2, caryophyllene: 0.15 },
    totalTerpenes: 0.95,
    notes: "Predicted: pinene-forward clarity. May feel thin.",
  },
  {
    name: "East Coast Dank'z",
    thc: 25, cbd: 0,
    category: "Avoid",
    status: "tried",
    verdict: "Zero terpene intelligence",
    terpenes: { myrcene: 0.15 },
    totalTerpenes: 0.15,
    notes: "Flat, empty. No limonene, no structure. WORST EXPERIENCE.",
    avoid: true,
  },
  {
    name: "Blue Mountain THC25",
    thc: 25, cbd: 0,
    category: "Avoid",
    status: "tried",
    verdict: "Blunt, unintelligent",
    terpenes: { myrcene: 0.7, limonene: 0.05 },
    totalTerpenes: 0.75,
    notes: "Heavy, dull. One-note sedation without structure.",
    avoid: true,
  },
];

// ============================================================
// TERPENE PROFILES
// ============================================================
const terpeneInfo = {
  limonene: { name: "Limonene", color: "#E8C840", role: "Lift" },
  caryophyllene: { name: "Caryophyllene", color: "#C4853A", role: "Anchor" },
  myrcene: { name: "Myrcene", color: "#6B7B8A", role: "Sedator" },
  linalool: { name: "Linalool", color: "#9B7BC4", role: "Dreamer" },
  pinene: { name: "Pinene", color: "#4A9C6B", role: "Clarifier" },
  farnesene: { name: "Farnesene", color: "#A0845A", role: "Softener" },
  bisabolol: { name: "Bisabolol", color: "#C49B7B", role: "Healer" },
  terpinolene: { name: "Terpinolene", color: "#D45A5A", role: "Wildcard" },
  nerolidol: { name: "Nerolidol", color: "#7B9C8A", role: "Sedative" },
};

// ============================================================
// QUESTIONS
// ============================================================
const questions = [
  {
    id: "goal",
    question: "What's this session for?",
    sub: "Pick the one that matters most right now.",
    options: [
      { label: "Productivity & focus", value: "functional", icon: "⚡", desc: "Get things done, stay sharp" },
      { label: "Creative depth", value: "creative", icon: "◎", desc: "Think deeply, explore ideas" },
      { label: "Unwind & decompress", value: "relax", icon: "◆", desc: "Let the day go, ease tension" },
      { label: "Sleep", value: "sleep", icon: "●", desc: "Knock out, stay out" },
    ]
  },
  {
    id: "avoid",
    question: "What must you avoid?",
    sub: "The deal-breaker. The thing that ruins it for you.",
    options: [
      { label: "Anxiety / racing mind", value: "anxiety", icon: "⚡", desc: "No paranoia, no spiralling" },
      { label: "Feeling flat / empty", value: "flatness", icon: "○", desc: "No couch-lock boredom" },
      { label: "Too sedated / heavy", value: "sedation", icon: "●", desc: "Don't knock me out" },
      { label: "Brain fog / confusion", value: "fog", icon: "◎", desc: "Keep my mind clear" },
    ]
  },
  {
    id: "body",
    question: "How much body?",
    sub: "Do you want to feel it physically?",
    options: [
      { label: "Heady — keep it mental", value: "minimal", icon: "△", desc: "All mind, minimal body" },
      { label: "Balanced", value: "moderate", icon: "◆", desc: "Grounded but not heavy" },
      { label: "Full body", value: "heavy", icon: "●", desc: "I want to sink in" },
    ]
  },
  {
    id: "intensity",
    question: "How strong?",
    sub: "Be honest — no judgment here.",
    options: [
      { label: "Light touch", value: "low", icon: "·", desc: "Gentle, barely there" },
      { label: "Solid session", value: "medium", icon: "◆", desc: "Noticeable, functional" },
      { label: "Full send", value: "high", icon: "●", desc: "I want a proper experience" },
    ]
  },
  {
    id: "experience",
    question: "Cannabis experience level?",
    sub: "This adjusts how aggressive the recommendations are.",
    options: [
      { label: "New / occasional", value: "beginner", icon: "○", desc: "Less than monthly" },
      { label: "Regular", value: "regular", icon: "◆", desc: "Weekly or more" },
      { label: "Experienced", value: "experienced", icon: "●", desc: "Daily or near-daily" },
    ]
  }
];

// ============================================================
// RECOMMENDATION ENGINE
// ============================================================
function generateRecommendation(answers) {
  const { goal, avoid, body, intensity, experience } = answers;

  // Build ideal terpene weights (-1 to 1 scale, negative = avoid)
  let weights = {
    limonene: 0, caryophyllene: 0, myrcene: 0, linalool: 0,
    pinene: 0, farnesene: 0, bisabolol: 0, terpinolene: 0
  };

  // Goal
  if (goal === "functional") {
    weights.limonene += 1.0; weights.caryophyllene += 0.6; weights.pinene += 0.5;
    weights.myrcene -= 0.3; weights.terpinolene -= 0.2;
  } else if (goal === "creative") {
    weights.limonene += 0.7; weights.farnesene += 0.7; weights.linalool += 0.5;
    weights.caryophyllene += 0.4; weights.myrcene -= 0.1;
  } else if (goal === "relax") {
    weights.caryophyllene += 0.8; weights.myrcene += 0.4; weights.linalool += 0.4;
    weights.limonene += 0.2; weights.bisabolol += 0.3;
  } else if (goal === "sleep") {
    weights.myrcene += 1.0; weights.linalool += 0.7; weights.caryophyllene += 0.4;
    weights.limonene -= 0.3; weights.pinene -= 0.4;
  }

  // Avoid
  if (avoid === "anxiety") {
    weights.terpinolene -= 0.8; weights.caryophyllene += 0.3; weights.linalool += 0.2;
  } else if (avoid === "flatness") {
    weights.limonene += 0.4; weights.myrcene -= 0.5;
  } else if (avoid === "sedation") {
    weights.myrcene -= 0.6; weights.linalool -= 0.3; weights.pinene += 0.3;
  } else if (avoid === "fog") {
    weights.pinene += 0.5; weights.myrcene -= 0.4;
  }

  // Body
  if (body === "minimal") {
    weights.myrcene -= 0.3; weights.pinene += 0.2;
  } else if (body === "heavy") {
    weights.myrcene += 0.4; weights.caryophyllene += 0.3; weights.bisabolol += 0.2;
  }

  // THC range
  let thcMin = 22, thcMax = 28;
  if (intensity === "low") { thcMin = 18; thcMax = 24; }
  if (intensity === "high") { thcMin = 26; thcMax = 32; }
  if (experience === "beginner") { thcMax = Math.min(thcMax, 24); }

  // Build seek/avoid lists for display
  let seekTerps = [];
  let avoidTerps = [];
  Object.entries(weights).forEach(([key, w]) => {
    if (w >= 0.4) seekTerps.push({ key, weight: w, level: w >= 0.8 ? "High" : "Moderate" });
    if (w <= -0.4) avoidTerps.push({ key, weight: w, reason: getAvoidReason(key, avoid, goal) });
  });
  seekTerps.sort((a, b) => b.weight - a.weight);
  avoidTerps.sort((a, b) => a.weight - b.weight);

  // Score each strain
  let scored = strainDB
    .filter(s => !s.avoid)
    .map(strain => {
      let score = 0;
      let totalWeight = 0;

      // Terpene alignment score
      Object.entries(weights).forEach(([terp, w]) => {
        if (Math.abs(w) < 0.1) return;
        const strainLevel = strain.terpenes[terp] || 0;
        const normalized = Math.min(strainLevel / 0.6, 1); // normalize to 0-1
        if (w > 0) {
          score += w * normalized;
        } else {
          score += w * normalized; // negative weight * presence = penalty
        }
        totalWeight += Math.abs(w);
      });

      // THC fit bonus
      if (strain.thc >= thcMin && strain.thc <= thcMax) {
        score += 0.3;
      } else if (strain.thc > thcMax) {
        score -= 0.15 * ((strain.thc - thcMax) / 5);
      }

      // CBD bonus if anxiety avoidance
      if (avoid === "anxiety" && strain.cbd > 0) {
        score += 0.4;
      }

      // Total terpene richness bonus
      if (strain.totalTerpenes >= 1.2) score += 0.2;
      if (strain.totalTerpenes >= 1.5) score += 0.1;

      // Penalty for low terpene strains
      if (strain.totalTerpenes < 0.5) score -= 0.5;

      const compatibility = Math.max(0, Math.min(100, Math.round((score / (totalWeight * 0.5 + 0.5)) * 55 + 45)));

      return { ...strain, score, compatibility };
    })
    .sort((a, b) => b.score - a.score);

  const topPicks = scored.slice(0, 3);
  const maybeList = scored.slice(3, 6);
  const avoidStrains = strainDB.filter(s => s.avoid);

  return { seekTerps, avoidTerps, thcMin, thcMax, topPicks, maybeList, avoidStrains, weights };
}

function getAvoidReason(terp, avoid, goal) {
  const reasons = {
    terpinolene: "Anxiety trigger — stimulates without structure",
    myrcene: avoid === "flatness" ? "Dominant myrcene = the flatness you hate" :
             avoid === "sedation" ? "Primary sedation driver" :
             avoid === "fog" ? "Increases brain fog at high levels" :
             "Can cause heaviness without structure",
    linalool: "Adds drowsiness — counterproductive for this goal",
    pinene: "Can overstimulate in anxious combinations",
    limonene: "May feel too stimulating for sleep goals",
  };
  return reasons[terp] || "May conflict with your goal";
}

// ============================================================
// UI COMPONENTS
// ============================================================
function TerpPill({ terpKey, size = "normal" }) {
  const t = terpeneInfo[terpKey];
  if (!t) return null;
  const s = size === "small";
  return (
    <span style={{
      background: `${t.color}18`,
      color: t.color,
      padding: s ? "2px 8px" : "3px 10px",
      borderRadius: "14px",
      fontSize: s ? "10px" : "11px",
      fontWeight: 600,
      fontFamily: "'IBM Plex Mono', monospace",
      border: `1px solid ${t.color}28`,
      whiteSpace: "nowrap",
    }}>{t.name}</span>
  );
}

function CompatScore({ value }) {
  const color = value >= 80 ? "#4A7C59" : value >= 60 ? "#C4A35A" : value >= 40 ? "#C4853A" : "#6B7B8A";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: "2px", transition: "width 0.8s ease" }} />
      </div>
      <span style={{ fontSize: "12px", color, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", minWidth: "32px", textAlign: "right" }}>{value}%</span>
    </div>
  );
}

function StrainCard({ strain, rank }) {
  const [open, setOpen] = useState(false);
  const statusColor = strain.status === "tried" ? "#4A7C59" : "#C4A35A";
  const statusLabel = strain.status === "tried" ? "VERIFIED" : "PREDICTED";

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "8px",
      transition: "all 0.2s",
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px" }}
      >
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: rank === 1 ? "rgba(74,124,89,0.15)" : rank === 2 ? "rgba(196,163,90,0.12)" : "rgba(255,255,255,0.04)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace",
          color: rank === 1 ? "#4A7C59" : rank === 2 ? "#C4A35A" : "rgba(255,255,255,0.3)",
          flexShrink: 0,
        }}>{rank}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{strain.name}</span>
            <span style={{
              fontSize: "8px", letterSpacing: "1.5px", fontWeight: 700, color: statusColor,
              background: `${statusColor}15`, padding: "2px 6px", borderRadius: "8px",
              fontFamily: "'IBM Plex Mono', monospace",
            }}>{statusLabel}</span>
            {strain.favourite && <span style={{ fontSize: "10px" }}>⭐</span>}
          </div>
          <CompatScore value={strain.compatibility} />
        </div>

        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▼</span>
      </div>

      {open && (
        <div style={{ padding: "0 18px 16px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ paddingTop: "14px" }}>
            <div style={{ display: "flex", gap: "16px", marginBottom: "12px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "3px" }}>THC</div>
                <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: "#fff" }}>{strain.thc}%</div>
              </div>
              {strain.cbd > 0 && (
                <div>
                  <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "3px" }}>CBD</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: "#4A9C6B" }}>~{strain.cbd}%</div>
                </div>
              )}
              <div>
                <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "3px" }}>Category</div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{strain.category}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
              {Object.entries(strain.terpenes)
                .sort((a, b) => b[1] - a[1])
                .map(([key], i) => <TerpPill key={i} terpKey={key} size="small" />)
              }
            </div>

            <div style={{
              background: "rgba(255,255,255,0.02)", borderRadius: "6px", padding: "12px",
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "6px" }}>
                {strain.status === "tried" ? "Experience Notes" : "Prediction"}
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{strain.notes}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "6px", fontStyle: "italic" }}>Verdict: {strain.verdict}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function TerpeneIntelligence() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [animIn, setAnimIn] = useState(true);

  const mono = "'IBM Plex Mono', 'JetBrains Mono', monospace";
  const display = "'Instrument Serif', Georgia, serif";
  const bodyFont = "'DM Sans', -apple-system, sans-serif";

  const handleAnswer = (qId, value) => {
    const updated = { ...answers, [qId]: value };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setAnimIn(false);
      setTimeout(() => { setStep(step + 1); setAnimIn(true); }, 180);
    } else {
      setAnimIn(false);
      setTimeout(() => { setResult(generateRecommendation(updated)); setAnimIn(true); }, 180);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setAnimIn(true);
  };

  return (
    <div style={{ fontFamily: bodyFont, background: "#08080B", color: "#E2DED8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
        .opt-btn { transition: all 0.15s ease; cursor: pointer; }
        .opt-btn:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.15) !important; background: rgba(255,255,255,0.04) !important; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "28px 24px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: display, fontSize: "22px", fontWeight: 400, color: "#fff" }}>
            Terpene Intelligence
          </h1>
          <span style={{ fontFamily: mono, fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "2px" }}>
            v1.0 PROTOTYPE
          </span>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "4px", lineHeight: 1.5 }}>
          Tell us how you want to feel. We'll find the flower.
        </p>
      </div>

      <div style={{ maxWidth: "640px", padding: "24px" }}>

        {/* ============ QUESTIONS ============ */}
        {!result && (
          <div className={animIn ? "fade-up" : ""} key={step} style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.15s" }}>
            {/* Progress */}
            <div style={{ display: "flex", gap: "3px", marginBottom: "32px" }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: "2px", borderRadius: "1px",
                  background: i < step ? "#4A7C59" : i === step ? "#C4A35A" : "rgba(255,255,255,0.06)",
                  transition: "background 0.3s"
                }} />
              ))}
            </div>

            <div style={{ fontFamily: mono, fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "2px", marginBottom: "10px" }}>
              {step + 1} / {questions.length}
            </div>

            <h2 style={{ fontFamily: display, fontSize: "26px", color: "#fff", fontWeight: 400, marginBottom: "4px", lineHeight: 1.2 }}>
              {questions[step].question}
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "28px" }}>
              {questions[step].sub}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {questions[step].options.map((opt, i) => (
                <div
                  key={i}
                  className="opt-btn"
                  onClick={() => handleAnswer(questions[step].id, opt.value)}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontSize: "18px", opacity: 0.5, minWidth: "24px", textAlign: "center" }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#E2DED8", marginBottom: "2px" }}>{opt.label}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {step > 0 && (
              <button onClick={() => { setAnimIn(false); setTimeout(() => { setStep(step - 1); setAnimIn(true); }, 180); }}
                style={{
                  background: "none", border: "none", color: "rgba(255,255,255,0.2)",
                  fontFamily: mono, fontSize: "10px", letterSpacing: "1px", cursor: "pointer",
                  marginTop: "20px", padding: "8px 0",
                }}>
                ← BACK
              </button>
            )}
          </div>
        )}

        {/* ============ RESULTS ============ */}
        {result && (
          <div className="fade-up" key="results">

            {/* Top Picks */}
            <div style={{ fontFamily: mono, fontSize: "9px", color: "#4A7C59", letterSpacing: "2px", marginBottom: "6px" }}>
              YOUR MATCHES
            </div>
            <h2 style={{ fontFamily: display, fontSize: "26px", color: "#fff", fontWeight: 400, marginBottom: "4px" }}>
              Top flower picks
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "20px", lineHeight: 1.5 }}>
              Ranked by terpene alignment with your session goals. Tap any strain for details.
            </p>

            {result.topPicks.map((s, i) => (
              <StrainCard key={s.name} strain={s} rank={i + 1} />
            ))}

            {/* Also Consider */}
            {result.maybeList.length > 0 && (
              <div style={{ marginTop: "28px" }}>
                <div style={{ fontFamily: mono, fontSize: "9px", color: "#C4A35A", letterSpacing: "2px", marginBottom: "12px" }}>
                  ALSO CONSIDER
                </div>
                {result.maybeList.map((s, i) => (
                  <StrainCard key={s.name} strain={s} rank={i + 4} />
                ))}
              </div>
            )}

            {/* Terpene Profile */}
            <div style={{ marginTop: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "20px" }}>
              <div style={{ fontFamily: mono, fontSize: "9px", color: "#C4A35A", letterSpacing: "2px", marginBottom: "14px" }}>
                YOUR IDEAL TERPENE PROFILE
              </div>

              {result.seekTerps.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "10px", color: "#4A7C59", fontFamily: mono, letterSpacing: "1.5px", marginBottom: "8px" }}>✓ SEEK</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {result.seekTerps.map((s, i) => {
                      const t = terpeneInfo[s.key];
                      return t ? (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", borderLeft: `2px solid ${t.color}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 600, color: t.color }}>{t.name}</span>
                            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>{t.role}</span>
                          </div>
                          <span style={{ fontFamily: mono, fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{s.level}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {result.avoidTerps.length > 0 && (
                <div>
                  <div style={{ fontSize: "10px", color: "#E85D4A", fontFamily: mono, letterSpacing: "1.5px", marginBottom: "8px" }}>✕ AVOID</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {result.avoidTerps.map((a, i) => {
                      const t = terpeneInfo[a.key];
                      return t ? (
                        <div key={i} style={{ padding: "8px 12px", background: "rgba(232,93,74,0.04)", borderRadius: "6px", border: "1px solid rgba(232,93,74,0.08)" }}>
                          <span style={{ fontFamily: mono, fontSize: "12px", fontWeight: 600, color: "#E85D4A" }}>{t.name}</span>
                          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{a.reason}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: "6px", padding: "12px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.2)", fontFamily: mono, marginBottom: "4px" }}>THC RANGE</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, fontFamily: mono, color: "#fff" }}>{result.thcMin}–{result.thcMax}%</div>
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: "6px", padding: "12px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "1.5px", color: "rgba(255,255,255,0.2)", fontFamily: mono, marginBottom: "4px" }}>STRAINS IN DB</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, fontFamily: mono, color: "#fff" }}>{strainDB.filter(s => !s.avoid).length}</div>
                </div>
              </div>
            </div>

            {/* Avoid Strains */}
            {result.avoidStrains.length > 0 && (
              <div style={{ marginTop: "28px" }}>
                <div style={{ fontFamily: mono, fontSize: "9px", color: "#E85D4A", letterSpacing: "2px", marginBottom: "12px" }}>
                  AVOID THESE
                </div>
                {result.avoidStrains.map((s, i) => (
                  <div key={i} style={{
                    background: "rgba(232,93,74,0.03)", border: "1px solid rgba(232,93,74,0.08)",
                    borderRadius: "8px", padding: "14px 16px", marginBottom: "6px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "2px" }}>{s.verdict}</p>
                    </div>
                    <span style={{ fontFamily: mono, fontSize: "9px", color: "#E85D4A", letterSpacing: "1px" }}>LOW TERPS</span>
                  </div>
                ))}
              </div>
            )}

            {/* Data Note */}
            <div style={{
              background: "rgba(196,163,90,0.06)", borderLeft: "2px solid rgba(196,163,90,0.3)",
              padding: "14px 16px", borderRadius: "0 8px 8px 0", marginTop: "28px",
            }}>
              <div style={{ fontFamily: mono, fontSize: "9px", color: "#C4A35A", letterSpacing: "1.5px", marginBottom: "6px" }}>
                PROTOTYPE NOTE
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                This engine is running against {strainDB.length} strains from personal testing and predictions.
                When connected to the full Catalyst database, every TGA-approved product with terpene data
                becomes searchable and rankable. The intelligence layer stays the same — the data scales.
              </p>
            </div>

            {/* Reset */}
            <button onClick={reset} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px", padding: "14px 24px", color: "#C4A35A",
              fontFamily: mono, fontSize: "11px", fontWeight: 600, letterSpacing: "1px",
              cursor: "pointer", marginTop: "24px", textTransform: "uppercase",
            }}>
              ↻ NEW SESSION
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: "32px" }}>
        <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.12)", fontFamily: mono }}>
          Terpene Intelligence v1.0 — Prototype • {strainDB.length} strains • Recommendation engine based on terpene pharmacology + personal response data
        </p>
      </div>
    </div>
  );
}
