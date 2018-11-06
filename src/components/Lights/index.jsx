import React from 'react';

import Light from './Light';

export default ({ lightData, statusData, toggleLight }) => {
  return (
    <div id="groupContainer">
      {lightData.map((light, index) => (
        <Light
          name={light[0]}
          key={light[0]}
          ids={light[1]}
          isOn={statusData[index]}
          toggleLight={toggleLight}
        />
      ))}
    </div>
  )
};