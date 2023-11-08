// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTA2MGZlZjU5ZjgyYjkyYjIyZWMyZjVjM2U2ZjhhZSIsInN1YiI6IjY1NDM4MmMzZWQyYWMyMDBjNjQzNWJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SjZEdbiLIXJCXOW3Jer7_eRWe1iS__fea_oQ9VQKTA4',
//   },
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));
import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
// const instance = axios.create({
// baseURL: 'https://api.themoviedb.org/3',

// headers: {
// Authorization:
//     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTA2MGZlZjU5ZjgyYjkyYjIyZWMyZjVjM2U2ZjhhZSIsInN1YiI6IjY1NDM4MmMzZWQyYWMyMDBjNjQzNWJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SjZEdbiLIXJCXOW3Jer7_eRWe1iS__fea_oQ9VQKTA4',
// },
// });
export const fetchApi = async endPoint => {
  const resp = await axios.get(`${BASE_URL}${endPoint}`, {
    params: {
      api_key: '0e060fef59f82b92b22ec2f5c3e6f8ae',
      language: 'en-US',
    },
  });

  return resp;
};
