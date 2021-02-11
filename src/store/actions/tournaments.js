import axios from '../../axios';

import types from './actionTypes';

export const startLoadTournaments = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/tournaments');
      if (data) dispatch(setTournaments(data));

      // return error or swal
    } catch (err) {
      console.error(err);
    }
  };
};

export const startLoadTournamentDreamTeamRankings = tournamentId => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/tournaments/dreamteamrankings/${tournamentId}`);

      if (data) {
        const rankingGroupByFieldPosition =
          data.length > 0
            ? data.reduce((accumulator, currentValue, currentIndex) => {
                if (currentIndex === 1) {
                  accumulator = { [accumulator.fieldPosition]: [accumulator] };
                  if (!accumulator[currentValue.fieldPosition]) {
                    accumulator[currentValue.fieldPosition] = [currentValue];
                  } else {
                    accumulator[currentValue.fieldPosition] = [
                      ...accumulator[currentValue.fieldPosition],
                      currentValue,
                    ];
                  }
                } else {
                  if (!accumulator[currentValue.fieldPosition]) {
                    accumulator[currentValue.fieldPosition] = [currentValue];
                  } else {
                    accumulator[currentValue.fieldPosition] = [
                      ...accumulator[currentValue.fieldPosition],
                      currentValue,
                    ];
                  }
                }
                return accumulator;
              })
            : null;

        dispatch(setActiveTournamentDreamTeamRanking(rankingGroupByFieldPosition));
      }

      // return error or swal
    } catch (err) {
      console.error(err);
    }
  };
};

export const setTournaments = tournaments => ({
  type: types.tournamentsLoad,
  payload: tournaments,
});

export const setActiveTournament = tournament => ({
  type: types.tournamentActiveLoad,
  payload: tournament,
});

export const setActiveTournamentDreamTeamRanking = ranking => ({
  type: types.tournamentActiveDreamTeamRankingsLoad,
  payload: ranking,
});
