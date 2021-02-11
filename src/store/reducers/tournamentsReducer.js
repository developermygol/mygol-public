import types from '../actions/actionTypes';

const initialState = {
  tournaments: [],
  activeTournament: null,
  activeTournamentDreamTeamRanking: null,
};

const tournamentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.tournamentsLoad:
      return { ...state, tournaments: action.payload };
    case types.tournamentActiveLoad:
      return { ...state, activeTournament: action.payload };
    case types.tournamentActiveDreamTeamRankingsLoad:
      return { ...state, activeTournamentDreamTeamRanking: action.payload };
    default:
      return state;
  }
};

export default tournamentsReducer;
