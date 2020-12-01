import types from '../actions/actionTypes';

const initialState = {
  sponsorsOrganization: [],
  sponsorsTournament: [],
};

const sponsorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.sponsorsOrganizationLoad:
      return { ...state, sponsorsOrganization: action.payload };
    case types.sponsorsTournamentLoad:
      return { ...state, sponsorsTournament: action.payload };
    default:
      return state;
  }
};

export default sponsorsReducer;
