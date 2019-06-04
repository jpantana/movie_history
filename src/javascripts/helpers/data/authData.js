import firebase from 'firebase/app';
import 'firebase/auth';
// components
import movies from '../../components/movies/movies';
import auth from '../../components/auth/auth';
import movieInput from '../../components/movieInput/movieInput';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const authDiv = document.getElementById('auth');
const moviesNavbar = document.getElementById('navbar-button-movies');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const navbarBrand = document.getElementById('navBarBrand');
const movieForm = document.getElementById('movieForm');
const movieCards = document.getElementById('event');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      moviesNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      navbarBrand.classList.remove('hide');
      movieForm.classList.remove('hide');
      movieCards.classList.remove('hide');
      movieInput.btnToAddNewMovie();
      movies.movieCardBuilder(user.uid);
    } else {
      authDiv.classList.remove('hide');
      moviesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      navbarBrand.classList.add('hide');
      movieForm.classList.add('hide');
      movieCards.classList.add('hide');
      auth.authStringBuilder();
    }
  });
};

export default { checkLoginStatus };
