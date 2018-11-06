import React, { Component } from 'react';

import './App.css';
import Lights from './components/Lights';
import Categories from './components/Categories';

import openSocket from 'socket.io-client';
import { socketURL } from './constants';

const socket = openSocket(socketURL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      ready: false,
    };
    socket.on('init', (info) => {
      this.setState({ ready: true, ...info });
      socket.on('update', (newStatusData) => this.setState({ statusData: newStatusData }));
    });
  }

  toggleLight = (isOn, lightIDs) => socket.emit('update', { isOn, lightIDs });

  changeCat = (id) => this.setState({ category: id });

  render() {
    const { category, statusData, lights, categories, ready } = this.state;
    const filteredLights = category === 'all' ?
      lights
      : lights.filter(light => light[2] === category);
    const filteredStatuses = category === 'all' ?
      statusData
      : statusData.filter((status, index) => lights[index][2] === category);

    return (
      <div className="App">
        <div id="header">
          Lightboard
        </div>
        <div id="headerSpace"></div>
        {ready &&
          <div>
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
          </div>}
        <div id="credits">A Duke Smart Home Project</div>
      </div>
    );
  }
}

export default App;
