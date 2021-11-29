import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css'

export const importedStore = store();

ReactDOM.render(
  <Provider store={importedStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
