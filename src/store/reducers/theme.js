import types from '../actions/actionTypes';

const initialState = {
  themeOrganization: null,
  themeTournament: null,
  activeTheme: null,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.themeOrganizationSet:
      return { ...state, themeOrganization: action.payload };
    case types.themeTournamentSet:
      return { ...state, themeTournament: action.payload };
    case types.themeActiveSet:
      return { ...state, activeTheme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
