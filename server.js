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
  .get('/character', function (req, res) {
    res.render('pages/character')
  })
  .get('/comic', function (req, res) {
    res.render('pages/comic')
  })
  .get('/contact', function (req, res) {
    res.render('pages/contact')
  })
  .get('/character', async function (req, res) {
    const characterData = await queryAllCharacters()
    console.log("characterData" + characterData)
    res.render('pages/character', characterData)
  })
  .get('/comic', async function (req, res) {
    const comicData = await queryAllComics()
    res.render('pages/comic', comicData)
  })
  // end of implementation ///////////////////////////////////
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

module.exports = {
  query,
  queryAllCharacters,
  queryAllComics
}
