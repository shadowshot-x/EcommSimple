import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/spinner" component={App} />
    </div>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
  {routing}
  </Provider>,
  document.getElementById('root')
);
