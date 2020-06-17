import { observable } from 'mobx';
import { createCrudActions } from './CrudActions';
import { asyncAction } from 'mobx-utils';
import { removeByIdInArray } from '../components/helpers/Data';
import { request } from './Store';
import axios from '../axios';

class PlayersStore {
  @observable current = null;
  @observable all = null;
  @observable loading = false;
  @observable error = null;

  currentId = 0;
  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.actions = createCrudActions(this, '/players');
    this.actions.create = null;
  }

  create = asyncAction(function* (data, url = null, okMessage = null) {
    // This is special: it returns the new object instead of just the id of the
    // newly created object. It does this because we need the id of the user
    // created as part this call, as well as other player data that may be
    // initalized in the server (for instance, the status)

    const result = yield request(this, axios.post, okMessage || 'Item created ok', url || '/players', data);
    if (!result) return;

    this.all.push(result);
  });

  unlinkTeam = asyncAction(function* (data, idTournament) {
    const idPlayer = data.id;
    const idTeam = data.teamData.idTeam;

    const result = yield request(
      this,
      axios.post,
      'PlayerRemovedFromTeamOk',
      '/players/unlink/' + idTournament + '/' + idPlayer + '/' + idTeam
    );

    if (!result) return;

    removeByIdInArray(this.all, data.id);
  });

  invitePlayer = asyncAction(function* (idPlayer, idTeam, idTournament, inviteText) {
    const data = { idPlayer, idTeam, idTournament, inviteText };

    yield request(this, axios.post, 'PlayerInvitationSentOk', '/players/invite', data);
  });
}

export default PlayersStore;
