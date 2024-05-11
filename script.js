const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7fb4010053729cc6b550f6418cb2e89c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7fb4010053729cc6b550f6418cb2e89c&query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
//GET INTITIAL MOVIES

if(localStorage.getItem("url") === null){
    localStorage.setItem("url", API_URL) 
}

getMovies(localStorage.getItem("url"))

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHtml = ' ';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie
        
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <div class="movie1">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
                <div class="overview">
                    <h3>Overview</h3>
                ${overview}
                </div>
        </div>
         `
        main.appendChild(movieEl)
    })
}


function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !== ''){
        main.innerHTML = '';
        getMovies(SEARCH_API + searchTerm)
    }else{
        window.location.reload()
    }
})
