const { queryAllCharacters, queryAllComics } = require('../../server.js')

describe('server', function () {
  const baseURL = 'http://localhost:5163'

  const shouldBeAbove200 = async function (route) {
    it('should be above 200', async function () {
      const url = new URL(route, baseURL)

      const res = await fetch(url)

      expect(res.status).toBeGreaterThanOrEqual(200)
    }, 10000)
  }

  const shouldBeBelow399 = async function (route) {
    it('should be below 399', async function () {
      const url = new URL(route, baseURL)

      const res = await fetch(url)

      expect(res.status).toBeLessThanOrEqual(399)
    }, 10000)
  }

  describe("GET '/health'", function () {
    shouldBeAbove200('/health')
  })

  describe("GET '/health'", function () {
    shouldBeBelow399('/health')
  })

  describe("GET '/'", function () {
    shouldBeAbove200('/health')
  })

  describe("GET '/'", function () {
    shouldBeBelow399('/health')
  })

  describe('queryAllCharacters', function () {
    it('should be defined', async function () {
      const characterData = await queryAllCharacters()
      expect(characterData).toBeDefined()
    })
  })

  describe('queryAllComics', function () {
    it('should be defined', async function () {
      const comicData = await queryAllComics()
      expect(comicData).toBeDefined()
    })
  })
})
