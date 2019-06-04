import firebase from 'firebase/app';
import 'firebase/auth';
import moviesData from '../../helpers/data/moviesData';

// deletes card and object
const deleteMoviesEvent = (e) => {
  const movieId = e.target.id.split('.')[1];
  moviesData.deleteMovie(movieId)
    .then(() => {
      getMovies(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
      document.location.reload();
    }).catch(err => console.error('no deletion', err));
};

const getMovies = (uid) => {
  moviesData.getMovieByUid(uid)
    .then(() => {
    })
    .catch(err => console.error('no movies from moviesData', err));
};

export default { deleteMoviesEvent };
