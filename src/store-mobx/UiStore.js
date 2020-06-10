import { observable, action } from "mobx";

class UiStore {
    @observable lang = "es";


    @action setLang(lang) {
        this.lang = lang;
    }
}

export default new UiStore();
