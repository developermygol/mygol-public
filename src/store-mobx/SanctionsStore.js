import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";

export default class SanctionsStore {

    @observable current = null;
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/sanctions', null, null, null, {
            postProcessAll: (all) => all
        });
    }

    getSummaryForTournament = (idTournament) => {
        return this.actions.getAll('/sanctions/summaryfortournament/' + idTournament);
    }

    getAllForTournament = (idTournament) => {
        return this.actions.getAll('/sanctions/fortournament/' + idTournament);
    }

    getAllForTeam = (idTeam, idTournament) => {
        return this.actions.getAll('/sanctions/forteam/' + idTeam + '/' + idTournament);
    }

    getAllForMatch = (idMatch) => {
        return this.actions.getAll('/sanctions/formatch/' + idMatch);
    }

    getAllForPlayer = (idPlayer) => {
        return this.actions.getAll('/sanctions/forplayer/' + idPlayer);
    }
}