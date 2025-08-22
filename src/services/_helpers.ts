export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}
