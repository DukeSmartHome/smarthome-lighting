import React from 'react';

const getStatus = (isOn) => isOn ? 'ON' : 'OFF';

export default ({ isOn, name, ids, toggleLight }) => {
  const classes = isOn ? 'on' : null;
  return (
    <div
      className={`lightGroup ${classes}`}
      onClick={() => toggleLight(!isOn, ids)}
    >
      <div className="name">
        {name}: <span>{getStatus(isOn)}</span>
      </div>
      <div className="slider">
        <div className="slider-handle"></div>
      </div>
    </div>
  )
};