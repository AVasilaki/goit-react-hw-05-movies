import { useEffect, useState } from 'react';
import { fetchApi } from 'takeApi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
  color: blue;

  &.active {
    color: orange;
  }
`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getI() {
      const endPoint = '/trending/all/day';
      try {
        const resp = await fetchApi(endPoint);
        console.log(resp.data.results);
        setMovies(resp.data.results);
      } catch (error) {
        console.error(error);
        alert('something wrong');
        return error;
      } finally {
      }
    }
    getI();
  }, []);
  return (
    <ul>
      {movies.map(movie => {
        return (
          <StyledLink to="/movies/:movieId" key={movie.id}>
            <li>{movie.name || movie.title}</li>
          </StyledLink>
        );
      })}
    </ul>
  );
}
