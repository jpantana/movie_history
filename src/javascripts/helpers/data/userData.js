import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

// use below to add movie to movies you want to watch.
const watchListMovies = watchMovieObject => axios.post(`${firebaseUrl}/user_movie.json`, watchMovieObject);

// not working yet, but json link is good
const watchListsOnWatchList = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/user_movies.json`)
    .then((results) => {
      const watchListResults = results.data;
      const watchLists = [];
      console.error('watchlistresults', watchListResults);
      Object.keys(watchListResults).forEach((watchListId) => {
        watchListResults[watchListId].id = watchListId;
        watchLists.push(watchListResults[watchListId]);
      });
      console.error(watchLists);
      resolve(watchLists);
    })
    .catch(err => reject(err));
});

export default { watchListsOnWatchList, watchListMovies };
