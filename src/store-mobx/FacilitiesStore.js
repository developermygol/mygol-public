import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";


class FacilitiesStore {
    @observable all = null;
    @observable loading = false;
    @observable error = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/fields');
    }
}


export default FacilitiesStore;