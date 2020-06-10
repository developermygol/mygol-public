import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";


export default class StagesStore {
    
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/stages');
    }

    getActiveStageIndex = () => {
        if (!this.all) return -1;

        for (let i = 0; i < this.all.length; ++i) {
            const stage = this.all[i];

            if (stage && stage.status === 2) return i;
        }

        return -1;
    }
}