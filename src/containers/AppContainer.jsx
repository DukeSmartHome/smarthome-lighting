import React, { Component } from 'react';
import { ThemeProvider } from 'react-jss';
import App from '../App';

import getTheme from '../theme';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    const theme = localStorage.getItem('theme');
    this.state = {
      theme: theme !== null && theme !== 'null' ? theme : 'light',
    };
  }

  update = (key, val) => {
    if (key === 'theme') {
      localStorage.setItem('theme', val);
    }
    this.setState({ [key]: val });
  }

  render() {
    const { theme } = this.state;
    return (
      <ThemeProvider theme={getTheme(theme)}>
        <App
          update={this.update}
          state={this.state}
        />
      </ThemeProvider>);
  }
};


