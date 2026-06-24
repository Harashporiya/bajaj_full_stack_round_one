import { useState } from "react";

const EXAMPLES = [
  { label: "Simple tree",  value: "A->B\nA->C\nB->D" },
  { label: "Two trees",    value: "A->B\nB->C\nX->Y\nY->Z" },
  { label: "Cycle",        value: "X->Y\nY->Z\nZ->X" },
  { label: "Duplicates",   value: "A->B\nA->B\nA->C" },
  { label: "Mixed",        value: "A->B\nA->C\nB->D\nX->Y\nY->Z\nZ->X\nhello\n1->2\nA->B" },
];

export default function InputPanel({ onSubmit, loading }) {
  const [text, setText] = useState("A->B\nA->C\nB->D");

  function handleSubmit(e) {
    e.preventDefault();
    const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    onSubmit(lines);
  }

  const lineCount = text.split("\n").filter((l) => l.trim()).length;

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1.5px solid #e9d5ff", borderRadius: 20, boxShadow: "0 2px 8px rgba(124,58,237,0.05), 0 8px 24px rgba(124,58,237,0.04)", overflow: "hidden" }}>
      
      <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #f3f0ff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✏️</div>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a1a2e" }}>Enter Your Edges</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 1 }}>
              One edge per line — format:{" "}
              <code style={{ fontFamily: "'JetBrains Mono',monospace", color: "#7c3aed", background: "#f5f3ff", padding: "1px 6px", borderRadius: 4, fontSize: "0.72rem" }}>A→B</code>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "18px 24px 24px" }}>
        <div style={{ marginBottom: 13 }}>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block", marginBottom: 8, fontWeight: 500 }}>Try an example:</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setText(ex.value)}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#7c3aed",
                  background: "#f5f3ff",
                  border: "1px solid #ddd6fe",
                  padding: "4px 12px",
                  borderRadius: 99,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.14s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#ede9fe"; e.currentTarget.style.borderColor = "#c4b5fd"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.borderColor = "#ddd6fe"; }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <textarea
          id="edge-input"
          className="edge-textarea"
          rows={8}
          placeholder={"A->B\nA->C\nB->D"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />

        <p className="line-hint">{lineCount} line{lineCount !== 1 ? "s" : ""} entered</p>

        <button id="submit-btn" type="submit" className="btn-analyse" disabled={loading || !text.trim()}>
          {loading ? (
            <><span className="spinner" /> Analysing…</>
          ) : (
            "🔍  Analyse Graph"
          )}
        </button>
      </div>
    </form>
  );
}
