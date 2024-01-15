export function generatePages(total, limit = 10) {
  if (limit === 0 || total <= 0 || limit <= 0) return []

  const maximumPages = Math.ceil(total / limit)

  return new Array(maximumPages).fill(0).map((_, i) => i + 1)
}
