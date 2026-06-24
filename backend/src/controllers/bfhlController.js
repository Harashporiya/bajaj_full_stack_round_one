const { validateEdge } = require("../utils/validator");
const { buildHierarchies, buildSummary } = require("../utils/graphProcessor");

async function handleBfhl(req, res) {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        error: "Request body must contain a 'data' array.",
      });
    }

    const invalidEntries = [];
    const seenEdges = new Set();
    const duplicateEdges = [];
    const validEdges = [];

    for (const item of data) {
      const trimmed = (item || "").trim();
      const { valid, parent, child } = validateEdge(trimmed);

      if (!valid) {
        invalidEntries.push(trimmed);
        continue;
      }

      const key = `${parent}->${child}`;

      if (seenEdges.has(key)) {
        if (!duplicateEdges.includes(key)) {
          duplicateEdges.push(key);
        }
      } else {
        seenEdges.add(key);
        validEdges.push({ parent, child });
      }
    }

    const hierarchies = buildHierarchies(validEdges);
    const summary = buildSummary(hierarchies);

    return res.status(200).json({
      user_id: process.env.USER_ID || "harashporiya_15112005",
      email_id: process.env.EMAIL_ID || "harash1215.be23@chitkarauniversity.edu.in",
      college_roll_number: process.env.COLLEGE_ROLL_NUMBER || "2311981215",
      hierarchies,
      invalid_entries: invalidEntries,
      duplicate_edges: duplicateEdges,
      summary,
    });
  } catch (err) {
    console.error("[handleBfhl] Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { handleBfhl };
