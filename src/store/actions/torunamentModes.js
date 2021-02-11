import axios from '../../axios';
import types from './actionTypes';

export const startLoadTournamentModes = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/tournamentmodes');
      if (data) dispatch(setTournamentModes(data));

      // return error or swal
    } catch (err) {
      // return error or swal
      console.error(err);
    }
  };
};

const setTournamentModes = tournamentModes => ({
  type: types.tournamentModesLoad,
  payload: tournamentModes,
});
