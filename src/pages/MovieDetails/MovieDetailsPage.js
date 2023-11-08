import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;
export default function MovieDetails() {
  return (
    <div>
      <nav>
        <StyledLink to="/movies/:movieId/cast">Cast</StyledLink>
        <StyledLink to="/movies/:movieId/reviews">Reviews</StyledLink>
      </nav>
    </div>
  );
}
