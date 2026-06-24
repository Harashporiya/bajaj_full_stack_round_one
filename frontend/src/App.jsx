import { useState } from "react";
import { postBfhl } from "./services/api";
import InputPanel from "./components/InputPanel";
import HierarchyCard from "./components/HierarchyCard";
import SummaryPanel from "./components/SummaryPanel";
import BadgeList from "./components/BadgeList";

const RULES = [
  { icon: "✅", bg: "#ecfdf5", color: "#059669", title: "Valid format",         desc: "Single uppercase letter on both sides — A→B, X→Y" },
  { icon: "❌", bg: "#fff5f5", color: "#dc2626", title: "Invalid examples",      desc: "hello, 1→2, AB→C, A→, A→A (self-loops not allowed)" },
  { icon: "🔁", bg: "#fffbeb", color: "#d97706", title: "Duplicate edges",       desc: "First one is kept, the rest are flagged as duplicates" },
  { icon: "👑", bg: "#f5f3ff", color: "#7c3aed", title: "Multi-parent conflict", desc: "If two edges claim the same child, first parent wins" },
  { icon: "⟲",  bg: "#fff5f5", color: "#dc2626", title: "Cycles",               desc: "Detected automatically — empty tree returned for that group" },
];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);

  async function handleSubmit(lines) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await postBfhl(lines);
      setResult(data);
    } catch (err) {
      setError(err.message || "Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <div className="logo-pill">
            <div className="logo-icon">🌐</div>
            <div>
              <div className="logo-text">Graph Analyser</div>
              <div className="logo-sub">Chitkara BFHL Challenge</div>
            </div>
          </div>
          <div className="status-badge">
            <span className="status-dot" />
            API connected
          </div>
        </div>
      </header>

      <section className="hero">
        <span className="hero-label">Full Stack Engineering Challenge</span>
        <h1 className="hero-title">
          Understand your <span>graph</span> instantly
        </h1>
        <p className="hero-desc">
          Paste your directed edges below. We'll figure out the structure —
          trees, cycles, duplicates, and everything in between — in seconds.
        </p>
      </section>

      <div className="main-grid">

        {/* Left — Input + Rules */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <InputPanel onSubmit={handleSubmit} loading={loading} />

          {/* Rules card */}
          <div style={{ background: "#fff", border: "1.5px solid #e9d5ff", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 8px rgba(124,58,237,0.05)" }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              📋 What counts as valid?
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {RULES.map((rule) => (
                <div key={rule.title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 30, height: 30, background: rule.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                    {rule.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 2 }}>{rule.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.55 }}>{rule.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Results */}
        <div>
          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 14, padding: "16px 20px", display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 16 }} className="fade-up">
              <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>⚠️</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#dc2626", marginBottom: 3 }}>Something went wrong</div>
                <div style={{ fontSize: "0.78rem", color: "#b91c1c", lineHeight: 1.5 }}>{error}</div>
              </div>
            </div>
          )}

          {!result && !loading && !error && (
            <div style={{ background: "#fff", border: "2px dashed #ddd6fe", borderRadius: 20, padding: "56px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🌿</div>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#7c3aed", marginBottom: 8 }}>Your results will appear here</p>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.65 }}>
                Enter some edges on the left and click "Analyse Graph".<br />
                We'll break down the structure for you.
              </p>
            </div>
          )}

          {loading && (
            <div className="loading-card fade-up">
              <div className="loading-ring" />
              <p className="loading-text">Analysing your graph…</p>
              <p className="loading-sub">Building trees and checking for cycles</p>
            </div>
          )}

          {result && (
            <div className="results-stack">
              <SummaryPanel
                summary={result.summary}
                userId={result.user_id}
                emailId={result.email_id}
                rollNumber={result.college_roll_number}
              />

              <div className="two-cols">
                <BadgeList title="Invalid Entries" icon="❌" items={result.invalid_entries} badgeClass="badge-red"    emptyMessage="All entries were valid." />
                <BadgeList title="Duplicate Edges" icon="🔁" items={result.duplicate_edges} badgeClass="badge-yellow" emptyMessage="No duplicates found." />
              </div>

              <div>
                <div className="section-title">
                  🌲 Hierarchies found
                  <span className="component-count">
                    {result.hierarchies.length} component{result.hierarchies.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {result.hierarchies.length === 0 ? (
                  <div style={{ background: "#fff", border: "1.5px solid #e9d5ff", borderRadius: 16, padding: 20, textAlign: "center", color: "#94a3b8", fontSize: "0.82rem" }}>
                    No valid edges to build hierarchies from.
                  </div>
                ) : (
                  result.hierarchies.map((h, i) => (
                    <HierarchyCard key={`${h.root}-${i}`} hierarchy={h} index={i} />
                  ))
                )}
              </div>

              <div className="raw-json-section">
                <details>
                  <summary>🧾 View raw JSON response</summary>
                  <pre className="json-block">{JSON.stringify(result, null, 2)}</pre>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="site-footer">
        Chitkara Full Stack Engineering Challenge — BFHL &nbsp;·&nbsp; React + Vite + Node.js
      </footer>
    </>
  );
}
