

const { default: axios } = require('axios')
const express = require('express')
const app = express()
const port = 2000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/movie' ,  (req , resp) =>{

    
  console.log("CALLING MOVIE ")
  const country = req.query.country
  const axios = require('axios').default;
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/trending/movie/week",{
      params:{
          api_key: '205712c8b4bad38dc18a8f9c83c0f88e',
          language: 'it-IT'
      }
  }
  )
  .then(function (response) {
      // handle success
      console.log(response);

      resp.send(response.data)
  })
  .catch(function (error) {
      // handle error
      console.log(error);
  })
})

app.get('/api/collection',  (req, resp) => {
  const axios = require('axios').default;
  axios.get("https://api.themoviedb.org/3/genre/movie/list",{
    params:{
      api_key: '205712c8b4bad38dc18a8f9c83c0f88e',
      language: 'it-IT',
    }
  })
  .then(function (response) {
    // handle success
    console.log(response);

    resp.send(response.data)
})
.catch(function (error) {
    // handle error
    console.log(error);
})
})

app.get('/api/ricercaPerGenere' , (req, resp) => {
  const axios = require('axios').default;
  const selectedPage = req.query.page;
  const selectedGenre = req.query.genre
  axios.get("https://api.themoviedb.org/3/discover/movie",{
    params:{
      api_key: '205712c8b4bad38dc18a8f9c83c0f88e',
      language: 'it-IT',
      sort_by: 'popularity.desc',
      include_adult: false,
      page: selectedPage,
      with_genres: selectedGenre
    }
  })
  .then(function (response) {
    // handle success
    console.log(response);

    resp.send(response.data)
})
.catch(function (error) {
    // handle error
    console.log(error);
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
