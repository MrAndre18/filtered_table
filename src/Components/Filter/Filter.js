import React from 'react';
import './Filter.css';

function Filter({ filteringList }) {
  const filterInputHandler = text => {
    filteringList(text.trim());
  }

  return (
    <div className="filter">
      <input onChange={(e) => {filterInputHandler(e.target.value)}} className="filter__input" type="text" placeholder="Filter"/>
    </div>
  )
}

export default Filter;
