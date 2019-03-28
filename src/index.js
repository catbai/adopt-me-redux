import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './css/index.css';
// import Result from './Result';
// import Details from './Details'
import Loadable from 'react-loadable';
import * as serviceWorker from './serviceWorker';
// import SearchParams from "./SearchParams";
import { Provider } from 'react-redux';
import store from './store';

const LoadableDetails = Loadable({
  loader: () => import('./Details'),
  loading() {
    return <h1>loading split out code</h1>
  }
})

const LoadableResult = Loadable({
  loader: () => import('./Result'),
  loading() {
    return <h1>loading split out code</h1>
  }
})

const LoadableSearchParams = Loadable({
  loader: () => import('./SearchParams'),
  loading() {
    return <h1>loading split out code</h1>
  }
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={LoadableResult} exact />
      <Route path="/details/:id" component={LoadableDetails} exact />
      <Route path="/search-params" component={LoadableSearchParams} exact />
    </BrowserRouter >
  </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
