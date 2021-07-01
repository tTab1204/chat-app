import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from '@redux/reducers';
import 'antd/dist/antd.less';
// import 'antd/dist/antd.dark.less'; // dark mode

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleWare(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
