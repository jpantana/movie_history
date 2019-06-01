import util from '../../helpers/util';
import moviesData from '../../helpers/data/moviesData';
import './stars.scss';

const addNewReview = (movie) => {
  // moviesData.getMovieByUid().then((movies) => { // don't need this, bc the movie passed
  // movies.forEach((movie, i) => {
  const newStarObj = {
    imageUrl: movie.imageUrl,
    title: movie.title,
    isWatched: false,
    movieRating: movie.movieRating,
    stars: 0,
  };
  const howManyStars = document.getElementsByName('newMovieUserRating');
  howManyStars.forEach((star) => {
    star.addEventListener('click', (event) => {
      event.preventDefault();
      if (star.checked) {
        const numOfStars = parseInt(`${star.value}`, 10);
        // console.error(star);
        newStarObj.stars = numOfStars;
        console.error(newStarObj.stars);
        moviesData.makeNewMovie(newStarObj)
          .then(() => {
            // movies.movieCardBuilder();
          }).catch(err => console.error(err));
      }
    });
  });
  // });
  // }).catch(err => console.error('could not get movie', err));
};

const starsToBeChecked = (movies) => {
  movies.forEach((movie, i) => {
    let domString = '';
    if (movie.stars === 4) {
      domString += `
      <i data-stars="1star" class="stars fas fa-star"></i>
      <i data-stars="2star" class="stars fas fa-star"></i>
      <i data-stars="3star" class="stars fas fa-star"></i>
      <i data-stars="4star" class="stars fas fa-star"></i>`;
    }
    if (movie.stars === 3) {
      domString += `
      <i data-stars="1star" class="stars fas fa-star"></i>
      <i data-stars="2star" class="stars fas fa-star"></i>
      <i data-stars="3star" class="stars fas fa-star"></i>`;
    }
    if (movie.stars === 2) {
      domString += `
      <i data-stars="1star" class="stars fas fa-star"></i>
      <i data-stars="2star" class="stars fas fa-star"></i>`;
    }
    if (movie.stars === 1) {
      domString += `
      <i data-stars="1star" class="stars fas fa-star"></i>`;
    }
    if (movie.stars === 0) {
      // domString += '<label>Rate This Movie:</label><input type=
      // "text" class="form-control" id="" placeholder="Enter 1 - 4" class="">';
      // need to import a matching id of object that needs new stars given
      console.error(movie.id);
      domString += `
      <div class="row justify-content-center p-2 m-2">
        <input type="radio" name="newMovieUserRating" value=1><label>1</label>
        <input type="radio" name="newMovieUserRating" value=2><label>2</label>
        <input type="radio" name="newMovieUserRating" value=3><label>3</label>
        <input type="radio" name="newMovieUserRating" value=4><label>4</label>
      </div>`;
      addNewReview(movie);
    }
    util.printToDom(`starsPrint_${i}`, domString);
  });
};

export default { starsToBeChecked, addNewReview };
