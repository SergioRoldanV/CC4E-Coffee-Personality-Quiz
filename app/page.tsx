"use client";

import { useState } from "react";

// ── Personality types ──────────────────────────────────────────────────────────
const PERSONALITIES: Record<string, { name: string; tagline: string; coffee: string; description: string }> = {
  bold: {
    name: "Bold Adventurer",
    tagline: "Life's too short for weak coffee — or weak choices.",
    coffee: "Ethiopia Yirgacheffe Single Origin",
    description:
      "You charge headfirst into the unknown and you expect your coffee to keep up. You want complex, unexpected flavors that match your appetite for new experiences.",
  },
  zen: {
    name: "Zen Minimalist",
    tagline: "Clarity over complexity. Always.",
    coffee: "Japanese-Style Iced Pour Over",
    description:
      "You strip away the noise to find what really matters. Your ideal cup is clean, precise, and intentional — nothing extra, nothing missing.",
  },
  artisan: {
    name: "Artisan Snob",
    tagline: "If it's worth doing, it's worth doing beautifully.",
    coffee: "Reserve Gesha — La Palma y El Tucán",
    description:
      "You have standards. High ones. You appreciate craftsmanship, origin stories, and the kind of coffee that makes baristas emotional.",
  },
  practical: {
    name: "Practical Pragmatist",
    tagline: "Get it done. Fuel up. Repeat.",
    coffee: "Basecamp House Blend — Dark Roast",
    description:
      "You don't overcomplicate things. You need reliable, consistent, no-fuss coffee that shows up every single morning and does its job.",
  },
};

// ── Quiz questions ─────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    question: "Pick your ancient civilization.",
    options: [
      { key: "A", emoji: "🛡️", text: "Vikings — bold, fearless, and slightly chaotic", personality: "bold" },
      { key: "B", emoji: "🏺", text: "Ancient Greece — philosophy, beauty, and olive oil", personality: "zen" },
      { key: "C", emoji: "🌸", text: "Feudal Japan — ceremony, precision, and honor", personality: "artisan" },
      { key: "D", emoji: "🦅", text: "Roman Empire — infrastructure, logistics, and getting things done", personality: "practical" },
    ],
  },
  {
    question: "It's Friday night. What's the move?",
    options: [
      { key: "A", emoji: "🏔️", text: "Spontaneous road trip — figure out the rest later", personality: "bold" },
      { key: "B", emoji: "🍷", text: "Wine, ambient music, and a book I've been meaning to finish", personality: "zen" },
      { key: "C", emoji: "📖", text: "Dinner reservation at that new place everyone's talking about", personality: "artisan" },
      { key: "D", emoji: "🛋️", text: "Couch, takeout, whatever's trending on Netflix", personality: "practical" },
    ],
  },
  {
    question: "Which Netflix show are you finishing in one sitting?",
    options: [
      { key: "A", emoji: "💥", text: "Something with explosions, survival, and moral ambiguity", personality: "bold" },
      { key: "B", emoji: "🎭", text: "A slow-burn drama with complex characters and no easy answers", personality: "zen" },
      { key: "C", emoji: "🌿", text: "A documentary about artisanal food or obscure craftsmanship", personality: "artisan" },
      { key: "D", emoji: "😂", text: "A comfort comedy I've already seen three times", personality: "practical" },
    ],
  },
  {
    question: "You have to move to a new city. How do you pick?",
    options: [
      { key: "A", emoji: "🌋", text: "Somewhere wild and unexpected — the more unusual the better", personality: "bold" },
      { key: "B", emoji: "☕", text: "Walkable, quiet, good light, good coffee shops", personality: "zen" },
      { key: "C", emoji: "🏯", text: "Somewhere with deep history, culture, and great restaurants", personality: "artisan" },
      { key: "D", emoji: "🏙️", text: "Good job market, reasonable cost of living, easy airport access", personality: "practical" },
    ],
  },
  {
    question: "You're building something. What's your approach?",
    options: [
      { key: "A", emoji: "🔨", text: "Start immediately, figure it out as I go, embrace the chaos", personality: "bold" },
      { key: "B", emoji: "📐", text: "Think deeply before touching anything. Measure twice, cut once", personality: "zen" },
      { key: "C", emoji: "🧘", text: "Research obsessively, source the best materials, do it perfectly", personality: "artisan" },
      { key: "D", emoji: "📋", text: "Follow the instructions, stay on schedule, hit the deadline", personality: "practical" },
    ],
  },
];

