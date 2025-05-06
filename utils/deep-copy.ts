export function deepCloneValue<T>(value: T): T {
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (value instanceof Map) return deepCopyMap(value as Map<any, any>) as T;
  if (Array.isArray(value)) return value.map(deepCloneValue) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepCloneValue(v)])
    ) as T;
  }
  return value;
}

export function deepCopyMap<K, V>(originalMap: Map<K, V>): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of originalMap) {
    newMap.set(key, deepCloneValue(value));
  }
  return newMap;
}
