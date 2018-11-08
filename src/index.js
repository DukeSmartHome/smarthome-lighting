import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import initReactFastclick from 'react-fastclick';

import App from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';

initReactFastclick();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
