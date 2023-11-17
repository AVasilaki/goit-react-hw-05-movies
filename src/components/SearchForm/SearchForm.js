import {
  Searchbar,
  SearchFormButton,
  SearchFormInput,
} from './SEarchForm.styled';
export const SearchForm = ({ onChange }) => {
  return (
    <Searchbar>
      <form onSubmit={evt => onChange(evt)}>
        <SearchFormButton type="submit">Search</SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies "
          name="keyword"
        ></SearchFormInput>
      </form>
    </Searchbar>
  );
};
