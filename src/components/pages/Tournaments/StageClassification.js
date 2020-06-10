import React, { Component } from 'react';
import LeagueClassification from './LeagueClassification';
import KnockoutClassification from './KnockoutClassification';
import Loc from '../../common/Locale/Loc';
import InfoBox from '../../common/InfoBox';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { requestAsync } from '../../helpers/Utils';
import axios from '../../../axios';


@inject('store') @observer
class StageClassification extends Component {

    @observable loadedStage = null;
    @observable loading = false;
    @observable error = null;


    componentDidMount = () => {
        this.update();
    }

    update = () => {
        requestAsync(this, axios.get, null, '/tournaments/stageclassification/' + this.props.stage.id)
            .then(res => this.loadedStage = res);
    }

    render() {
        const p = this.props;
        const t = p.tournament;
        const { stage } = p;

        if (this.loadedStage && p.stage.id !== this.loadedStage.id) {
            this.update();
            return null;
        }

        const teams = p.store.teams.all;
        if (!teams) return null;

        const ls = this.loadedStage;

        if (ls) {
            if (ls.leagueClassification)
                return <LeagueClassification stage={stage} classification={ls.leagueClassification} teams={teams} tournament={t} />
            else if (ls.knockoutClassification)
                return <KnockoutClassification classification={ls.knockoutClassification} teams={teams} tournament={t} />
            else
                return <InfoBox>{stage.name}<Loc>Classification.NoData</Loc></InfoBox>;
        }

        return null;
    }
}

export default StageClassification;