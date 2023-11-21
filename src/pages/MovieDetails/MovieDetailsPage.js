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
  let [pageName, setPageName] = useState('');
  // const [searchParams] = useSearchParams();
  // let pageName = '';
  const backLinkHref = location.state?.from ?? `/movies`;
  // const linkTo = { pathname: '/movies', state: { query: backLinkHref.search } };
  useEffect(() => {
    if (typeof backLinkHref === 'object') {
      setBack(backLinkHref);
      // setPageName(location.state.name);
    }
    if (location.state !== null) {
      console.log('location state', location.state.from.pathname);
      location.state.from.pathname === '/'
        ? setPageName('Home')
        : setPageName('Movies');
    }
  }, [backLinkHref, location]);

  console.log('back', back);

  console.log('type', typeof backLinkHref);

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
          {back !== undefined && (
            <BackLink to={back}>Back to {pageName}</BackLink>
          )}
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
        <Suspense fallback={<div>...loading page</div>}>
          <Outlet></Outlet>
        </Suspense>
      </Container>
    </>
  );
};
export default MovieDetails;
