import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import organizationReducer from './reducers/organizationReducer';
import seasonsReducer from './reducers/seasonsReducer';
import tournamentsReducer from './reducers/tournamentsReducer';
import sponsorsReducer from './reducers/sponsorsReducer';
import themeReducer from './reducers/theme';

const rootReducer = combineReducers({
  organizations: organizationReducer,
  seasons: seasonsReducer,
  tournaments: tournamentsReducer,
  sponsors: sponsorsReducer,
  theme: themeReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
