import axios from '../../axios';

import types from './actionTypes';

export const startLoadAward = id => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/awards/${id}`);
      if (data) dispatch(setAward(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const setAward = award => ({
  type: types.awardLoad,
  payload: award,
});
