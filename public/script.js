// ============================
// Genre Map (TMDB genre IDs)
// ============================
const genreMap = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Romance: 10749,
  Detective: 80, // Crime in TMDB
  "Sci-Fi": 878,
}

// ============================
// Get Form Element
// ============================
const form = document.getElementById('preference-form')

// ============================
// Handle Form Submit
// ============================
form.addEventListener('submit', async function (e) {
  e.preventDefault()

  const genre = document.getElementById('genre').value
  const language = document.getElementById('language').value
  const mood = document.getElementById('mood').value
  const yearFrom = document.getElementById('yearFrom').value
  const yearTo = document.getElementById('yearTo').value

  const genreId = genreMap[genre]

  try {
    const res = await fetch(
      `/movies?genreId=${genreId}&language=${language}&yearFrom=${yearFrom}&yearTo=${yearTo}`
    )
    const data = await res.json()
    showMovies(data.results, mood)
  } catch (err) {
    console.error('Failed to fetch:', err)
  }
})

// ============================
// Show Movies Function
// ============================
function showMovies(movies, mood) {
  const results = document.getElementById('results')
  results.innerHTML = '' // clear old results

  if (!movies || movies.length === 0) {
    results.innerHTML = `<p>No movies found. Try different filters.</p>`
    return
  }

  movies.forEach(movie => {
    const div = document.createElement('div')
    div.className = 'movie-card'
    div.innerHTML = `
      <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}" 
         alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p><strong>Release:</strong> ${movie.release_date || 'N/A'}</p>
      <p><strong>Language:</strong> ${movie.original_language}</p>
      <p><strong>Overview:</strong> ${movie.overview || 'No description available.'}</p>
    `
    results.appendChild(div)
  })
}
