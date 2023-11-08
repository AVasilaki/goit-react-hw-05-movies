import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/HomePage';
import Movies from '../pages/Movies/MoviesPage';
import Cast from '../pages/Cast/CastPage';
import MovieDetails from '../pages/MovieDetails/MovieDetailsPage';
import Reviews from '../pages/Reviews/ReviewsPage';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// import { fetchApi } from 'takeApi';
// import { useEffect, useState } from 'react';
const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;
export const App = () => {
  return (
    <div>
      <nav>
        <StyledLink to="/" end>
          Home
        </StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};
