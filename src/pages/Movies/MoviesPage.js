// import { useEffect, useState } from 'react';
// import { fetchApi } from 'takeApi';
// import styled from 'styled-components';
// import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
// import { Audio } from 'react-loader-spinner';
// import {
//   LoadMoreButton,
//   SearchFormButton,
//   SearchFormInput,
//   Searchbar,
// } from './Movie,styled';
// const StyledLink = styled(NavLink)`
//   color: blue;

//   &.active {
//     color: orange;
//   }
// `;
// export const Movies = () => {
//   const [keyword, setKeyword] = useState('');
//   const [page, setPage] = useState(1);
//   const [movies, seMovies] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [btnLoadMore, setBtnLoadMore] = useState(false);
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   console.log(location);
//   const s = searchParams.get('query') ?? '';

//   console.log(s);
//   const onChange = evt => {
//     evt.preventDefault();
//     const form = evt.currentTarget;
//     setKeyword(form.elements.keyword.value);
//     setSearchParams({ query: form.elements.keyword.value });
//     seMovies([]);
//     setPage(1);
//   };
//   const handleChange = query => {
//     const newKeyWord = query !== '' ? { query } : {};
//     setSearchParams(newKeyWord);
//   };
//   const endPoint = '/search/movie';

//   useEffect(() => {
//     if (keyword !== s) {
//       setKeyword(s);
//     }
//     if (!keyword) return;

//     setLoader(true);
//     async function getI() {
//       try {
//         const resp = await fetchApi(endPoint, keyword, page);

//         // console.log(s);

//         seMovies(p => [...p, ...resp.data.results]);

//         setBtnLoadMore(true);
//         page * 20 > resp.data.results.total_results
//           ? setBtnLoadMore(false)
//           : setBtnLoadMore(true);
//       } catch (error) {
//         console.error(error);
//         alert('something wrong');
//         return error;
//       } finally {
//         setLoader(false);
//       }
//     }
//     getI();
//   }, [page, keyword, s]);
//   return (
//     <>
//       <Searchbar>
//         <header className="Searchbar">
//           <form className="SearchForm " onSubmit={evt => onChange(evt)}>
//             <SearchFormButton type="submit" className="SearchForm-button">
//               Search
//             </SearchFormButton>
//             <SearchFormInput
//               // value={s}
//               // onChange={handleChange}
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search movies "
//               name="keyword"
//             ></SearchFormInput>
//           </form>
//         </header>
//       </Searchbar>
//       <ul>
//         {movies.map(movie => {
//           return (
//             <StyledLink
//               to={`/movies/${movie.id}`}
//               state={{ from: location }}
//               key={movie.id}
//             >
//               <li>{movie.name || movie.title}</li>
//             </StyledLink>
//           );
//         })}
//       </ul>
//       <Audio visible={loader} />

//       {btnLoadMore && (
//         <LoadMoreButton onClick={() => setPage(page + 1)}>
//           load more
//         </LoadMoreButton>
//       )}
//     </>
//   );
// };
import { SearchForm } from 'components/SearchForm/SearchForm';
import { MoviesList } from 'components/moviesList/moviesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi } from 'takeApi';
import { LoadMoreButton, Page } from './Movie,styled';

export const Movies = () => {
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

        console.log(resp.data.total_pages);
        setTotalPages(resp.data.total_pages);
        setMovies(p => [...resp.data.results]);
        if (totalPages > 19) {
          setBtnLoadMore(true);
        }

        // page * 20 > resp.data.results.total_results
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
          <LoadMoreButton onClick={() => pageChange()}>
            load more
          </LoadMoreButton>

          <Page>
            Page: {page} Total pages : {totalPages}
          </Page>
        </>
      )}
    </>
  );
};
