import React, { Component } from 'react';
import withStyles from 'react-jss';
import io from 'socket.io-client';

import Header from './components/Header';
import Footer from './components/Footer';
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
    let loaded = false;
    if (token !== null && token !== 'null') {
      socket.emit('authentication', { token });
    } else {
      loaded = true;
    }

    socket.on('token', (token) => {
      localStorage.setItem('token', token);
      this.setState({ token });
    });
    socket.on('authenticated', (res) => {
      if (res) {
        this.setState({ loaded: true, view: 'lights', ...res });
        socket.on('update', (newStatusData) => this.setState({ statusData: newStatusData }));
      } else {
        this.setState({ loaded: true });
      }
    });

    const category = localStorage.getItem('category');
    this.state = {
      category: category !== null && category !== 'null' ? category : 'all',
      token,
      loaded,
      view: 'login',
      theme: 'light',
    };
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.category !== prevState.category) {
      localStorage.setItem('category', this.state.category);
    }
  }

  render() {
    const { classes, update, state } = this.props;
    const {
      loaded, category, statusData, lights, categories, view, theme
    } = this.state;
    let filteredLights = null;
    let filteredStatuses = null;
    if (view === 'lights') {
      filteredLights = category === 'all' ?
        lights
        : lights.filter(light => light[2] === category);
      filteredStatuses = category === 'all' ?
        statusData
        : statusData.filter((status, index) => lights[index][2] === category);
    }
    return (
      <div className={classes.root}>
        {loaded &&
          <React.Fragment>
            <Header
              view={view}
              toggleView={this.toggleView}
              theme={theme}
            />
            <div className={classes.wrapper}>
              {view === 'login' ?
                <Login login={this.login} />
                : view === 'lights'
                  ? (<div>
                    <Lights
                      lightData={filteredLights}
                      statusData={filteredStatuses}
                      toggleLight={this.toggleLight}
                    />
                    <Categories
                      categories={categories}
                      selected={category}
                      handleClick={this.changeCat}
                    />
                  </div>) :
                  <Settings
                    state={state}
                    update={update}
                    logout={this.logout}
                  />
              }
            </div >
            <Footer />
          </React.Fragment>}
      </div>);
  }
};

export default withStyles(style)(App);
