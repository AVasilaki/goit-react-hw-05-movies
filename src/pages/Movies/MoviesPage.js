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
export default function Movies() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  //   setImages([]);
  const onChange = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    setKeyword(form.elements.keyword.value);
    //   setImages([]);
    setPage(1);
  };
  const endPoint = '/search/movie';
  useEffect(() => {
    // if (!keyword) return;
    // setLoader(true);
    async function getI() {
      try {
        const resp = await fetchApi(endPoint, keyword, page);
        console.log(keyword, 'key');
        setImages(p => [...p, ...resp.data.results]);
        console.log(resp, 'resp');
        // setBtnLoadMore(true);
        // page * 12 > resp.data.totalHits
        //   ? setBtnLoadMore(false)
        //   : setBtnLoadMore(true);
      } catch (error) {
        console.error(error);
        alert('something wrong');
        return error;
      } finally {
        // setLoader(false);
      }
    }
    getI();
  }, [page, keyword]);
  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm " onSubmit={evt => onChange(evt)}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies "
            name="keyword"
          />
        </form>
      </header>
      <ul>
        {images.map(movie => {
          return (
            <StyledLink to={`/movies/${movie.id}`} key={movie.id}>
              <li>{movie.name || movie.title}</li>
            </StyledLink>
          );
        })}
      </ul>
      <button onClick={() => setPage(page + 1)}>load more</button>
    </>
  );
}
