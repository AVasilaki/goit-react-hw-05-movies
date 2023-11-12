// import styled from 'styled-components';
import { fetchApi } from 'takeApi';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Link,
} from 'components/SharedLayout/SharedLayout.styled';
// import Casts from 'pages/Cast/CastPage';
import { Wrapper } from './MovieDetailsPage.styled';
export const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [genres, setGenres] = useState([]);
  const { id } = useParams();

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
        <Wrapper>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movieDetail.poster_path}`}
            alt=""
          ></img>
          <div>
            <h1>{movieDetail.title || movieDetail.name}</h1>
            <h3>User score: {movieDetail.vote_average}</h3>
            <h2>Overview</h2>
            <p>{movieDetail.overview}</p>
            <h3>Genres</h3>
            <p>{genres.map(genr => genr.name).join(',')}</p>
          </div>
        </Wrapper>
      </div>

      <Container>
        <Header>
          <nav>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
          </nav>
        </Header>
      </Container>

      <Outlet></Outlet>
    </>
  );
};
