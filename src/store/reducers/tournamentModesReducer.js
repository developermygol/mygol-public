import types from '../actions/actionTypes';

const initalState = {
  tournamentModes: [],
};

const tournamentModes = (state = initalState, action) => {
  switch (action.type) {
    case types.tournamentModesLoad:
      return { ...state, tournamentModes: action.payload };
    default:
      return state;
  }
};

export default tournamentModes;
