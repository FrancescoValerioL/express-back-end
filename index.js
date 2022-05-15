const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 2000;

//API TV SERIES
app.get('/api/tv/ricercaTitolo', (req, resp) => {
  const axios = require('axios').default
  const titolo = req.query.titolo
  let series = []
  const img = 'https://image.tmdb.org/t/p/w500'

  axios
    .get('https://api.themoviedb.org/3/search/tv', {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
        query: titolo,
        page: 1,
        include_adult: false,
      }
    })
    .then(function (response){
      series = response.data.results.map((elem) => ({
        title: elem.name,
        id: elem.id,
        img: img + elem.poster_path,
        genre_ids: elem.genre_ids,
        release_date: elem.release_date,
      }))
      resp.send(series)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
})

// API MOVIE
app.get("/api/movie", (req, resp) => {
  console.log("CALLING MOVIE ");
  const country = req.query.country;
  const axios = require("axios").default;
  // Make a request for a user with a given ID
  axios
    .get("https://api.themoviedb.org/3/trending/movie/week", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);

      resp.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/api/movie/trendingWeek", (req, resp) => {
  const axios = require("axios").default;
  const img = "https://image.tmdb.org/t/p/w500";
  let films = [];
  axios
    .get("https://api.themoviedb.org/3/trending/movie/week", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
      },
    })
    .then(function (response) {
      films = response.data.results.map((elem) => ({
        title: elem.title,
        id: elem.id,
        img: img + elem.poster_path,
        genre_ids: elem.genre_ids,
        release_date: elem.release_date,
      }));
      resp.send(films);
    });
});

app.get("/api/movie/topRated", (req, resp) => {
  const axios = require("axios").default;
  const img = "https://image.tmdb.org/t/p/w500";
  let films = [];
  axios
    .get("https://api.themoviedb.org/3/movie/top_rated", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
        page: 1,
      },
    })
    .then(function (response) {
      films = response.data.results.map((elem) => ({
        title: elem.title,
        id: elem.id,
        img: img + elem.poster_path,
        genre_ids: elem.genre_ids,
        release_date: elem.release_date,
      }));
      resp.send(films);
    });
});

app.get("/api/movie/datiFilm", (req, resp) => {
  const axios = require("axios").default;
  const idFilm = req.query.idFilm;

  const dati = {
    title: "",
    original_title: "",
    img: "https://image.tmdb.org/t/p/w500",
    genres: [],
    overview: "",
    vote: 0,
    release_date: "",
  };

  axios
    .get(`https://api.themoviedb.org/3/movie/${idFilm}`, {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);
      dati.title = response.data.title;
      dati.original_title = response.data.original_title;
      dati.img = dati.img + response.data.poster_path;
      dati.genres = response.data.genres;
      dati.overview = response.data.overview;
      dati.vote = response.data.vote_average;
      dati.release_date = response.data.release_date;
      resp.send(dati);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/api/movie/ricercaTitolo", (req, resp) => {
  const axios = require("axios").default;
  const titolo = req.query.titolo;
  let films = [];
  const img = "https://image.tmdb.org/t/p/w500";

  axios
    .get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
        query: titolo,
        page: 1,
        include_adult: false,
      },
    })
    .then(function (response) {
      films = response.data.results.map((elem) => ({
        title: elem.title,
        id: elem.id,
        img: img + elem.poster_path,
        genre_ids: elem.genre_ids,
        release_date: elem.release_date,
      }));
      resp.send(films);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/api/movie/collection", (req, resp) => {
  const axios = require("axios").default;
  axios
    .get("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);

      resp.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/api/movie/ricercaPerGenere", (req, resp) => {
  const axios = require("axios").default;
  const selectedPage = req.query.page;
  const selectedGenre = req.query.genre;
  axios
    .get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
        sort_by: "popularity.desc",
        include_adult: false,
        page: selectedPage,
        with_genres: selectedGenre,
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);

      resp.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
