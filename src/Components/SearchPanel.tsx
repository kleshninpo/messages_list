import React from 'react';
import './SearchPanel.css';
import { EFilterType } from '../types';
import { keys } from '../utils/keys';

interface ISearchPanelProps {
  setInput: (value: string) => void;
  input: string;
  setFilterType: (value: EFilterType) => void;
}

export const SearchPanel: React.FC<ISearchPanelProps> = ({
  setInput,
  input,
  setFilterType,
}) => {
  const options = keys(EFilterType).map((key) => EFilterType[key]);

  const renderOption = (value: EFilterType) => {
    return (
      <option value={value} key={value}>
        {value}
      </option>
    );
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput('');
    setFilterType(e.target.value as EFilterType);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="search_block">
      <section>
        <label htmlFor="filter_type">Search by </label>
        <select onChange={onSelect} id="filter_type">
          {options.map(renderOption)}
        </select>
      </section>
      <input
        value={input}
        id="main_search_field"
        className="search"
        placeholder="search..."
        onInput={onInput}
      />
    </div>
  );
};
