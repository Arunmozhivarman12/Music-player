import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter } from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import songReducer from './data/songs';
import songreducer from './data/songlist';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer:{
    song:songReducer,
    list:songreducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> <BrowserRouter>
    <App />
    </BrowserRouter></Provider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
