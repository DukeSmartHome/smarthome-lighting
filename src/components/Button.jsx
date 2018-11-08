import React from 'react';
import withStyles from 'react-jss';

const style = (theme) => ({
  button: {
    padding: '10px 20px',
    fontSize: '20px',
    outline: 0,
    borderRadius: '50px',
    fontFamily: 'inherit',
    background: '#107ce7',
    border: theme.getBorder('#3995f1'),
    color: 'white',
    '&:hover': {
      background: '#3995f1',
    }
  }
});

const Button = ({ classes, children, onClick }) => {
  return (
    <button
      className={classes.button}
      onClick={onClick}
    >{children}</button>
  );
};

export default withStyles(style)(Button);