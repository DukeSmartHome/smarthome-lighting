import React from 'react';
import withStyles from 'react-jss';
import Button from '../Button';

const style = {
  settings: {
    textAlign: 'center',
    color: 'white',
  },
}

const Settings = ({ classes, logout }) => {
  return (
    <div className={classes.settings}>
      <h1>Settings</h1>
      <Button
        onClick={logout}
      >Logout</Button>
    </div>
  )
};

export default withStyles(style)(Settings);