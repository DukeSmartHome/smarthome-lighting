import React from 'react';
import withStyles from 'react-jss';

const style = (theme) => {
  const smallerHeader = theme.headerHeight * 0.75;
  const smallerLogo = smallerHeader * 0.5;
  return {
    header: {
      zIndex: '9999',
      position: 'fixed',
      top: '0',
      width: '100%',
      textAlign: 'center',
      fontWeight: 'normal',
      color: 'rgba(255, 255, 255, 0.9)',
      background: theme.primary,
      lineHeight: theme.headerHeight + 'px',
      height: theme.headerHeight,
      fontSize: theme.headerHeight / 2 + 'px',
      borderBottom: theme.borderWidth + ' solid ' + theme.secondary
    },
    settingsButton: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: '40px 40px',
      position: 'absolute',
      top: 20,
      right: 20,
      height: 50,
      width: 50,
      opacity: 0.5,
      '&:hover': {
        opacity: 0.8,
      }
    },
    inSettings: {
      opacity: 1,
    },
    placeholder: {
      height: theme.headerHeight,
      marginBottom: 35,
      width: '100%',
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
        marginBottom: 0,
      },
    }
  }
};

const Header = ({ classes, view, toggleView, theme }) => (
  <React.Fragment>
    <div className={classes.header} data-theme={theme}>
      {view.charAt(0).toUpperCase() + view.slice(1)}
      {view !== 'login' && <div
        onClick={toggleView}
        className={`${classes.settingsButton} ${view === 'settings' ? classes.inSettings : null}`}
        style={{
          backgroundImage: `url(./img/${view !== 'settings' ? 'settings' : 'close'}.svg)`,
        }} />
      }
    </div>
    <div className={classes.placeholder} />
  </React.Fragment>
);

export default withStyles(style)(Header);