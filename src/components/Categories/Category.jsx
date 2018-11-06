import React from 'react';

export default ({ id, selected, handleClick }) => {
  const name = id.charAt(0).toUpperCase() + id.substr(1);
  const classes = selected ? 'selected' : null;
  return (
    <div
      className={`sortButton ${classes}`}
      onClick={() => handleClick(id)}
    >
      <div className="title">{name}</div>
      <div className="logow" style={{
        backgroundImage: `url(./img/${id.toLowerCase()}_w.svg`
      }}>
      </div>
    </div>
  )
};