import firebase from 'firebase/app';
import auth from './components/auth/auth';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import '../styles/main.scss';
import myNavbar from './components/MyNavBar/myNavbar';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  myNavbar.navbarEvents();
  authData.checkLoginStatus();
  auth.authStringBuilder();
};

init();

export default { init };
