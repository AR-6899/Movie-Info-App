const sch_btn = document.querySelector('.sch-btn');
const sch_bar = document.querySelector('.sch-bar');
const movie_bdy = document.querySelector('.movie-bdy');

const getMovie = async (movie_name) => {
    let res = await fetch(`http://www.omdbapi.com/?t=${movie_name}&apikey=${key}`);
    let data = await res.json();
    if (data.Response == "True")
        return data;
    else {
        alert("No such movie found");
        return null;
    }
}

const renderMovie = (movie) => {
    let moviebox = document.createElement('div');
    moviebox.className = 'moviebox';
    let rating = movie.Ratings[0].Value.split('/')[0];
    moviebox.innerHTML = `
    <div class="head">
        <div class="poster">
            <img src="${movie.Poster}" alt="poster">
        </div>
        <div class="info">
            <div class="title text-l">${movie.Title}</div>
            <div class="rating">
                <img src="star_icon.png" alt="star-icon" class="icon">
                <span class="text-b">
                    ${rating}
                </span>
            </div> 
            <div class="add-info">
                <div class="rated text-g">${movie.Rated}</div>
                <div class="year text-g">${movie.Year}</div>
                <div class="dur text-g">${movie.Runtime}</div>
            </div>
            <div class="genre text-g">${movie.Genre}</div>
        </div>
    </div>

    <div class="body">
        <div class="director">
            <div class="text-b">Director:</div>
            <div class="text-g">${movie.Director}</div>
        </div>
        <div class="plot">
            <div class="text-b">Plot:</div>
            <div class="text-g">${movie.Plot}</div>
        </div>
        <div class="cast">
            <div class="text-b">Cast:</div>
            <div class="text-g">${movie.Actors}</div>
        </div>
    </div>
    `
    movie_bdy.innerHTML = "";
    movie_bdy.append(moviebox);
}

sch_btn.addEventListener('click', async () => {
    let movie_name = sch_bar.value;
    if (movie_name) {
        let movie = await getMovie(movie_name);
        if (movie)
            renderMovie(movie);
    }
    else
        alert('Please enter a movie name');
});