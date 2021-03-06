import util from '../../helpers/util';
import moviesData from '../../helpers/data/moviesData';
import movies from '../movies/movies';
import './movieInput.scss';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// takes in new object data to add movie posters
const newMovie = (e) => {
  e.preventDefault();
  const newMovieTitle = document.getElementById('movieTitleInput').value;
  const newMovieImg = document.getElementById('imageUrlInput').value;
  const newMovieRating = document.getElementsByClassName('movieRatingCheckBox').checked;
  const replaceMovieObj = {
    title: newMovieTitle,
    imageUrl: newMovieImg,
    movieRating: newMovieRating,
    stars: 0,
  };
  const radioBtns = document.getElementsByName('rating');
  radioBtns.forEach((radio) => {
    if (radio.checked) {
      replaceMovieObj.movieRating = radio.value;
    }
  });
  moviesData.makeNewMovie(replaceMovieObj)
    .then(() => { // below clears out inputs in form when new movie is added
      document.getElementById('movieTitleInput').value = '';
      document.getElementById('imageUrlInput').value = '';
      btnToAddNewMovie(); // eslint-disable-line no-use-before-define
      movies.movieCardBuilder()
        .then(() => {
        }).catch(err => console.error('no movies called', err));
    }).catch(err => console.error(err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// main poster builder for movie cards
const movieFormBuilder = () => {
  let domString = '';
  domString += `
  <form id="newMovieForm" class="">
  <div class="col-4 wholeForm">
    <div class="form-group">
      <label class="movieTitle" for="movieTitle">Movie Title</label>
      <input type="text" class="form-control" id="movieTitleInput" aria-describedby="movieTitle"
        placeholder="Movie Title">
      <small id="movieTitleInputText" class="form-text text-muted">What is the name of the movie?</small>
    </div>
    <div class="form-group">
      <label for="movieImageUrl">Image Link</label>
      <input id="imageUrlInput" type="text" class="form-control" id="" placeholder="Image URL">
    </div>
    <div class="text-left movieRatingBanner">MOVIE RATING</div>
    <div class="row justify-content-around holds-radios" id="movieRatingCheckBox">
      <input class="form-radio" type="radio" name="rating" id="radioRating0" value="G"><label class="labelFormRating m-1" for="radioRating0">G</label>
      <input class="form-radio" type="radio" name="rating" id="radioRating1" value="PG"><label class="labelFormRating m-1" for="radioRating1">PG</label>
      <input class="form-radio" type="radio" name="rating" id="radioRating2" value="PG-13"><label class="labelFormRating m-1" for="radioRating2">PG-13</label>
      <input class="form-radio" type="radio" name="rating" id="radioRating3" value="R"><label class="labelFormRating m-1" for="radioRating3">R</label>
    </div>
    <button id="movieSubmit" type="submit" class="btn btn-primary m-2 w-100 submitBtn">Submit Movie</button>
  </div>
</form>`;
  util.printToDom('movieForm', domString);
  document.getElementById('movieSubmit').addEventListener('click', newMovie);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// button that calls form to add new movie
const btnToAddNewMovie = () => {
  const domString = '<button id="addNewMovieBtn" class="btn btn-success addNewMovie">Add New Movie</button>';
  util.printToDom('movieForm', domString);
  document.getElementById('addNewMovieBtn').addEventListener('click', movieFormBuilder);
};

export default { movieFormBuilder, btnToAddNewMovie };
