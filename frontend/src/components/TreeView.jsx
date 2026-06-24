import { useState } from "react";

const NODE_COLORS = [
  { bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" },
  { bg: "#ecfdf5", text: "#059669", border: "#6ee7b7" },
  { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  { bg: "#fff5f5", text: "#dc2626", border: "#fecaca" },
  { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
];

function TreeNode({ label, children, depth }) {
  const childKeys = Object.keys(children);
  const hasChildren = childKeys.length > 0;
  const [open, setOpen] = useState(true);
  const c = NODE_COLORS[depth % NODE_COLORS.length];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "3px 0" }}>
        {hasChildren ? (
          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.18s",
            }}
            aria-label={open ? "Collapse" : "Expand"}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 1.5l4 3.5-4 3.5" stroke={c.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <span style={{ width: 16 }} />
        )}

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            fontWeight: 700,
            padding: "3px 12px",
            borderRadius: 99,
            background: c.bg,
            color: c.text,
            border: `1.5px solid ${c.border}`,
            lineHeight: 1.4,
          }}
        >
          {label}
        </span>

        {hasChildren && (
          <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>
            {childKeys.length} child{childKeys.length !== 1 ? "ren" : ""}
          </span>
        )}
      </div>

      {open && hasChildren && (
        <div style={{ paddingLeft: 22, borderLeft: `1.5px dashed ${c.border}`, marginLeft: 6, marginTop: 4, marginBottom: 2 }}>
          {childKeys.map((key) => (
            <TreeNode key={key} label={key} children={children[key]} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ root, tree }) {
  return (
    <div style={{ background: "#faf9ff", border: "1px solid #ede9fe", borderRadius: 13, padding: 16, overflowX: "auto" }}>
      <TreeNode label={root} children={tree} depth={0} />
    </div>
  );
}
