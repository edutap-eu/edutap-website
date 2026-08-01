/**
 * Comparator that recovers the original JSON file order from ids produced by
 * `content.config.ts`'s `indexed()` loader parser (`${prefix}-${index}`).
 *
 * `getCollection()` sorts entries by `id` as a *string*, not by the number
 * embedded in it - "history-10" comes back before "history-2". Every
 * collection loaded from a plain JSON array (history, roadmap, presentations,
 * team, nav) needs this to render in the order editors maintain in the file,
 * which is also the order the live site renders.
 */
export function byFileOrder(a: { id: string }, b: { id: string }): number {
  return Number(a.id.split("-").pop()) - Number(b.id.split("-").pop());
}
