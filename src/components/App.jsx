import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/HomePage';
import { Movies } from '../pages/Movies/MoviesPage';
import Cast from '../pages/Cast/CastPage';
import { MovieDetails } from '../pages/MovieDetails/MovieDetailsPage';
import Reviews from '../pages/Reviews/ReviewsPage';

import { SharedLayout } from './SharedLayout/SharedLayout';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};