// ── Helper: tally result ───────────────────────────────────────────────────────
function calcResult(answers: string[]): string {
  const counts: Record<string, number> = { bold: 0, zen: 0, artisan: 0, practical: 0 };
  answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// ── Shared header ──────────────────────────────────────────────────────────────
function Header({ label }: { label?: string }) {
  return (
    <div
      style={{
        background: "#2a1f14",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "12px 12px 0 0",
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "22px",
          color: "#e8b86d",
          letterSpacing: "2px",
        }}
      >
        COFFEE PERSONALITY
      </span>
      {label && (
        <span style={{ color: "#a89070", fontSize: "13px", fontWeight: 500 }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [screen, setScreen] = useState<"intro" | "question" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const totalQuestions = QUESTIONS.length;

  function startQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScreen("question");
  }

  function handleSelect(personality: string) {
    const newAnswers = [...selectedAnswers, personality];
    if (currentQuestion + 1 >= totalQuestions) {
      setSelectedAnswers(newAnswers);
      setScreen("result");
    } else {
      setSelectedAnswers(newAnswers);
      setCurrentQuestion((q) => q + 1);
    }
  }

  function restart() {
    setScreen("intro");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  }

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 32px rgba(42,31,20,0.12)",
    width: "100%",
    maxWidth: "580px",
    overflow: "hidden",
  };

  // ── Intro screen ─────────────────────────────────────────────────────────────
  if (screen === "intro") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f0ece6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
        }}
      >
        <div style={cardStyle}>
          <Header />
          <div style={{ padding: "40px 36px 36px" }}>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "48px",
                lineHeight: 1.05,
                color: "#2a1f14",
                margin: "0 0 20px",
                letterSpacing: "1px",
              }}
            >
              WHAT'S YOUR COFFEE PERSONALITY?
            </h1>
            <p style={{ color: "#6b5745", fontSize: "16px", lineHeight: 1.7, margin: "0 0 32px" }}>
              Answer 5 questions and we'll reveal the coffee that matches who you really are. No wrong answers — just very specific caffeine-based personality judgments.
            </p>
            <button
              onClick={startQuiz}
              style={{
                background: "#2a1f14",
                color: "#f0ece6",
                border: "none",
                borderRadius: "8px",
                padding: "14px 32px",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "18px",
                letterSpacing: "1.5px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              START QUIZ
              <span style={{ color: "#e8b86d", fontSize: "20px" }}>→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Question screen ───────────────────────────────────────────────────────────
  if (screen === "question") {
    const q = QUESTIONS[currentQuestion];
    const qNum = currentQuestion + 1;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f0ece6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
        }}
      >
        <div style={cardStyle}>
          <Header label={`Question ${qNum} of ${totalQuestions}`} />

          {/* Progress bar */}
          <div style={{ background: "#2a1f14", padding: "0 24px 16px", display: "flex", gap: "6px" }}>
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i < currentQuestion
                      ? "#e8b86d"
                      : i === currentQuestion
                      ? "#f0d090"
                      : "#3d2c1e",
                }}
              />
            ))}
          </div>

          <div style={{ padding: "28px 32px 32px" }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "32px",
                color: "#2a1f14",
                margin: "0 0 24px",
                letterSpacing: "0.5px",
                lineHeight: 1.15,
              }}
            >
              {q.question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {q.options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSelect(opt.personality)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    border: "2px solid #ede8e1",
                    background: "#fdfaf7",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8b86d";
                    (e.currentTarget as HTMLButtonElement).style.background = "#fffbf3";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#ede8e1";
                    (e.currentTarget as HTMLButtonElement).style.background = "#fdfaf7";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "16px",
                      color: "#e8b86d",
                      minWidth: "20px",
                      letterSpacing: "1px",
                    }}
                  >
                    {opt.key}
                  </span>
                  <span style={{ fontSize: "20px" }}>{opt.emoji}</span>
                  <span style={{ color: "#2a1f14", fontSize: "15px", fontWeight: 500, lineHeight: 1.4 }}>
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Result screen ─────────────────────────────────────────────────────────────
  const resultKey = calcResult(selectedAnswers);
  const result = PERSONALITIES[resultKey];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0ece6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div style={cardStyle}>
        <Header />
        <div style={{ padding: "36px 36px 36px" }}>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "13px",
              letterSpacing: "3px",
              color: "#e8b86d",
              margin: "0 0 8px",
            }}
          >
            YOUR RESULT
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "52px",
              color: "#2a1f14",
              margin: "0 0 6px",
              lineHeight: 1,
              letterSpacing: "1px",
            }}
          >
            {result.name.toUpperCase()}
          </h2>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "18px",
              color: "#e8b86d",
              margin: "0 0 20px",
              letterSpacing: "0.5px",
            }}
          >
            {result.coffee}
          </p>
          <p
            style={{
              color: "#6b5745",
              fontSize: "16px",
              lineHeight: 1.7,
              fontStyle: "italic",
              margin: "0 0 12px",
            }}
          >
            "{result.tagline}"
          </p>
          <p style={{ color: "#4a3728", fontSize: "15px", lineHeight: 1.7, margin: "0 0 32px" }}>
            {result.description}
          </p>
          <button
            onClick={restart}
            style={{
              background: "transparent",
              color: "#2a1f14",
              border: "2px solid #2a1f14",
              borderRadius: "8px",
              padding: "12px 28px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "16px",
              letterSpacing: "1.5px",
              cursor: "pointer",
            }}
          >
            TAKE IT AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}
