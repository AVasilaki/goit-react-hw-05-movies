import styled from 'styled-components';
import { fetchApi } from 'takeApi';
import { NavLink, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

export const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const { id } = useParams();
  // const endPoint = `/movie/${id}`;
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function getI() {
      const endPoint = `/movie/${id}`;
      try {
        const resp = await fetchApi(endPoint);
        console.log(resp);
        setMovieDetail(resp.data);
        setGenres(resp.data.genres);
      } catch (error) {
        console.error(error);
        alert('something wrong');
        return error;
      } finally {
      }
    }
    getI();
  }, [id]);
  console.log('poster-patch', genres);

  return (
    <>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300/${movieDetail.poster_path}`}
          alt=""
        ></img>
        <h1>{movieDetail.title || movieDetail.name}</h1>
        <h3>User score: {movieDetail.vote_average}</h3>
        <h2>Overview</h2>
        <p>{movieDetail.overview}</p>
        <h3>Genres</h3>
        <p>{genres.map(genr => genr.name).join(',')}</p>
      </div>

      <div>
        <nav>
          <StyledLink to="/movies/:id/cast">Cast</StyledLink>
          <StyledLink to="/movies/:id/reviews">Reviews</StyledLink>
        </nav>
      </div>
      <Outlet></Outlet>
    </>
  );
};
