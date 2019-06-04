import userData from '../../helpers/data/userData';
import util from '../../helpers/util';
import deleteCards from '../deleteCards/deleteCards';

// this builds the objects to send to firebase of user_movie
// its based on the movie that is clicked when add movie button appears and stars = 0 on STARS
const addMovieDataToUserMovie = (movie) => {
  const movieTtl = movie.title;
  const movieId2 = movie.id;
  const movRating = movie.movieRating;
  const movImg = movie.imageUrl;
  const moviesOnWatchList = {
    movieId: '',
    movieTitle: '',
    rating: '',
    isWatched: false,
  };
  moviesOnWatchList.movieTitle = movieTtl;
  moviesOnWatchList.movieId = movieId2;
  moviesOnWatchList.rating = movRating;
  moviesOnWatchList.imageUrl = movImg;
  // console.error('this movie to be added', movie.title);
  userData.watchListMovies(moviesOnWatchList)
    .then(() => {})
    .catch(err => console.error('no new moive added to watch list', err));
};

// import from axios call movies in moviesData
// the stars printing depends on it
// in theory this should print the user_movie data beneath the movie cards i think
const addToWatchList = () => {
  let domString = '';
  userData.watchListsOnWatchList()
    .then((results) => {
      const userMovieResults = results;
      domString += '<h1>Movies I Want To Watch</h1>';
      userMovieResults.forEach((userMovie, i) => {
        domString += `
      <div class="col-5 mb-5 justify-content-center">
      <div id="" class="card movieCards">
        <div class="card-header cardHeader"><h3 id="" class="text-center">${userMovie.movieTitle}</h3><i id="deleteBtn.${userMovie.id}" class="fas fa-trash-alt dltBtn"></i></div>
          <img id="${userMovie.imageUrl}" class="card-img" src="${userMovie.imageUrl}" alt="movie poster for ${userMovie.movieTitle}"/>
        <span id="${userMovie.id}" class="card-body">
          <div id="starsPrint_${i}"></div>
          <button class="hide btn btn-success" id="onWatchList_${i}">On Watch List</button>
          <p class="card-text movieRating">Rated: ${userMovie.rating}</p>
        </span>
        <div id="newStarsPrint_${i}"></div>
      </div>
    </div>`;
      });
      util.printToDom('watchListDiv', domString);
      userMovieResults.forEach((userMovie) => {
        const dltEvents = document.getElementById(`deleteBtn.${userMovie.id}`);
        dltEvents.addEventListener('click', (e) => {
          deleteCards.deleteMoviesEvent(e, userMovie);
        });
      });
    })
    .catch(err => console.error('no movies to watch', err));
};

export default { addToWatchList, addMovieDataToUserMovie };
