import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from "./reducers";
import WorldCountiesList from "./components/worldCountriesList"
import WorldCountiesInfo from "./components/worldCountriesInfo";
import WorldMapDisplay from "./components/worldmapdisplay"


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <WorldMapDisplay/>
        {/*<WorldCountiesInfo/>*/}
        {/*<WorldCountiesList/>*/}

    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
