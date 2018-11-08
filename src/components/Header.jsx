import React from 'react';
import withStyles from 'react-jss';
import { applyTheme, theme } from '../theme';

const style = (theme) => {
  const smallerHeader = theme.headerHeight * 0.6;
  const smallerLogo = smallerHeader * 0.5;
  return {
    header: {
      zIndex: '9999',
      position: 'fixed',
      top: '0',
      width: '100%',
      textAlign: 'center',
      fontWeight: 'lighter',
      color: 'rgba(255, 255, 255, 0.9)',
      background: theme.primary,
      lineHeight: theme.headerHeight + 'px',
      height: theme.headerHeight,
      fontSize: theme.headerHeight / 2 + 'px',
      borderBottom: theme.borderWidth + ' solid ' + theme.secondary
    },
    settingsButton: {
      backgroundImage: 'url(./img/settings.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: '40px 40px',
      position: 'absolute',
      top: 20,
      right: 20,
      height: 50,
      width: 50,
      opacity: '0.7'
    },
    placeholder: {
      height: theme.headerHeight,
    },
    [theme.smaller]: {
      header: {
        fontSize: smallerHeader / 2 + 'px',
        height: smallerHeader,
        lineHeight: smallerHeader + 'px',
      },
      settingsButton: {
        backgroundSize: '25px 25px',
        position: 'absolute',
        top: (smallerHeader - smallerLogo) / 2,
        right: (smallerHeader - smallerLogo) / 2,
        height: smallerLogo,
        width: smallerLogo
      },
      placeholder: {
        height: smallerHeader,
      },
    }
  }
};

const Header = ({ classes, view, toggleView }) => (
  <React.Fragment>
    <div className={classes.header}>
      Lightboard
    {view !== 'login' && <div
        onClick={toggleView}
        className={classes.settingsButton}
        style={{
          opacity: view === 'settings' ? 1.0 : 0.5,
        }} />}
    </div>

    <div className={classes.placeholder} />
  </React.Fragment>
);

export default withStyles(applyTheme(style))(Header);