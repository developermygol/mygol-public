import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import App from './App';
import { unregister } from './registerServiceWorker';
//import registerServiceWorker from './registerServiceWorker';

//const body = document.getElementsByTagName('body')[0];
//body.className = 'loaded';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
//registerServiceWorker();
unregister();
