import { generatePages } from './utils'

describe('Pagenation utils', () => {
  describe('generatePages()', () => {
    it('should return empty array', () => {
      expect(generatePages(0, 10)).toEqual([])
      expect(generatePages(10, 0)).toEqual([])
      expect(generatePages(-10, 0)).toEqual([])
      expect(generatePages(10, -10)).toEqual([])
    })

    it('should return page numbers', () => {
      expect(generatePages(25, 10)).toEqual([1, 2, 3])
    })
  })
})
