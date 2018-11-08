import React from 'react';
import withStyles from 'react-jss';

import Option from '../Option';
import Button from '../Button';

const style = {
  settings: {
    textAlign: 'center',
    color: 'white',
  },
  spacer: {
    width: '100%',
    height: 15,
  }
}

const toggleDark = (theme) => {
  if (theme === 'dark') {
    return 'light';
  }
  return 'dark';
}

const Settings = ({ state, update, classes, logout }) => {
  return (
    <div className={classes.settings}>
      <Option
        name="Dark mode"
        value={state.theme === 'dark'}
        onToggle={() => update('theme', toggleDark(state.theme))}
      />
      <div className={classes.spacer} />
      <Button
        onClick={logout}
      >Logout</Button>
    </div>
  )
};

export default withStyles(style)(Settings);