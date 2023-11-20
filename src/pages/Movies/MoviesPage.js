import { SearchForm } from 'components/SearchForm/SearchForm';
import { MoviesList } from 'components/moviesList/moviesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi } from 'takeApi';
import { LoadMoreButton, Page } from './Movie,styled';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyWord = searchParams.get('query');
  let page = searchParams.get('page');
  const endPoint = '/search/movie';
  const [movies, setMovies] = useState([]);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  console.log(keyWord, page, endPoint, movies);

  const onChange = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    setSearchParams({ query: form.elements.keyword.value, page: 1 });
    setMovies([]);
  };

  const pageChange = () => {
    page = parseInt(page) + 1;
    console.log(page, typeof page);
    setSearchParams({ query: keyWord, page: page });
  };

  useEffect(() => {
    async function getI() {
      try {
        const resp = await fetchApi(endPoint, keyWord, page);

        setTotalPages(resp.data.total_pages);
        setMovies(p => [...resp.data.results]);
        console.log(resp.data);
        if (totalPages > 19) {
          setBtnLoadMore(true);
        }
      } catch (error) {
        console.error(error);
        alert('something wrong');
        return error;
      } finally {
      }
    }
    getI();
  }, [keyWord, page, totalPages]);

  return (
    <>
      <div>
        <SearchForm onChange={onChange}></SearchForm>
      </div>
      <ul>
        <MoviesList movies={movies}></MoviesList>
      </ul>
      {btnLoadMore && (
        <>
          <Page>
            Page: {page} Total pages : {totalPages}
          </Page>
          <LoadMoreButton onClick={() => pageChange()}>
            load more
          </LoadMoreButton>
        </>
      )}
    </>
  );
};
export default Movies;
