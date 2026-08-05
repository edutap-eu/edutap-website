/**
 * Picks a class string out of a variant table, restricted to the table's own
 * keys.
 *
 * Astro does not enforce prop types at runtime, so `variant` and `size` props
 * arrive as whatever a caller wrote. A plain `table[key]` lookup then reaches
 * through the prototype chain: `table["__proto__"]` returns an object and
 * `table["toString"]` a function, and both stringify straight into a class
 * attribute as "[object Object]" or as the function's source. A `?? fallback`
 * does not catch either, because both values are truthy.
 *
 * `Object.hasOwn` limits the lookup to the keys the table actually declares,
 * so anything else - a typo, a removed variant, a prototype key - lands on the
 * component's default instead of in the markup.
 */
export function variantClass<T extends Record<string, string>>(
  table: T,
  key: unknown,
  fallback: keyof T,
): string {
  return typeof key === "string" && Object.hasOwn(table, key)
    ? table[key]
    : table[fallback];
}
