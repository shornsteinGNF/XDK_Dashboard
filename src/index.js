import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ChartTemp from './ChartTemp'
import CurrentTemp from './CurrentTemp'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ChartTemp />
    <CurrentTemp />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
