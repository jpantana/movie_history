// import util from '../../helpers/util';
import $ from '../../../../node_modules/jquery';
import stars from '../stars/stars';
import userData from '../../helpers/data/userData';

// import from axios call movies in moviesData
const addToWatchList = (movies) => {
  stars.starsToBeChecked(movies); // calling stars here to avoid d cycle
  const watchListArray = document.getElementsByName('watchList');
  watchListArray.forEach((cardBtn) => {
    // console.error(cardBtn);
    // const whatever = cardBtn.closest('div div');
    // console.error('something here', whatever);
    cardBtn.addEventListener('click', () => {
      // e.preventDefault();
      // console.error(e.target);
      movies.forEach((movie) => {
        // console.error(movie);
        // console.error(cardBtn.closest('h3'));
        // if (e.target.closest('<h3>').value === movie.title) {
        //   Push to new object and pass that object in a call to kovieData axios
        //   }
        // console.error(cardBtn, 'hi');
        if ($(this).data('clicked', true)) {
        // console.error('this is movie', movie);
          userData.watchListMovies(movie.title); // this actually seemed to work
        //   // this adds every movie to this data set
        }
      });
    });
  });
  userData.watchListsOnWatchList();
};


export default { addToWatchList };
