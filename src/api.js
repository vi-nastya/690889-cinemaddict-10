import Movie from "./models/movie";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const SUCCESS_STATUS_CODE = 200;
const MULTIPLE_CHOICE_CODE = 300;

const CONTENT_TYPE = `application/json`;

const checkStatus = (response) => {
  if (response.status >= SUCCESS_STATUS_CODE && response.status < MULTIPLE_CHOICE_CODE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies)
      .catch((err) => {
        throw err;
      });
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then((response) => response.json())
      .catch((err) => {
        throw err;
      });
  }

  createComment(comment, movieId) {
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': CONTENT_TYPE})
    })
      .then((response) => response.json())
      .then((response) => {
        const newMovieData = response.movie;
        newMovieData.comments = response.comments;
        return Movie.parseMovie(newMovieData)
        .catch((err) => {
          throw err;
        });
      });
  }

  updateMovie(movieId, data) {
    return this._load({
      url: `movies/${movieId}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': CONTENT_TYPE})
    })
      .then((response) => response.json())
      .then(Movie.parseMovie)
      .catch((err) => {
        throw err;
      });
  }

  deleteComment(commentId) {
    return this._load({url: `comments/${commentId}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
