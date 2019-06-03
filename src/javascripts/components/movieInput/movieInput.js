import util from '../../helpers/util';
import moviesData from '../../helpers/data/moviesData';
import movies from '../movies/movies';

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
    .then(() => {
      movies.movieCardBuilder();
    }).catch(err => console.error(err));
};

const movieFormBuilder = () => {
  let domString = '';
  domString += `
  <form>
  <div class="form-group">
    <label for="movieTitle">Movie Title</label>
    <input type="text" class="form-control" id="movieTitleInput" aria-describedby="movieTitle"
      placeholder="Movie Title">
    <small id="movieTitleInputText" class="form-text text-muted">What is the name of the movie?</small>
  </div>
  <div class="form-group">
    <label for="movieImageUrl">Image Link</label>
    <input id="imageUrlInput" type="text" class="form-control" id="" placeholder="Image URL">
  </div>
  <div>Rating:</div>
  <div id="movieRatingCheckBox">
    <input type="radio" name="rating" value="R">R<br>
    <input type="radio" name="rating" value="PG-13">PG-13<br>
    <input type="radio" name="rating" value="PG">PG<br>
  </div>
  <button id="movieSubmit" type="submit" class="btn btn-primary">Submit Movie</button>
</form>`;
  util.printToDom('movieForm', domString);
  document.getElementById('movieSubmit').addEventListener('click', newMovie);
};

// const getMovieInput = () => {
//   document.getElementById('movieTitleInput').value();
// };

export default { movieFormBuilder };
