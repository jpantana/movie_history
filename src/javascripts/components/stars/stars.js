import util from '../../helpers/util';
import './stars.scss';
import userData from '../../helpers/data/userData';
import watchList from '../watchList/watchList';

const addNewReview = (e, movieId) => {
  const starId = e.target.closest('span').id;
  const starsNumUpdate = {
    stars: parseInt(`${e.target.value}`, 10),
  };
  if (starId === movieId) {
    userData.updateStars(starsNumUpdate.stars, movieId)
      .then(() => {
      }).catch(err => console.error('no star update', err));
  }
};

const addEvents = (movie, j) => {
  let domString = '';
  const toWatchBtn = document.getElementById(`notWatched.${movie.id}`);
  if (toWatchBtn !== null) {
    toWatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      domString += `
        <div class="row justify-content-center p-2 m-2">
          <input type="radio" id="newMovieUserRating1" class="newMovieUserRating" name="newMovieUserRating" value=1><label for="newMovieUserRating1">1</label>
          <input type="radio" id="newMovieUserRating2" class="newMovieUserRating" name="newMovieUserRating" value=2><label for="newMovieUserRating2">2</label>
          <input type="radio" id="newMovieUserRating3" class="newMovieUserRating" name="newMovieUserRating" value=3><label for="newMovieUserRating3">3</label>
          <input type="radio" id="newMovieUserRating4" class="newMovieUserRating" name="newMovieUserRating" value=4><label for="newMovieUserRating4">4</label>
        </div>`;
      util.printToDom(`starsPrint_${j}`, domString);
      if (toWatchBtn.click) {
        watchList.addMovieDataToUserMovie(movie);
      }
      const radioButtons = document.getElementsByClassName('newMovieUserRating');
      for (let i = 0; i < radioButtons.length; i += 1) {
        radioButtons[i].addEventListener('click', (event) => {
          addNewReview(event, movie.id);
        });
      }
    });
  }
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
      <i data-stars="3star" class="stars fas fa-star"></i>
      <i class="far fa-star"></i>`;
    }
    if (movie.stars === 2) {
      domString += `
      <i data-stars="1star" class="stars fas fa-star"></i>
      <i data-stars="2star" class="stars fas fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>`;
    }
    if (movie.stars === 1) {
      domString += `
      <i data-stars="1star" class="stars fas fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>`;
    }
    if (movie.stars === 0) {
      domString += `
      <div class="row justify-content-center p-2 m-2">
        <button id="notWatched.${movie.id}" class="btn btn-danger">Add To Watchlist</button>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
      </div>`;
    }
    util.printToDom(`starsPrint_${i}`, domString);
    addEvents(movie, i);
  });
};

export default { starsToBeChecked, addNewReview, addEvents };
