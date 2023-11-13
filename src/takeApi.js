import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchApi = async (endPoint, keyWord, page) => {
  const resp = await axios.get(`${BASE_URL}${endPoint}`, {
    params: {
      api_key: '0e060fef59f82b92b22ec2f5c3e6f8ae',
      language: 'en-US',
      query: keyWord,
      page: page,
      include_adult: true,
    },
  });

  return resp;
};
