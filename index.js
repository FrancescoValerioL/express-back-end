const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 2000;

//MULTI SEARCH
app.get('/api/tv/ricercaMulti', (req, resp) => {
  const axios = require('axios').default
  const titolo = req.query.titolo
  let found = []
  const img = 'https://image.tmdb.org/t/p/w500'

  axios
    .get('https://api.themoviedb.org/3/search/multi', {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
        query: titolo,
        page: 1,
        include_adult: false,
      }
    })
    .then(function (response){
      found = response.data.results.map((elem) => ({
        title: elem.name,
        title: elem.title,
        id: elem.id,
        img: img + elem.poster_path,
        genre_ids: elem.genre_ids,
        release_date: elem.release_date,
      }))
      resp.send(found)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
})

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
app.get('/api/tv/popular', (req,resp) => {
  const axios = require('axios').default
  const titolo = req.query.titolo
  let series = []
  const img = 'https://image.tmdb.org/t/p/w500'

  axios
    .get('https://api.themoviedb.org/3/tv/popular', {
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
app.get('/api/tv/topRated', (req,resp) => {
  const axios = require('axios').default
  const titolo = req.query.titolo
  let series = []
  const img = 'https://image.tmdb.org/t/p/w500'

  axios
    .get('https://api.themoviedb.org/3/tv/top_rated', {
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
app.get("/api/tv/trendingWeek", (req, resp) => {
  const axios = require("axios").default;
  const img = "https://image.tmdb.org/t/p/w500";
  let films = [];
  axios
    .get("https://api.themoviedb.org/3/trending/tv/week", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
      },
    })
    .then(function (response) {
      films = response.data.results.map((elem) => ({
        title: elem.name,
        id: elem.id,
        img: img + elem.poster_path,
        genre_ids: elem.genre_ids,
        release_date: elem.release_date,
      }));
      resp.send(films);
    });
});
app.get('/api/tv/ricercaperGenere', (req, resp) => {
  const axios = require('axios').default
  const selectedPage = req.query.page;
  const selectedGenre = req.query.genre.toLowerCase();
  const img = 'https://image.tmdb.org/t/p/w500'
  let series = []
  let genres = new Map()
  genres.set('azione', '10759')
  genres.set('avventura', '10759')
  genres.set('animazione', '16')
  genres.set('commedia', '35')
  genres.set('crime', '80')
  genres.set('documentario', '99')
  genres.set('dramma', '18')
  genres.set('famiglia', '10751')
  genres.set('kids', '10762')
  genres.set('mistero', '9648')
  genres.set('news', '10763')
  genres.set('reality', '10764')
  genres.set('fci-fi', '10765')
  genres.set('fantasy', '10765')
  genres.set('soap', '10766')
  genres.set('talk', '10767')
  genres.set('war', '10768')
  genres.set('politics', '10768')
  genres.set('western', '37')
  axios
    .get('https://api.themoviedb.org/3/discover/tv', {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
        sort_by: "popularity.desc",
        page: selectedPage,
        with_genres: genres.get(selectedGenre),
        include_null_first_air_dates: false,
      }
    })
    .then(function(response) {
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
  const selectedGenre = req.query.genre.toLowerCase();
  const img = 'https://image.tmdb.org/t/p/w500'
  let genres = new Map()
  genres.set('azione', '28')
  genres.set('avventura', '12')
  genres.set('animazione', '16')
  genres.set('commedia', '35')
  genres.set('crime', '80')
  genres.set('documentario', '90')
  genres.set('dramma', '18')
  genres.set('famiglia', '10751')
  genres.set('fantasy', '14')
  genres.set('storia', '36')
  genres.set('horror', '27')
  genres.set('musica', '10402')
  genres.set('mistero', '9648')
  genres.set('romance', '10749')
  genres.set('fantascienza', '878')
  genres.set('sci-fi', '878')
  genres.set('film', '10770')
  genres.set('thriller', '53')
  genres.set('guerra', '10752')
  genres.set('western', '37')
  axios
    .get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: "205712c8b4bad38dc18a8f9c83c0f88e",
        language: "it-IT",
        sort_by: "popularity.desc",
        include_adult: false,
        page: selectedPage,
        with_genres: genres.get(selectedGenre),
      },
    })
    .then(function (response) {
      // handle success
      movies = response.data.results.map((elem) => ({
        title: elem.title,
        id: elem.id,
        img: img + elem.poster_path,
        genre_ids: elem.genre_ids,
        release_date: elem.release_date,
      }))

      resp.send(movies);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
