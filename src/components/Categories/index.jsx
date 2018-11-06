import React from 'react';

import Category from './Category';

export default ({ categories, selected, handleClick }) => {
  return (
    <div id="sortContainer">
      <div>{categories.map(cat => (
        <Category
          id={cat}
          selected={cat === selected}
          handleClick={handleClick}
          key={cat} />
      ))}</div>
    </div>
  )
};