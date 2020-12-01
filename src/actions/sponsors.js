import axios from '../axios';

import types from '../types/types';

export const startLoadingSponsorsByIdOrganization = idOrganization => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/sponsors/fororganization/${idOrganization}`);
      // console.log('data: ', data);
      if (data) dispatch(setSponsorsOrganization(data));

      // return error or swal
    } catch (err) {
      // return error or swal
      console.error(err);
    }
  };
};

export const startLoadingSponsorsByIdTournament = idTournamnet => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/sponsors/fortournament/${idTournamnet}`);
      // console.log('data: ', data);
      if (data) dispatch(setSponsorsTournament(data));

      // return error or swal
    } catch (err) {
      // return error or swal
      console.error(err);
    }
  };
};

export const setSponsorsOrganization = sponsors => ({
  type: types.sponsorsOrganizationLoad,
  payload: sponsors,
});

export const setSponsorsTournament = sponsors => ({
  type: types.sponsorsTournamentLoad,
  payload: sponsors,
});
