let MovieApp = (function(){
  let movies = [];

  function init() {
    addMovie("Conspiracy Theory", 6.7, false);
    addMovie("Six Degrees of Separation", 6.9, false);
    addMovie("The Book of Life", 7.3, false);
    addMovie("Sleeping with the Enemy", 6.2, false);
    addMovie("Mona Lisa Smile", 6.5, true);
    addMovie("The Italian Job", 7.0, true);
    addMovie("Ratatouille", 8.0, true);
  }

  function addMovie(title, rating = 0, hasWatched = false) {
    return movies.push({ title, rating, hasWatched });
  }

  function getMovies() {
    return movies;
  }

  function toString(movie) {
    let result = '';

    if (movie.hasWatched) {
      result += `You have watched "${movie.title}"`;
    } else {
      result += `You have not seen "${movie.title}"`;
    }
    result += ` - ${movie.rating} stars`;

    return result;
  }

  function printMovies() {
    movies.forEach((movie) => {
      console.log(buildMovieString(movie));
    });
  }

  return {
    init,
    addMovie,
    getMovies,
    toString,
    printMovies
  };
}());

MovieApp.init();
console.log(MovieApp.getMovies());
