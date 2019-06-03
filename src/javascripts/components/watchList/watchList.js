import userData from '../../helpers/data/userData';
import util from '../../helpers/util';

// this builds the objects to send to firebase of user_movie
// its based on the movie that is clicked when add movie button appears and stars = 0 on STARS
const addMovieDataToUserMovie = (movie) => {
  const movieTtl = movie.title;
  const movieId2 = movie.id;
  const movRating = movie.movieRating;
  const moviesOnWatchList = {
    movieId: '',
    movieTitle: '',
    rating: '',
  };
  moviesOnWatchList.movieTitle = movieTtl;
  moviesOnWatchList.movieId = movieId2;
  moviesOnWatchList.rating = movRating;
  // console.error('this movie to be added', movie.title);
  userData.watchListMovies(moviesOnWatchList)
    .then(() => {})
    .catch(err => console.error('no new moive added to watch list', err));
};

// import from axios call movies in moviesData
// the stars printing depends on it
// in theory this should print the user_movie data beneath the movie cards i think
const addToWatchList = (moviesToWatch) => {
  let domString = '';
  userData.watchListsOnWatchList(moviesToWatch)
    .then((results) => {
      const userMovieResults = results;
      domString += '<h1>Movies I Want To Watch</h1>';
      userMovieResults.forEach((userMovie) => {
        domString += `
      <div class="col-3 mb-5 justify-content-center">
        <div id="" class="card">
          <h3>${userMovie.movieTitle}</h3>
          <h5>${userMovie.rating}</h5>
        </div>
      </div>`;
      });
      util.printToDom('watchListDiv', domString);
    })
    .catch(err => console.error('no movies to watch', err));
};

export default { addToWatchList, addMovieDataToUserMovie };
