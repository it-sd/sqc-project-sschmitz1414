require('dotenv').config() // Read environment variables from .env
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5163

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const query = async function (sql, params) {
  let client
  let results = []
  try {
    client = await pool.connect()
    const response = await client.query(sql, params)
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  }
  if (client) client.release()
  return results
}

const queryAllCharacters = async function () {
  const sql = 'SELECT * FROM character;'

  const results = await query(sql)

  return { characters: results }
}

const queryAllComics = async function () {
  const sql = 'SELECT * FROM comic;'

  const results = await query(sql)

  return { comics: results }
}

express()
  .use(express.static(path.join(__dirname, 'static')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async function (req, res) {
    res.render('pages/index')
  })
  .get('/health', async function (req, res) {
    const characters = await queryAllCharacters()
    const comics = await queryAllComics()

    if (characters != null && comics != null) {
      res.status(200).send('healthy')
    } else {
      res.status(500).send('query failed')
    }
  })
  .get('/about', function (req, res) {
    res.render('pages/about')
  })
  .get('/contact', function (req, res) {
    res.render('pages/contact')
  })
  .get('/character', async function (req, res) {
    const characterData = await queryAllCharacters()
    console.log(characterData)
    res.render('pages/character', characterData)
  })
  .get('/comic', async function (req, res) {
    const comicData = await queryAllComics()
    res.render('pages/comic', comicData)
  })
  .post('/feedback', async function (req, res) {
    res.set({ 'Content-Type': 'application.json' })

    try {
      const client = await pool.connect()

      let feedback
      if (req.body.feedback < 0 && req.body.feedback > 3) {
        console.error(`Unexpected feedback of ${req.body.feedback}`)
        res.status(400).json({ ok: false })
        return
      }

      const insertSql = `INSERT INTO feedback (feedback)
        VALUES ($1::INTEGER, $2::FLOAT, NOW());`
      await client.query(insertSql, [feedback])

      res.json({ ok: true })
      client.release()
    } catch (err) {
      console.err(err)
      res.json({ buttons: [], error: err })
    }
  })

  /* .get('/api', async function () {
    const date = new Date().getTime()
    const privKey = '5128770de98ee15fa624b7fe4c20412f12c43827'
    const pubKey = '8db7b8ff6670008cd11d2540fe0cd63e'

    const crypto = require('crypto')
    const hash = crypto.createHash('md5').update(date + privKey + pubKey).digest("hex")
    const endpoint = ('"https://gateway.marvel.com:443/v1/public/comics?apikey=8db7b8ff6670008cd11d2540fe0cd63e&hash=" + hash + ""')

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    console.log(response)

    if (response.ok) {
      const result = await response.json()

      console.log(result)
    }

    const client = await pool.connect()
    const apiSQL = 'INSERT INTO comic (title, creators, startYear) VALUES (title ,creators, startYear);'
    await client.query(apiSQL, [title, creators, startYear])
  }) */
  // end of implementation ///////////////////////////////////
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

module.exports = {
  query,
  queryAllCharacters,
  queryAllComics
}
