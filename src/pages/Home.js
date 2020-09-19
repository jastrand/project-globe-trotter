import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { countries } from 'reducers/countryStore'
import { combineReducers, createStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { CountryList } from 'components/CountryList'
/*
  1. Home will be the main page which will take care of setting up the redux store and routes.
  2. Home will be rendered in the app component.

  Todo:
  Set up browser router
  Set up the store

 */

const reducer = combineReducers({
  countries: countries.reducer
})

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cryptos-reduxState', serializedState);
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
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}