import types from './actionTypes';

export const setOrgTheme = theme => ({
  type: types.themeOrganizationSet,
  payload: theme,
});

export const setTournamentTheme = theme => ({
  type: types.themeTournamentSet,
  payload: theme,
});

export const setActiveTheme = theme => ({
  type: types.themeActiveSet,
  payload: theme,
});
