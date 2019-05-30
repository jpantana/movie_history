import util from '../../helpers/util';
import addMovie from '../../helpers/data/moviesData';
import './movies.scss';

const movieCardBuilder = () => {
  let domString = '<div class="container">';
  domString += '  <div id="movieRow" class="d-flex justify-content-center">';
  addMovie.getMovieByUid().then((movies) => {
    movies.forEach((movie) => {
      domString += ` 
          <div class="col-5 mb-5 justify-content-center">
            <div class="card">
              <div class="card-header"><h3 class="text-center">${movie.title}</h3></div>
              <img class="card-img" src="${movie.imageUrl}" alt="neon sign that says honky tonk"/>
              <div class="card-body">
                <p class="card-text">${movie.movieRating}</p>
              </div>
              <button class="btn btn-success">Add Movie</button>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
               <label class="btn btn-secondary active">
                 <input type="radio" name="options" id="option1" autocomplete="off" checked> 0 Star
               </label>
               <label class="btn btn-secondary">
                 <input type="radio" name="options" id="option2" autocomplete="off"> 2 Stars
               </label>
               <label class="btn btn-secondary">
                 <input type="radio" name="options" id="option2" autocomplete="off"> 3 Stars
               </label>
               <label class="btn btn-secondary">
                 <input type="radio" name="options" id="option3" autocomplete="off"> 4 Stars
               </label>
             </div>
            </div>
          </div>`;
    });
    domString += '  </div>';
    domString += '</div>';
    util.printToDom('event', domString);
  }).catch(err => console.error('could not get movie', err));
};

export default { movieCardBuilder };
