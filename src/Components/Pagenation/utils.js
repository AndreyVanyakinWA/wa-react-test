export function generatePages(total, limit) {
  const maximumPages = Math.ceil(total / limit)

  return new Array(maximumPages).fill(0).map((_, i) => i + 1)
}
