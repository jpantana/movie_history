import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

// pulls down database user_movie info and resolves with id
const watchListsOnWatchList = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/user_movie.json`)
    .then((results) => {
      const watchListResults = results.data;
      const watchLists = [];
      Object.keys(watchListResults).forEach((watchListId) => {
        watchListResults[watchListId].id = watchListId;
        watchLists.push(watchListResults[watchListId]);
      });
      // resolves correctly, but needs to print. watchLists resolves to
      resolve(watchLists);
    })
    .catch(err => reject(err));
});

// use below to add movie to movies you want to watch.
const watchListMovies = watchMovieObject => axios.post(`${firebaseUrl}/user_movie.json`, watchMovieObject);
// pushes data to server for you to add 'stars' to new movies
const updateStars = (movieUpdate, movieId) => axios.put(`${firebaseUrl}/movies/${movieId}/stars.json`, movieUpdate);

export default { watchListsOnWatchList, watchListMovies, updateStars };
