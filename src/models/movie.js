export default class Movie {
  // TODO: format dates
  constructor(movieData) {
    this.id = movieData.id;
    this.comments = movieData.comments;
    this.filmInfo = {
      title: movieData[`film_info`][`title`],
      alternativeTitle: movieData[`film_info`][`alternative_title`],
      totalRating: movieData[`film_info`][`total_rating`],
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
      genre: movieData[`film_info`][`genre`],
      description: movieData[`film_info`][`description`]
    };
    this.userDetails = {
      personalRating: movieData[`user_details`][`personal_rating`],
      watchlist: movieData[`user_details`][`watchlist`],
      alreadyWatched: movieData[`user_details`][`already_watched`],
      favorite: movieData[`user_details`][`favorite`],
      watchingDate: movieData[`user_details`][`watching_date`]
    };
  }

  toRaw(movie) {
    return {
      'id': this.id,
      'comments': movie.comments.map((comment) => {
        return comment.id ? comment.id : comment;
      }),
      'film_info': {
        'title': this.filmInfo.title,
        'alternative_title': this.filmInfo.alternativeTitle,
        'total_rating': this.filmInfo.totalRating,
        'poster': this.filmInfo.poster,
        'age_rating': this.filmInfo.ageRating,
        'director': this.filmInfo.director,
        'writers': this.filmInfo.writers,
        'actors': this.filmInfo.actors,
        'release': {
          'date': this.filmInfo.release.date ? new Date(this.filmInfo.release.date).toISOString() : new Date(0).toISOString(),
          'release_country': this.filmInfo.release.releaseCountry
        },
        'runtime': this.filmInfo.runtime,
        'genres': this.filmInfo.genre,
        'description': this.filmInfo.description
      },
      'user_details': {
        'personal_rating': this.userDetails.personalRating,
        'watchlist': this.userDetails.watchlist,
        'already_watched': this.userDetails.alreadyWatched,
        'watching_date': this.userDetails.watchingDate,
        'favorite': this.userDetails.favorite
      }
    };
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
