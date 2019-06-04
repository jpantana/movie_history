import firebase from 'firebase/app';
import 'firebase/auth';

import moviesData from '../../helpers/data/moviesData';
// import movies from '../movies/movies';

// deletes card and object
const deleteMoviesEvent = (e) => {
  const movieId = e.target.id.split('.')[1];
  console.error(movieId);
  moviesData.deleteMovie(movieId)
    .then(() => getMovies(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const getMovies = (uid) => {
  moviesData.getMovieByUid(uid)
    .then((movies) => {
      console.error('movies', movies);
      console.error('uid', uid);
    })
    .catch(err => console.error('no friends', err));
};

export default { deleteMoviesEvent };
