import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('../pages/Home/HomePage'));
const Movies = lazy(() => import('../pages/Movies/MoviesPage'));
const Cast = lazy(() => import('../pages/Cast/CastPage'));
const MovieDetails = lazy(() =>
  import('../pages/MovieDetails/MovieDetailsPage')
);
const Reviews = lazy(() => import('../pages/Reviews/ReviewsPage'));
const SharedLayout = lazy(() => import('./SharedLayout/SharedLayout'));

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
