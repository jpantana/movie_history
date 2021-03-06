import userData from '../../helpers/data/userData';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this builds the objects to send to firebase of user_movie
// its based on the movie that is clicked when add movie button appears and stars = 0 on STARS
const addMovieDataToUserMovie = (movie) => {
  const movieTtl = movie.title;
  const movieId2 = movie.id;
  const movieStars = movie.stars;
  const movRating = movie.movieRating;
  const movImg = movie.imageUrl;
  const moviesOnWatchList = {
    movieId: '',
    movieTitle: '',
    rating: '',
    isWatched: false,
    stars: movieStars, // just added this
  };
  moviesOnWatchList.movieTitle = movieTtl;
  moviesOnWatchList.movieId = movieId2;
  moviesOnWatchList.rating = movRating;
  moviesOnWatchList.imageUrl = movImg;
  userData.watchListMovies(moviesOnWatchList)
    .then(() => {})
    .catch(err => console.error('no new moive added to watch list', err));
};

export default { addMovieDataToUserMovie };
