import firebase from 'firebase/app';
import 'firebase/auth';

import userData from '../../helpers/data/userData';
import util from '../../helpers/util';
import moviesData from '../../helpers/data/moviesData';
import './watchList.scss';

const deleteMoviesEvent = (e, m) => {
  const movieId = e.target.id.split('.')[1];
  moviesData.deleteMovie(movieId)
    .then(() => {
      getMovies(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
      console.error(m);
      addToWatchList(m); // eslint-disable-line no-use-before-define
    }).catch(err => console.error('no deletion', err));
};

const getMovies = (uid) => {
  moviesData.getMovieByUid(uid) // uid being passed un-hides green checkbox in all movies
    .then(() => { // resp is all movies
    })
    .catch(err => console.error('no movies from moviesData', err));
};

const starsToBeCheckedOnWatched = (m, userMovieResults) => {
  userMovieResults.forEach((userM, i) => {
    let domString = '';
    if (m.stars >= 0) {
      domString += `<i class="starsPosClass2 ${m.stars > 0 ? 'fas' : 'far'} stars fa-star"></i><input id="1star.starsPrint_${i}" type="radio" class="starsPosClass" value="1">`;
      domString += `<i class="starsPosClass2 ${m.stars > 1 ? 'fas' : 'far'} stars fa-star"></i><input id="2star.starsPrint_${i}" type="radio" class="starsPosClass" value="2">`;
      domString += `<i class="starsPosClass2 ${m.stars > 2 ? 'fas' : 'far'} stars fa-star"></i><input id="3star.starsPrint_${i}" type="radio" class="starsPosClass" value="3">`;
      domString += `<i class="starsPosClass2 ${m.stars > 3 ? 'fas' : 'far'} stars fa-star"></i><input id="4star.starsPrint_${i}" type="radio" class="starsPosClass" value="4">`;
      domString += `<i class="starsPosClass2 ${m.stars > 4 ? 'fas' : 'far'} stars fa-star"></i><input id="5star.starsPrint_${i}" type="radio" class="starsPosClass" value="5">`;
    }
    util.printToDom(`starsPrint_${i}.watchList`, domString);
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// import from axios call movies in moviesData
// the stars printing depends on it
// this will print the user_movie data beneath the movie cards
const addToWatchList = (m) => {
  let domString = '';
  userData.watchListsOnWatchList()
    .then((results) => {
      const userMovieResults = results;
      domString += '<h1 class="text-center watchListHeader">Movies I Want To Watch</h1>';
      domString += '<div class="secondDiv container">';
      domString += '  <div id="movieRow" class="d-flex justify-content-center">';
      userMovieResults.forEach((userMovie, i) => {
        domString += `
      <div class="col-4 mb-5 justify-content-center">
        <div id="" class="card movieCards">
          <div class="card-header cardHeader"><h3 id="" class="text-center">${userMovie.movieTitle}</h3><i id="deleteBtn.${userMovie.id}" class="fas fa-trash-alt dltBtn"></i></div>
            <img id="${userMovie.imageUrl}" class="card-img posters2" src="${userMovie.imageUrl}" alt="movie poster for ${userMovie.movieTitle}"/>
          <span id="${userMovie.id}" class="card-body">
            <div id="starsPrint_${i}.watchList"></div>
            <p class="card-text movieRatingWatchList">${userMovie.rating}</p>
          </span>
      </div>
    </div>`;
      });
      util.printToDom('watchListDiv', domString);
      starsToBeCheckedOnWatched(m, userMovieResults);
      userMovieResults.forEach((userMovie) => {
        const dltEvents = document.getElementById(`deleteBtn.${userMovie.id}`);
        dltEvents.addEventListener('click', (e) => {
          deleteMoviesEvent(e, userMovie);
          document.getElementById(`isOnWatchList.${userMovie.movieTitle}`).classList.add('hide');
          document.getElementById(`isNotOnWatchList.${userMovie.movieTitle}`).classList.remove('hide');
        });
      });
    })
    .catch((err) => {
      util.printToDom('watchListDiv', domString);
      console.error('no movies to watch', err);
    });
};

export default { addToWatchList };
