import types from '../actions/actionTypes';

const initialState = {
  activeAward: null,
};

const awardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.awardLoad:
      return { ...state, activeAward: action.payload };
    default:
      return state;
  }
};

export default awardsReducer;
