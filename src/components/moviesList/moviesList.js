import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
const StyledLink = styled(NavLink)`
  color: blue;

  &.active {
    color: orange;
  }
`;

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map(movie => {
        return (
          <StyledLink
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            key={movie.id}
          >
            <li>
              {movie.name || movie.title}
              <span> ({movie.release_date})</span>
            </li>
          </StyledLink>
        );
      })}
    </ul>
  );
};
