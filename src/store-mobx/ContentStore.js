import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";
import { sortArrayByTimeStampDesc } from "../components/helpers/Data";
import { getUploadRoot } from "../components/helpers/Utils";
import { asyncAction } from "mobx-utils";
import { request } from "./Store";
import axios from '../axios';

const UploadUrlMagic = "%%%UPLOAD_URL%%%";

export const setupRawContent = (rawContent) => {
    return rawContent.replace(UploadUrlMagic, getUploadRoot());
}

class ContentsStore {
    @observable all = null;
    @observable loading = false;
    @observable error = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/contents', null, null, null, {
            beforeCreate: (req) => { 
                req.rawContent = req.rawContent.replace(getUploadRoot(), UploadUrlMagic);
                return req; 
            },
            beforeEdit: (req) => { 
                req.rawContent = req.rawContent.replace(getUploadRoot(), UploadUrlMagic);
                return req; 
            },
            afterGet: (req) => { 
                req.rawContent = setupRawContent(req.rawContent);
                return req; 
            },

            afterCreate: (requestData, responseData) => { return responseData; },   // Special controller: returns the full record (no rawContent) so updated timestamp can be displayed.
            afterEdit: (requestData, responseData) => { return responseData; },     // Special controller: returns the full record (no rawContent) so updated timestamp can be displayed.
            postProcessAll: (all) => { return sortArrayByTimeStampDesc(all) }
        });
    }

    getSummaries = asyncAction(function *() {
        const res = yield request(this, axios.get, null, '/contents/summaries/fororganization');

        this.all = res;
    })
}


export default ContentsStore;