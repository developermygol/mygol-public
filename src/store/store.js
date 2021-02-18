import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import organizationReducer from './reducers/organizationReducer';
import seasonsReducer from './reducers/seasonsReducer';
import tournamentsReducer from './reducers/tournamentsReducer';
import sponsorsReducer from './reducers/sponsorsReducer';
import tournamnetModesReducer from './reducers/tournamentModesReducer';
import themeReducer from './reducers/theme';
import awardsReducer from './reducers/awardsReducer';

const rootReducer = combineReducers({
  organizations: organizationReducer,
  seasons: seasonsReducer,
  tournamentModes: tournamnetModesReducer,
  tournaments: tournamentsReducer,
  sponsors: sponsorsReducer,
  theme: themeReducer,
  awards: awardsReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
