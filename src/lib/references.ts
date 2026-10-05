type References = ReadonlyMap<string, readonly string[]>;

/** Fail the build on indirect cycles without changing how references are stored. */
export function assertAcyclicReferences(references: References, label: string) {
  const complete = new Set<string>();
  const active = new Set<string>();
  const chain: string[] = [];
  const visit = (id: string) => {
    if (active.has(id)) throw new Error(`${label}參照形成循環：${[...chain, id].join(' → ')}`);
    if (complete.has(id)) return;
    const children = references.get(id);
    if (!children) throw new Error(`${label}找不到參照：${id}`);
    active.add(id);
    chain.push(id);
    children.forEach(visit);
    chain.pop();
    active.delete(id);
    complete.add(id);
  };
  references.forEach((_, id) => visit(id));
}

/** Both sides of a stored song/release relationship must agree. */
export function assertBidirectionalReferences(left: References, right: References, label: string) {
  for (const [id, targets] of left) for (const target of targets) {
    if (!right.get(target)?.includes(id)) throw new Error(`${label}雙向參照不一致：${id} → ${target}`);
  }
  for (const [id, targets] of right) for (const target of targets) {
    if (!left.get(target)?.includes(id)) throw new Error(`${label}雙向參照不一致：${target} → ${id}`);
  }
}
