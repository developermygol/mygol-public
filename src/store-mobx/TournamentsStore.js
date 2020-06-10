import axios from '../axios'
import { asyncAction } from 'mobx-utils';
import { observable, computed } from 'mobx';
import { request } from './Store';
import { createCrudActions } from './CrudActions';
import { findByIdInArray, normalize } from '../components/helpers/Data';
import { toast } from 'react-toastify';
import { getOpErrorText } from '../components/common/FormsMobx/Utils';


export default class TournamentStore {
    @observable current = null;
    @observable all = null;
    @observable loading = false;
    @observable error = null;
    @observable calendar = null;

    rootStore = null;

    @computed get teamSize() {
        if (!this.current) return null;
        
        const org = this.rootStore.organization.current;
        if (!org) return null;

        const modes = org.modes;
        const t = findByIdInArray(modes, this.current.idTournamentMode);

        return t ? t.numPlayers : null;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/tournaments');
    }

    setCurrent = asyncAction( function *(id) {
        try {
            this.current = null;    // Prevent anyone using previous tournament data until new is loaded.
            const result = yield this.getSingle(id);            
            this.current = result;
            
            const rs = this.rootStore;            
            const teams = rs.teams;
            teams.all = result.teams;
            teams.normal = normalize(teams.all);
            
            teams.setCurrentWhenLoaded();

            rs.stages.all = result.stages;
            rs.groups.all = result.groups;
            rs.teamGroups.all= result.teamGroups;

            rs.players.all = null;
            rs.matches.all = null;
        } catch (err) {

        }
    })

    getSingle = asyncAction( function *(id) {
        return yield request(this, axios.get, null, '/tournaments/' + id);
    })

    getCalendar = asyncAction( function *(id) {
        try 
        {
            this.loading = true;
            const result = yield axios.get('/matches/fortournament/' + id);
            this.loading = false;
            return result;
        } catch (err) {
            toast.error(getOpErrorText(err));
            this.loading = false;
            return null;
        }
    })
}
