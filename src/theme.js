
import color from 'color';
let currentTheme = 'light';

export const theme = {
  headerHeight: 90,
  borderWidth: '1px',
  onColor: 'rgb(163, 231, 107)',
  smaller: '@media (max-width: 750px)',
}

const lightColor = '#107ce7';
const darkColor = '#222';


const themes = {
  light: {
    primary: lightColor,
    secondary: color(lightColor).darken(0.3).string(),
    background: color(lightColor).darken(0.6).string(),
  },
  dark: {
    primary: darkColor,
    secondary: color(darkColor).darken(0.3).string(),
    background: color(darkColor).darken(0.3).string(),
  }
};

export const applyTheme = (styles) =>
    styles({...themes[currentTheme], ...theme});