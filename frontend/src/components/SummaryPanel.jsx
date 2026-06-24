export default function SummaryPanel({ summary, userId, emailId, rollNumber }) {
  const stats = [
    { label: "Trees Found",  value: summary.total_trees,       bg: "#f5f3ff", border: "#ddd6fe", color: "#6d28d9" },
    { label: "Cycles Found", value: summary.total_cycles,      bg: "#fff5f5", border: "#fecaca", color: "#dc2626" },
    { label: "Biggest Tree", value: summary.largest_tree_root || "—", bg: "#fffbeb", border: "#fde68a", color: "#b45309", mono: true },
  ];

  return (
    <div style={{ background: "#fff", border: "1.5px solid #e9d5ff", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 8px rgba(124,58,237,0.05)" }} className="fade-up">
      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
        📊 Results Summary
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 16, padding: "18px 14px", textAlign: "center" }}>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 6, fontFamily: s.mono ? "'JetBrains Mono',monospace" : "inherit" }}>
              {s.value}
            </div>
            <div style={{ fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: s.color, opacity: 0.75 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#faf9ff", border: "1px solid #ede9fe", borderRadius: 13, padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { label: "User ID",     value: userId },
          { label: "Email",       value: emailId },
          { label: "Roll Number", value: rollNumber },
        ].map((f) => (
          <div key={f.label}>
            <div style={{ fontSize: "0.66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#a78bfa", marginBottom: 3 }}>{f.label}</div>
            <div style={{ fontSize: "0.75rem", color: "#4b5563", fontFamily: "'JetBrains Mono',monospace", wordBreak: "break-all" }}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
