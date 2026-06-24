function buildHierarchies(validEdges) {
  const childParentMap = {};
  const resolvedEdges = [];

  for (const edge of validEdges) {
    const { parent, child } = edge;
    if (childParentMap[child] === undefined) {
      childParentMap[child] = parent;
      resolvedEdges.push(edge);
    }
  }

  const adjacency = {};
  const allNodes = new Set();

  for (const { parent, child } of resolvedEdges) {
    if (!adjacency[parent]) adjacency[parent] = [];
    adjacency[parent].push(child);
    allNodes.add(parent);
    allNodes.add(child);
  }

  const components = findConnectedComponents(allNodes, resolvedEdges);
  const hierarchies = [];

  for (const componentNodes of components) {
    const hierarchy = processComponent(componentNodes, adjacency, childParentMap);
    hierarchies.push(hierarchy);
  }

  return hierarchies;
}

function findConnectedComponents(allNodes, edges) {
  const undirected = {};
  for (const node of allNodes) undirected[node] = new Set();
  for (const { parent, child } of edges) {
    undirected[parent].add(child);
    undirected[child].add(parent);
  }

  const visited = new Set();
  const components = [];

  for (const node of allNodes) {
    if (!visited.has(node)) {
      const component = new Set();
      const queue = [node];
      while (queue.length > 0) {
        const curr = queue.shift();
        if (visited.has(curr)) continue;
        visited.add(curr);
        component.add(curr);
        for (const neighbor of undirected[curr]) {
          if (!visited.has(neighbor)) queue.push(neighbor);
        }
      }
      components.push(component);
    }
  }

  return components;
}

function processComponent(componentNodes, adjacency, childParentMap) {
  const childrenInComponent = new Set(
    [...componentNodes].filter(
      (n) => childParentMap[n] !== undefined && componentNodes.has(childParentMap[n])
    )
  );

  const potentialRoots = [...componentNodes].filter((n) => !childrenInComponent.has(n));

  let root;
  if (potentialRoots.length > 0) {
    root = potentialRoots.sort()[0];
  } else {
    root = [...componentNodes].sort()[0];
  }

  const hasCycle = detectCycle(root, adjacency, componentNodes);

  if (hasCycle) {
    return { root, tree: {}, has_cycle: true };
  }

  const tree = buildTree(root, adjacency);
  const depth = calculateDepth(tree);

  return { root, tree, depth, has_cycle: false };
}

function detectCycle(start, adjacency, componentNodes) {
  const visited = new Set();
  const recursionStack = new Set();

  function dfs(node) {
    visited.add(node);
    recursionStack.add(node);

    const children = (adjacency[node] || []).filter((c) => componentNodes.has(c));
    for (const child of children) {
      if (!visited.has(child)) {
        if (dfs(child)) return true;
      } else if (recursionStack.has(child)) {
        return true;
      }
    }

    recursionStack.delete(node);
    return false;
  }

  for (const node of componentNodes) {
    if (!visited.has(node)) {
      if (dfs(node)) return true;
    }
  }

  return false;
}

function buildTree(node, adjacency) {
  const children = adjacency[node] || [];
  const subtree = {};
  for (const child of children) {
    subtree[child] = buildTree(child, adjacency);
  }
  return subtree;
}

function calculateDepth(tree) {
  const keys = Object.keys(tree);
  if (keys.length === 0) return 1;
  return 1 + Math.max(...keys.map((k) => calculateDepth(tree[k])));
}

function buildSummary(hierarchies) {
  const trees = hierarchies.filter((h) => !h.has_cycle);
  const cycles = hierarchies.filter((h) => h.has_cycle);

  let largestTreeRoot = "";

  if (trees.length > 0) {
    let maxDepth = -Infinity;
    for (const tree of trees) {
      if (tree.depth > maxDepth || (tree.depth === maxDepth && tree.root < largestTreeRoot)) {
        maxDepth = tree.depth;
        largestTreeRoot = tree.root;
      }
    }
  }

  return {
    total_trees: trees.length,
    total_cycles: cycles.length,
    largest_tree_root: largestTreeRoot,
  };
}

module.exports = { buildHierarchies, buildSummary };
