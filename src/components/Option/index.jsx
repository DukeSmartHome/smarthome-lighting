import React from 'react';
import withStyles from 'react-jss';
import color from 'color';

import Slider from './Slider';

const style = (theme) => {
  const offColor = color(theme.toggle[0]);
  const offTextColor = offColor.isDark() ? 'white' : 'black';
  const onColor = color(theme.toggle[1]);
  const onTextColor = onColor.isDark() ? 'white' : 'black';
  return {
    light: {
      width: 700,
      height: theme.lightSize,
      margin: 'auto',
      marginBottom: 10,
      textAlign: 'center',
      color: offTextColor,
      background: offColor.string(),
      border: theme.getBorder(offColor.lighten(0.2).string()),
      borderRadius: 6,
      cursor: 'pointer',
      boxSizing: 'border-box',
      position: 'relative',
      fontWeight: 'normal'
    },
    on:
    {
      color: onTextColor,
      background: onColor.string(),
      borderColor: onColor.lighten(0.2).string(),
    },
    name: { fontSize: '1.9em', float: 'left', lineHeight: theme.lightSize + 'px', paddingLeft: 30 },
    [theme.smaller]: {
      light:
      {
        width: '100%',
        height: theme.lightSize * 0.7,
        marginBottom: 5,
        borderRadius: 0,
        borderLeft: 0,
        borderRight: 0,
      },
      name: {
        width: '100%',
        padding: 0,
        textAlign: 'center',
        fontSize: theme.lightSize * 0.25 + 'px',
        lineHeight: theme.lightSize * 0.7 + 'px',
      },
    },
  }
};

const getStatus = (value) => value ? 'ON' : 'OFF';

const Light = ({ classes, value, name, onToggle }) => {
  return (
    <div
      className={`${classes.light} ${value ? classes.on : null}`}
      onClick={onToggle}
    >
      <div className={classes.name}>
        {name + ': '}
        <span style={{ color: value ? '#F09905' : '#0680CD' }}>
          {getStatus(value)}
        </span>
      </div>
      <Slider value={value} />
    </div>
  )
};

export default withStyles(style)(Light);