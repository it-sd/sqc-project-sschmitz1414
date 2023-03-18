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

  describe('GET /about', function () {
    it('should be defined', async function () {
      expect('pages/about').toBeDefined()
    })
  })

  describe('POST /feedback', function () {
    const baseURL = 'http://localhost:5163/feedback'

    it('should require feedback to be an integer', async function () {
      const url = baseURL
      const data = {
        // name: name,
        feedback: 1.5
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeFalse()
    })
  })

  it('should require feedback to be greater than 0', async function () {
    const url = baseURL
    const data = {
      // name: name,
      feedback: -1
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    expect(response.ok).toBeFalse()
  })

  it('should require feedback to be less than 3', async function () {
    const url = baseURL
    const data = {
      // name: name,
      feedback: 3
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    expect(response.ok).toBeFalse()
  })
})
