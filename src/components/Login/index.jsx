import React from 'react';
import withStyles from 'react-jss';

import Button from '../Button';

const style = (theme) => ({
  login: {
    textAlign: 'center',
    color: 'white',
    padding: '20px 0',
  },
  input: {
    padding: '8px 12px',
    fontSize: '15px',
    outline: 0,
    color: 'white',
    fontFamily: 'inherit',
    background: 'rgba(0, 0, 0, 0.5)',
    border: theme.getBorder('rgba(255,255,255, 0.3)'),
    display: 'block',
    margin: '0 auto',
    borderRadius: '6px',
    marginBottom: '20px',
  },
});

class Login extends React.Component {
  state = {
    password: '',
  }

  handleTyping = (event) => {
    this.setState({ password: event.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.login(this.state.password);
    }
  }

  render() {
    const { login, classes } = this.props;
    const { password } = this.state;
    return (
      <div className={classes.login}>
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          onKeyUp={this.handleKeyPress}
          onChange={this.handleTyping}
        />
        <Button
          onClick={() => login(password)}>
          Login
        </Button>
      </div>
    );
  }
}

export default withStyles(style)(Login);