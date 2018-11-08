
import color from 'color';

const lightColor = '#107ce7';
const darkColor = color('#232323');
const borderWidth = '1px';

const defaults = {
  headerHeight: 90,
  lightSize: 80,
  categorySize: 35,
  borderWidth: '1px',
  onColor: 'rgb(163, 231, 107)',
  smaller: '@media (max-width: 750px)',
  getBorder: (color) => `${borderWidth} solid ${color}`
}

const themes = {
  light: {
    primary: lightColor,
    lighter: color(lightColor).lighten(0.3).string(),
    darker: color(lightColor).darken(0.3).string(),
    background: color(lightColor).darken(0.6).string(),
    toggle: ['rgba(0,0,0,0.5)', 'rgba(255,255,255,.95)']
  },
  dark: {
    primary: darkColor.string(),
    lighter: darkColor.lighten(0.2).string(),
    darker: darkColor.darken(0.8).string(),
    background: darkColor.darken(0.6).string(),
    toggle: [darkColor.darken(0.3).string(), darkColor.lighten(0.6).string()]
  }
};

export default (themeName) => ({...themes[themeName], ...defaults});