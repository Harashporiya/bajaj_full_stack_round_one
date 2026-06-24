import TreeView from "./TreeView";

export default function HierarchyCard({ hierarchy, index }) {
  const { root, tree, depth, has_cycle } = hierarchy;

  return (
    <div
      className="fade-up"
      style={{
        background: "#fff",
        border: "1.5px solid #e9d5ff",
        borderRadius: 18,
        padding: 20,
        marginBottom: 12,
        animationDelay: `${index * 50}ms`,
        transition: "border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 15 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              flexShrink: 0,
              background: has_cycle ? "linear-gradient(135deg,#fef2f2,#fecaca)" : "linear-gradient(135deg,#ede9fe,#ddd6fe)",
              color: has_cycle ? "#dc2626" : "#6d28d9",
              border: `1.5px solid ${has_cycle ? "#fca5a5" : "#c4b5fd"}`,
            }}
          >
            {root}
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a2e" }}>Root: {root}</div>
            <div style={{ fontSize: "0.73rem", color: "#94a3b8", marginTop: 2 }}>
              {has_cycle ? "Contains a cycle" : `Depth: ${depth} level${depth !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>

        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            padding: "5px 14px",
            borderRadius: 99,
            border: "1px solid",
            background: has_cycle ? "#fef2f2" : "#f5f3ff",
            color: has_cycle ? "#dc2626" : "#6d28d9",
            borderColor: has_cycle ? "#fecaca" : "#ddd6fe",
          }}
        >
          {has_cycle ? "⟲ Cycle" : "🌲 Tree"}
        </span>
      </div>

      {has_cycle ? (
        <div
          style={{
            background: "#fff5f5",
            border: "1.5px dashed #fca5a5",
            borderRadius: 13,
            padding: 22,
            textAlign: "center",
            color: "#b91c1c",
            fontSize: "0.82rem",
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>⟲</div>
          <strong style={{ display: "block", marginBottom: 4 }}>Circular path detected</strong>
          This group of nodes forms a loop — no tree structure can be built.
        </div>
      ) : (
        <TreeView root={root} tree={tree} />
      )}
    </div>
  );
}
