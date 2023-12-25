export function keys<T extends {}>(obj: T) {
  return Object.keys(obj) as unknown as ReadonlyArray<keyof T>;
}
