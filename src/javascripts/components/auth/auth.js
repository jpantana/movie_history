import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import googleImage from './btn_google_signin_light_focus_web.png';
import './auth.scss';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const authStringBuilder = () => {
  const domString = `
  <img id="google-auth" src="${googleImage}" alt="picture of google icon for login"/>`;
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default { authStringBuilder };
