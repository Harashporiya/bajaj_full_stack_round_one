export default function BadgeList({ title, icon, items, badgeClass, emptyMessage }) {
  const badgeStyles = {
    "badge-red":    { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
    "badge-yellow": { bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
    "badge-purple": { bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" },
  };
  const bs = badgeStyles[badgeClass] || badgeStyles["badge-purple"];

  return (
    <div style={{ background: "#fff", border: "1.5px solid #e9d5ff", borderRadius: 16, padding: 18 }} className="fade-up">
      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{icon} {title}</span>
        <span style={{ fontSize: "0.68rem", background: "#f3f4f6", color: "#6b7280", padding: "2px 9px", borderRadius: 99, fontWeight: 700 }}>
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p style={{ fontSize: "0.79rem", color: "#94a3b8", fontStyle: "italic" }}>{emptyMessage}</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {items.map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "3px 11px",
                borderRadius: 99,
                border: `1px solid ${bs.border}`,
                background: bs.bg,
                color: bs.color,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
