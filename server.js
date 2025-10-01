import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

// Allow frontend files to load (if you put index.html in "public")
app.use(express.static('public'))

// API route to fetch movies
app.get('/movies', async (req, res) => {
  const { genreId, language, yearFrom, yearTo } = req.query

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreId}&language=${language}&sort_by=popularity.desc`

  if (yearFrom && yearTo) {
    url += `&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31`
  }

  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('Server fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch movies' })
  }
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
