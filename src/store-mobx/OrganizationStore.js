import axios from '../axios'
import { asyncAction } from 'mobx-utils';
import { observable } from 'mobx';
import { request } from './Store';
import { setLang } from '../components/common/Locale/Loc';

export default class OrganizationStore {
    @observable current = null;
    @observable loading = false;
    @observable error = null;
    @observable tournamentModes = null;
    @observable categories = null;
    @observable seasons = null;
    @observable menuEntries = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    fetch = asyncAction( function *() {
        const res = yield request(this, axios.get, null, '/organization');
        if (!res) {
            // No org is available, can't do anything. Logout. 
            return;
        }

        this.current = res;
        this.tournamentModes = res.modes;
        this.categories = res.categories;
        this.seasons = res.seasons;
        this.menuEntries = res.menuEntries;
        this.rootStore.sponsors.forOrganization = res.sponsors;

        if (res.defaultLang) setLang(res.defaultLang);
    })
}
