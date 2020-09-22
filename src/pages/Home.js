import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { countries } from 'reducers/countryStore'
import { combineReducers, createStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { CountryList } from 'components/CountryList'
import { CountryDetails } from './CountryDetails'

/*

  1. Home is the main page. Routes and redux store for the enitre app is set up here.
  2. Home is rendered in App.js

*/

const reducer = combineReducers({
  countries: countries.reducer
})

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('countries-reduxState', serializedState);
  } catch (e) {
    console.log(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('countries-reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();
const store = createStore(reducer, persistedState, composeEnhancer(applyMiddleware(thunk)));
store.subscribe(() => saveToLocalStorage(store.getState()));

export const Home = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <CountryList />
          </Route>
          <Route path="/country/:alpha3Code" exact>
            <CountryDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}