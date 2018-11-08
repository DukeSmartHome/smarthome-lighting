import React from 'react';
import withStyles from 'react-jss';

const style = (theme) => ({
  footer: {
    position: 'fixed',
    bottom: '0',
    zIndex: '2',
    width: '100%',
    float: 'left',
    lineHeight: theme.headerHeight * 0.2 + 'px',
    height: theme.headerHeight * 0.2,
    fontSize: theme.headerHeight * 0.15 + 'px',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    background: theme.primary,
    borderTop: theme.getBorder(theme.lighter),
  },
});

const Footer = ({ classes }) => (
  <div className={classes.footer}>A Duke Smart Home Project</div>
);

export default withStyles(style)(Footer);