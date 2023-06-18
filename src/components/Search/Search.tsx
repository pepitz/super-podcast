import { ChangeEvent } from 'react';
import './Search.scss';

interface ISearchProps {
  searchText: string;
  counter: number;
  handleChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ searchText, counter, handleChangeQuery }: ISearchProps) => {
  return (
    <div className="search">
      <div className="search__filter">
        <span className="search__counter">{counter}</span>
        <input
          className="search__input"
          type="text"
          value={searchText}
          placeholder="Filter results..."
          onChange={(e) => handleChangeQuery(e)}
        />
      </div>
    </div>
  );
};
export default Search;
