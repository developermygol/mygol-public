import { observable } from "mobx";
import { asyncAction } from "mobx-utils";
import { Localize } from "../components/common/Locale/Loc";
import { toast } from "react-toastify";
import { getOpErrorText } from "../components/common/FormsMobx/Utils";


import TournamentStore from "./TournamentsStore";
import TeamsStore from "./TeamsStore";
import PlayersStore from "./PlayersStore";
import OrganizationStore from "./OrganizationStore";
import TacticsStore from "./TacticsStore";
import FacilitiesStore from "./FacilitiesStore";
import RefereesStore from "./RefereesStore";
import ContentsStore from "./ContentStore";
import StagesStore from "./StagesStore";
import StageGroupsStore from "./StageGroupsStore";
import TeamGroupsStore from './TeamGroupsStore';
import SponsorsStore from "./SponsorsStore";
import SanctionsStore from "./SanctionsStore";


export const request = asyncAction( function *(state, operation, okMessage, ...args) {
    try {
        state.loading = true;
        const res = yield operation(...args);
        state.loading = false;
        if (okMessage) toast.success(Localize(okMessage));
        return res.data;
    } catch (err) {
        console.dir(state);
        state.error = err;
        state.loading = false;
        toast.error(getOpErrorText(err));
        return null;
    }
})


class EntitiesStore {
    @observable organization = new OrganizationStore(this);
    @observable tournaments = new TournamentStore(this);
    @observable teams = new TeamsStore(this);
    @observable stages = new StagesStore(this);
    @observable groups = new StageGroupsStore(this);
    @observable teamGroups = new TeamGroupsStore(this);
    @observable players = new PlayersStore(this);
    @observable tactics = new TacticsStore(this);
    @observable facilities = new FacilitiesStore(this);
    @observable referees = new RefereesStore(this);
    @observable contents = new ContentsStore(this);
    @observable sponsors = new SponsorsStore(this);
    @observable sanctions = new SanctionsStore(this);
}


export default new EntitiesStore();