import React, { Component } from 'react';
import withStyles from 'react-jss';
import { applyTheme } from './theme';
import io from 'socket.io-client';

import Header from './components/Header';
import Settings from './components/Settings';
import Login from './components/Login';
import Lights from './components/Lights';
import Categories from './components/Categories';

const socket = io();

const style = (theme) => ({
  root: {
    background: theme.background,
    minHeight: '100vh',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    this.state = {
      category: 'all',
      token,
      view: 'login',
    };
    if (token !== null && token !== 'null') {
      socket.emit('authentication', { token });
    }
    socket.on('token', (token) => {
      localStorage.setItem('token', token);
      this.setState({ token });
    });
    socket.on('authenticated', (info) => {
      this.setState({ view: 'lights', ...info });
      socket.on('update', (newStatusData) => this.setState({ statusData: newStatusData }));
    });
  }

  toggleLight = (isOn, lightIDs) => socket.emit('update', { isOn, lightIDs });

  login = (password) => socket.emit('authentication', { password });
  logout = () => {
    localStorage.setItem('token', null);
    this.setState({
      lights: null, categories: null, view: 'login', token: null,
    })
  };

  changeCat = (id) => this.setState({ category: id });

  toggleView = () => this.setState(prevState => prevState.view === 'lights' ?
    { view: 'settings' } : { view: 'lights' });

  render() {
    const { classes } = this.props;
    const {
      category, statusData, lights, categories, view
    } = this.state;
    const filteredLights = category === 'all' ?
      lights
      : lights.filter(light => light[2] === category);
    const filteredStatuses = category === 'all' ?
      statusData
      : statusData.filter((status, index) => lights[index][2] === category);

    return (
      <div className={classes.root}>
        <Header
          view={view}
          toggleView={this.toggleView}
        />
        <div className={classes.wrapper}>
          {view === 'login' ?
            <Login login={this.login} />
            : view === 'lights'
              ? <div>
                <Lights
                  lightData={filteredLights}
                  statusData={filteredStatuses}
                  toggleLight={this.toggleLight}
                />

                <div id="vSpace"></div>

                <Categories
                  categories={categories}
                  selected={category}
                  handleClick={this.changeCat}
                />
              </div> :
              <Settings
                logout={this.logout}
              />}
        </div>
        <div id="credits">A Duke Smart Home Project</div>
      </div>
    );
  }
}

export default withStyles(applyTheme(style))(App);
