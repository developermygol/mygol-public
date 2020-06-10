import { observable, action } from "mobx";
import { findByIdInArray } from "../components/helpers/Data";
import { createCrudActions } from "./CrudActions";


class TeamsStore {
    @observable current = null;
    @observable all = null;
    @observable loading = false;
    @observable error = null;
    @observable normal = null;

    currentId = 0;
    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/teams');
    }

    @action
    setCurrent = (id) => {
        if (!id) {
            this.current = null;
            this.currentId = 0;
            return;
        }

        this.currentId = id;
        this.setCurrentWhenLoaded();
    }

    @action 
    setCurrentWhenLoaded = () => {
        if (!this.currentId || !this.all) return;
        this.current = findByIdInArray(this.all, this.currentId);
    }

    getCreateUrl(tournamentId) {
        return '/tournaments/' + tournamentId + '/teams';
    }

    getListUrl(tournamentId) {
        return '/tournaments/' + tournamentId + '/teams';
    }

    getDeleteUrl(tournamentId) {
        return '/tournaments/' + tournamentId + '/team/delete';
    }
}


export default TeamsStore;