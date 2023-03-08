const {queryAllCharacters, queryAllComics} = require('../../server.js')

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

    const queryCheck = async function (route) {
        it('check database queries', async function () {
            expect(characterData).notEqual(null)

            expect(comicData).notEqual(null)
        })
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

    describe ("GET '/getSQL'", function () {
        queryCheck('/getSQL')
    })
})