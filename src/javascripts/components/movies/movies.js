import util from '../../helpers/util';
import moviesData from '../../helpers/data/moviesData';
import watchList from '../watchList/watchList';
import userData from '../../helpers/data/userData';
import userList from '../userList/userList';
import './movies.scss';
// import SMASH from '../../helpers/SMASH';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// adds stars to new movies and must be on To Watch list first
const addNewStarReview = (e, movieId) => {
  const starsNumUpdate = {
    stars: parseInt(`${e.target.value}`, 10),
  };
  const starId = e.target.closest('span').id;
  if (starId === movieId) {
    userData.updateStars(starsNumUpdate.stars, movieId)
      .then(() => {
        movieCardBuilder(); // eslint-disable-line no-use-before-define
      }).catch(err => console.error('no star update', err));
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// changes minus icon to check symbol in movie card header if added to user_movie
const changeCardWatchListStatus = (movies) => {
  userData.watchListsOnWatchList()
    .then((watchListResolve) => {
      watchListResolve.forEach((userMov) => {
        // console.error(userMov);
        movies.forEach((m) => {
          // const finalMovieUser = SMASH.usersAndMovies(movies, userMov);
          // console.error(finalMovieUser);
          if (userMov.movieTitle === m.title) {
            document.getElementById(`isOnWatchList.${m.title}`).classList.remove('hide');
            watchList.addToWatchList(m, userMov);
          }
        });
      });
    })
    .catch(err => console.error('watchlist is empty', err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// add events based on stars. called by starsToBeChecked
const addEvents = (movie, j) => {
  const newStarRankingEvent = document.getElementsByClassName('starsPosClass');
  for (let t = 0; t < newStarRankingEvent.length; t += 1) {
    newStarRankingEvent[t].addEventListener('click', (evt) => {
      const starDivId = evt.target.closest('div').id;
      const matchStarId = evt.target.id.split('.')[1];
      if (starDivId === matchStarId) {
        addNewStarReview(evt, movie.id);
      }
    });
  }
  const toWatchBtn = document.getElementById(`notYetWatched.${movie.id}`);
  if (toWatchBtn !== null) {
    toWatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (toWatchBtn.click) {
        userList.addMovieDataToUserMovie(movie);
        movieCardBuilder(); // eslint-disable-line no-use-before-define
        document.getElementById(`onWatchList_${j}`).classList.remove('hide');
      }
    });
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stars functionality - reads the key/value of stars in movies.json
const starsToBeChecked = (movies) => {
  movies.forEach((movie, i) => {
    let domString = '';
    if (movie.stars >= 0) {
      domString += `<i class="starsPosClass2 ${movie.stars > 0 ? 'fas' : 'far'} stars fa-star"></i><input id="1star.starsPrint_${i}" type="radio" class="starsPosClass" value="1">`;
      domString += `<i class="starsPosClass2 ${movie.stars > 1 ? 'fas' : 'far'} stars fa-star"></i><input id="2star.starsPrint_${i}" type="radio" class="starsPosClass" value="2">`;
      domString += `<i class="starsPosClass2 ${movie.stars > 2 ? 'fas' : 'far'} stars fa-star"></i><input id="3star.starsPrint_${i}" type="radio" class="starsPosClass" value="3">`;
      domString += `<i class="starsPosClass2 ${movie.stars > 3 ? 'fas' : 'far'} stars fa-star"></i><input id="4star.starsPrint_${i}" type="radio" class="starsPosClass" value="4">`;
      domString += `<i class="starsPosClass2 ${movie.stars > 4 ? 'fas' : 'far'} stars fa-star"></i><input id="5star.starsPrint_${i}" type="radio" class="starsPosClass" value="5">`;
    }
    util.printToDom(`starsPrint_${i}`, domString);
    addEvents(movie, i);
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// builds movie cards from movies data
const movieCardBuilder = () => {
  let domString = '<div class="container">';
  domString += '  <div id="movieRow" class="d-flex justify-content-center">';
  moviesData.getMovieByUid().then((movies) => {
    movies.forEach((movie, i) => {
      domString += ` 
          <div class="col-4 mb-5 justify-content-center">
            <div id="" class="card movieCards">
              <div class="card-header cardHeader">
                <h3 id="${movie.title}" class="text-center">${movie.title}</h3>
                <div class="row watchListDiv">
                  <p class="saysWatchList"></p>
                    <i id="isNotOnWatchList.${movie.title}" class="notOnWatchListFa far fa-minus-square"></i>
                    <i id="isOnWatchList.${movie.title}" class="hide onWatchListFa fas fa-check-square"></i>
                </div>
              </div>
              <img id="${movie.imageUrl}" class="card-img posters" src="${movie.imageUrl}" alt="movie poster for ${movie.title}"/>
              <span id="${movie.id}" class="card-body">
                <button class="btn btn-danger addToWatchListBtn" id="notYetWatched.${movie.id}">Watch Later</button>
                <div id="starsPrint_${i}" class="starsContainer"></div>
              </span>
              <p class="card-text movieRating">${movie.movieRating}</p>
            </div>
          </div>`;
    });
    domString += '  </div>';
    domString += '</div>';
    util.printToDom('event', domString);
    starsToBeChecked(movies);
    changeCardWatchListStatus(movies);
  }).catch(err => console.error('could not get movie', err));
};

export default { movieCardBuilder };
