import React from 'react';
import ReactDOM from 'react-dom';
import './public/assets/index.css';
import App from './src/App';
import { HashRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
  