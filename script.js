const API_KEY = '';
const form = document.getElementById('preference-form');

const genreMap = {
  'Action': 28,
  'Comedy': 35,
  'Drama': 18,
  'Romance': 10749,
  'Sci-Fi': 878,
  'Detective': '9648,80' // maps to Mystery
};


form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const genre = document.getElementById('genre').value;
  const language = document.getElementById('language').value;
  const mood = document.getElementById('mood').value;

  const genreId = genreMap[genre];

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=${language}&sort_by=popularity.desc`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results, mood);
  } catch (err) {
    console.error('Failed to fetch:', err);
  }
});

function showMovies(movies, mood) {
  const results = document.getElementById('results') || createResultsContainer();
  results.innerHTML = ''; // clear old results

  const moodMsg = document.createElement('h3');
  moodMsg.textContent = `Recommended for your "${mood}" mood`;
  results.appendChild(moodMsg);

  movies.slice(0, 5).forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
      <h4>${movie.title}</h4>
      <p>${movie.overview.slice(0, 100)}...</p>
      <p><strong>Rating:</strong> ${movie.vote_average}</p>
    `;
    results.appendChild(card);
  });
}

function createResultsContainer() {
  const container = document.createElement('section');
  container.id = 'results';
  container.classList.add('results');
  document.body.appendChild(container);
  return container;
}

// For release year
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const genre = document.getElementById('genre').value;
  const language = document.getElementById('language').value;
  const mood = document.getElementById('mood').value;
  const yearFrom = document.getElementById('yearFrom').value;
  const yearTo = document.getElementById('yearTo').value;

  const genreId = genreMap[genre];

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=${language}&sort_by=popularity.desc`;

  if (yearFrom && yearTo) {
    url += `&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results, mood);
  } catch (err) {
    console.error('Failed to fetch:', err);
  }
});

