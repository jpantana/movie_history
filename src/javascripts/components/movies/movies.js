import util from '../../helpers/util';
import addMovie from '../../helpers/data/moviesData';
import watchList from '../watchList/watchList';
import './movies.scss';

const movieCardBuilder = () => {
  let domString = '<div class="container">';
  domString += '  <div id="movieRow" class="d-flex justify-content-center">';
  addMovie.getMovieByUid().then((movies) => {
    movies.forEach((movie, i) => {
      domString += ` 
          <div class="col-5 mb-5 justify-content-center">
            <div id="" class="card">
              <div class="card-header"><h3 class="text-center">${movie.title}</h3></div>
              <img class="card-img" src="${movie.imageUrl}" alt="movie poster for ${movie.title}"/>
              <div class="card-body">
               <button id="${movie.id}" class="btn btn-danger">Rate Movie</button>
               <div id="starsPrint_${i}"></div>
                <p class="card-text">${movie.movieRating}</p>
              </div>
              <button type="checkbox" id="watchList_${i}" name="watchList" class="btn btn-success">Add Movie</button>
              <div id="starsPrint_${i}"></div>
              <div id="newStarsPrint_${i}"></div>
            </div>
          </div>`;
    });
    domString += '  </div>';
    domString += '</div>';
    util.printToDom('event', domString);
    watchList.addToWatchList(movies);
    // stars.starsToBeChecked(movies); // calling this in watchList now
  }).catch(err => console.error('could not get movie', err));
};

export default { movieCardBuilder };
