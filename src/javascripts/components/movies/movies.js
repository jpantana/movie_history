import util from '../../helpers/util';
import moviesData from '../../helpers/data/moviesData';
import watchList from '../watchList/watchList';
import userData from '../../helpers/data/userData';
import './movies.scss';

// adds star rating to new movies and must be on To Watch list first
const addNewReview = (e, movieId) => {
  const starId = e.target.closest('span').id;
  const starsNumUpdate = {
    stars: parseInt(`${e.target.value}`, 10),
  };
  if (starId === movieId) {
    userData.updateStars(starsNumUpdate.stars, movieId)
      .then(() => {
        movieCardBuilder(); // eslint-disable-line no-use-before-define
      }).catch(err => console.error('no star update', err));
  }
};
const changeCardWatchListStatus = (movie) => {
  userData.watchListsOnWatchList()
    .then((watchListResolve) => {
      watchListResolve.forEach((userMov) => {
        if (userMov.movieTitle === movie.title) {
          document.getElementById(`isOnWatchList.${movie.title}`).classList.remove('hide');
          document.getElementById(`isNotOnWatchList.${movie.title}`).classList.add('hide');
        }
      });
    })
    .catch(err => console.error('not getting watchlist info for checkbox', err));
};

// add events based on stars. called by starsToBeChecked
const addEvents = (movie, j) => {
  let domString = '';
  const toWatchBtn = document.getElementById(`notWatched.${movie.id}`);
  if (toWatchBtn !== null) {
    toWatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      domString += `
        <div class="row justify-content-center p-2 m-2">
          <input type="radio" id="newMovieUserRating1" class="form-radio newMovieUserRating" name="newMovieUserRating" value=1><label for="newMovieUserRating1">1</label>
          <input type="radio" id="newMovieUserRating2" class="form-radio newMovieUserRating" name="newMovieUserRating" value=2><label for="newMovieUserRating2">2</label>
          <input type="radio" id="newMovieUserRating3" class="form-radio newMovieUserRating" name="newMovieUserRating" value=3><label for="newMovieUserRating3">3</label>
          <input type="radio" id="newMovieUserRating4" class="form-radio newMovieUserRating" name="newMovieUserRating" value=4><label for="newMovieUserRating4">4</label>
        </div>`;
      util.printToDom(`starsPrint_${j}`, domString);
      if (toWatchBtn.click) {
        watchList.addMovieDataToUserMovie(movie);
        // document.getElementById(`onWatchList_${j}`).classList.remove('hide');
      }
      const radioButtons = document.getElementsByClassName('newMovieUserRating');
      for (let i = 0; i < radioButtons.length; i += 1) {
        radioButtons[i].addEventListener('click', (event) => {
          addNewReview(event, movie.id);
          watchList.callMovieCardBuilder();
        });
      }
    });
  }
};

// checks to see if a movie has 0 stars, and prints correct num of star fa fas
const starsToBeChecked = (movies) => {
  movies.forEach((movie, i) => {
    let domString = '';
    if (movie.stars === 4) {
      domString += `
      <i data-stars="1star" class="starsPosClass stars fas fa-star"></i>
      <i data-stars="2star" class="starsPosClass stars fas fa-star"></i>
      <i data-stars="3star" class="starsPosClass stars fas fa-star"></i>
      <i data-stars="4star" class="starsPosClass stars fas fa-star"></i>`;
    }
    if (movie.stars === 3) {
      domString += `
      <i data-stars="1star" class="starsPosClass stars fas fa-star"></i>
      <i data-stars="2star" class="starsPosClass stars fas fa-star"></i>
      <i data-stars="3star" class="starsPosClass stars fas fa-star"></i>
      <i class="starsPosClass far fa-star"></i>`;
    }
    if (movie.stars === 2) {
      domString += `
      <i data-stars="1star" class="starsPosClass stars fas fa-star"></i>
      <i data-stars="2star" class="starsPosClass stars fas fa-star"></i>
      <i class="starsPosClass far fa-star"></i>
      <i class="starsPosClass far fa-star"></i>`;
    }
    if (movie.stars === 1) {
      domString += `
      <i data-stars="1star" class="starsPosClass stars fas fa-star"></i>
      <i class="starsPosClass far fa-star"></i>
      <i class="starsPosClass far fa-star"></i>
      <i class="starsPosClass far fa-star"></i>`;
    }
    if (movie.stars === 0) {
      domString += `
      <div class="row justify-content-center p-2 m-2">
        <button id=id="onWatchList_${i}" class="btn btn-danger addMovieBtn">Review</button>
        <i class="starsPosClass2 far fa-star"></i>
        <i class="starsPosClass2 far fa-star"></i>
        <i class="starsPosClass2 far fa-star"></i>
        <i class="starsPosClass2 far fa-star"></i>
      </div>`;
    }
    util.printToDom(`starsPrint_${i}`, domString);
    addEvents(movie, i);
  });
};

const movieCardBuilder = () => {
  let domString = '<div class="container">';
  domString += '  <div id="movieRow" class="d-flex justify-content-center">';
  moviesData.getMovieByUid().then((movies) => {
    movies.forEach((movie, i) => {
      domString += ` 
          <div class="col-5 mb-5 justify-content-center">
            <div id="" class="card movieCards">
              <div class="card-header cardHeader"><h3 id="${movie.title}" class="text-center">${movie.title}</h3>
                <p class="saysWatchList">Watch List</p>
                  <i id="isNotOnWatchList.${movie.title}" class="onWatchListFa far fa-minus-square"></i>
                  <i id="isOnWatchList.${movie.title}" class="hide onWatchListFa fas fa-check-square"></i>
              </div>
              <img id="${movie.imageUrl}" class="card-img" src="${movie.imageUrl}" alt="movie poster for ${movie.title}"/>
              <span id="${movie.id}" class="card-body">
              <div id="starsPrint_${i}"></div>
              <button class="btn btn-success" id="notWatched.${movie.id}">On Watch List</button>
                <p class="card-text movieRating">Rated: ${movie.movieRating}</p>
              </span>
              <div id="newStarsPrint_${i}"></div>
            </div>
          </div>`;
      changeCardWatchListStatus(movie);
    });
    domString += '  </div>';
    domString += '</div>';
    util.printToDom('event', domString);
    watchList.addToWatchList(movies);
    starsToBeChecked(movies);
  }).catch(err => console.error('could not get movie', err));
};

export default { movieCardBuilder };
