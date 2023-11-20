import { BackLink } from 'components/BackLink';
import { Suspense } from 'react';
import { fetchApi } from 'takeApi';
import { Outlet } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Link,
} from 'components/SharedLayout/SharedLayout.styled';

import { Wrapper } from './MovieDetailsPage.styled';

// import Casts from 'pages/Cast/CastPage';

const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const [back, setBack] = useState();
  const location = useLocation();
  // const [searchParams] = useSearchParams();

  const backLinkHref = location.state?.from ?? `/movies`;
  // const linkTo = { pathname: '/movies', state: { query: backLinkHref.search } };
  useEffect(() => {
    setBack(backLinkHref);
  }, []);

  console.log('back', back);
  console.log('location state', backLinkHref.search);
  const p = backLinkHref.search;
  useEffect(() => {
    async function getI() {
      const endPoint = `/movie/${id}`;
      try {
        const resp = await fetchApi(endPoint);

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

  return (
    <>
      <div>
        <Wrapper>
          <BackLink to={back}>Back to movies</BackLink>
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
            <Link to="cast" state={`/movies${backLinkHref.search}`}>
              Cast
            </Link>
            <Link to="reviews" state={`/movies${p}`}>
              Reviews
            </Link>
          </nav>
        </Header>
        <Suspense fallback={<div>...loading page</div>}>
          <Outlet></Outlet>
        </Suspense>
      </Container>
    </>
  );
};
export default MovieDetails;
