import React from 'react';
import withStyles from 'react-jss';
import color from 'color';

const onColor = color('rgb(163, 231, 107)');

const getSliderStyles = (theme, lightSize) => {
  const handleSize = lightSize / 3;
  const width = handleSize;
  const height = lightSize * 0.7;
  return {
    slider: {
      width,
      height,
      border: theme.getBorder('#aaa'),
      backgroundColor: 'rgba(0,0,0,0.4)',
      float: 'right',
      top: '50%',
      borderRadius: width / 2,
      marginTop: -height / 2,
      right: handleSize / 2,
      position: 'absolute'
    },
    sliderOn:
      { backgroundColor: onColor.string(), borderColor: onColor.darken(0.25).string() },
    sliderHandle: {
      boxSizing: 'border-box',
      border: theme.getBorder('#555'),
      backgroundColor: '#ccc',
      position: 'absolute',
      bottom: 0,
      left: width - handleSize,
      width: handleSize,
      height: handleSize,
      borderRadius: handleSize / 2,
      transition: '0.1s'
    },
    handleOn:
    {
      bottom: height - handleSize, borderColor: onColor.lighten(0.25).string(), backgroundColor: 'white'
    },
  }
};

const style = (theme) => {
  const regularSlider = getSliderStyles(theme, theme.lightSize);
  const smallerSlider = getSliderStyles(theme, theme.lightSize * 0.7);
  return {
    ...regularSlider,
    [theme.smaller]: smallerSlider,
  };
};

const Slider = ({ classes, value }) => (
  <div className={`${classes.slider} ${value ? classes.sliderOn : null}`}>
    <div className={`${classes.sliderHandle} ${value ? classes.handleOn : null}`}></div>
  </div >
);

export default withStyles(style)(Slider);