import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
//import registerServiceWorker from './registerServiceWorker';

//const body = document.getElementsByTagName('body')[0];
//body.className = 'loaded';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
unregister();