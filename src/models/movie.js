export default class Movie {
  constructor(movieData) {
    this.filmData = {
      id: movieData.id,
      comments: movieData.comments,
      filmInfo: {
        title: movieData[`film_info`][`title`],
        alternativeTitle: movieData[`film_info`][`alternative_title`],
        totalRating: movieData[`film_info`][`total-rating`],
        poster: movieData[`film_info`][`poster`],
        ageRating: movieData[`film_info`][`age_rating`],
        director: movieData[`film_info`][`director`],
        writers: movieData[`film_info`][`writers`],
        actors: movieData[`film_info`][`actors`],
        release: {
          date: movieData[`film_info`][`release`][`date`],
          releaseCountry: movieData[`film_info`][`release`][`release_country`]
        },
        runtime: movieData[`film_info`][`runtime`],
        genre: movieData[`film_info`][`genres`],
        description: movieData[`film_info`][`description`]
      },
      userDetails: {
        personalRating: movieData[`user_details`][`personal_rating`],
        watchlist: movieData[`user_details`][`watchlist`],
        alreadyWatched: movieData[`user_details`][`already_watched`],
        favorite: movieData[`user_details`][`favorite`],
        watchingDate: movieData[`user_details`][`watching_date`]
      }
    };
  }

  toRaw(movie) {
    // TODO format dates
  }

  static parseMovie(movie) {
    return new Movie(movie);
  }

  static parseMovies(movies) {
    return movies.map(Movie.parseMovie);
  }

  static clone(movie) {
    return new Movie(movie.toRaw(movie));
  }
}
