import firebase from 'firebase/app';
import 'firebase/auth';
import './myNavbar.scss';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.id === 'navbar-button-logout') {
        firebase.auth().signOut();
      }
    });
  }
};

export default { navbarEvents };
