import React from 'react';
import Option from '../Option';

export const Lights = ({ lightData, statusData, toggleLight }) => {
  return (
    <div>
      {lightData.map((light, index) => (
        <Option
          name={light[0]}
          key={light[0]}
          value={statusData[index]}
          onToggle={() => toggleLight(!statusData[index], light[1])}
        />
      ))}
    </div>
  )
};

export default Lights;