import React from 'react';

import Button from '../Button';

const styles = {
  login: {
    textAlign: 'center',
    color: 'white',
    padding: '50px 0',
  },
  input: {
    padding: '8px 12px',
    fontSize: '15px',
    outline: 0,
    border: 0,
    color: 'white',
    background: 'rgba(0, 0, 0, 0.5)',
    borderBottom: '2px solid rgba(255,255,255, 0.8)',
    display: 'block',
    margin: '0 auto',
    borderRadius: '6px',
    marginBottom: '20px',
  },
}

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
    const { login } = this.props;
    const { password } = this.state;
    return (
      <div style={styles.login}>
        <input
          style={styles.input}
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

export default Login;