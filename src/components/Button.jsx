import React from 'react';

import withStyles from 'react-jss';

const style = {
  button: {
    padding: '10px 20px',
    fontSize: '20px',
    outline: 0,
    borderRadius: '50px',
    fontFamily: 'Muli',
    background: '#107ce7',
    borderColor: '#3995f1',
    color: 'white',
    '&:hover': {
      background: '#3995f1',
    }
  }
};

const Button = ({ classes, children, onClick }) => {
  return (
    <button
      className={classes.button}
      onClick={onClick}
    >{children}</button>
  );
};

export default withStyles(style)(Button);