const usersAndMovies = (movies, userMov) => movies.map((m) => {
  const mV = m;
  const user = userMov.find(u => u.movieId === mV.id);

  if (user) {
    console.error(user);
    mV.rsvpId = user.id;
    mV.statusId = user.statusId;
  }
  return mV;
});

export default { usersAndMovies };
