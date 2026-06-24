function validateEdge(edge) {
  const trimmed = (edge || "").trim();
  const edgeRegex = /^([A-Z])->([A-Z])$/;
  const match = trimmed.match(edgeRegex);

  if (!match) {
    return { valid: false };
  }

  const parent = match[1];
  const child = match[2];

  if (parent === child) {
    return { valid: false };
  }

  return { valid: true, parent, child };
}

module.exports = { validateEdge };
