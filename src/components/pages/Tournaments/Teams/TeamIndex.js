import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Loc from '../../../common/Locale/Loc';
import TeamGoalsChart from './TeamGoalsChart';
import TeamRankingChart from './TeamRankingChart';
import TitleOneLineComponent from '../../../common/TitleOneLineComponent';
import { getUploadsImg, requestAsync } from '../../../helpers/Utils';
import { observable } from 'mobx';
import Spinner from '../../../common/Spinner/Spinner';
import axios from '../../../../axios';
import TeamPlayers from './TeamPlayers';
import TeamCalendar from './TeamCalendar';
import DetailedTacticViewer from './Tactics/DetailedTacticViewer';
import SponsorBanner from '../../../common/SponsorBanner';
import TeamPicture from './TeamPicture';
import Apparel from './Apparel/Apparel';
import TeamSanctions from '../Sanctions/TeamSanctions';


@inject('store') @observer
class TeamIndex extends Component {

    @observable team = null;
    @observable loading = true;

    componentDidMount() {
        const { idTeam, idTournament } = this.props.match.params;

        requestAsync(this, axios.get, null, '/teams/' + idTeam + '/details/' + idTournament)
            .then(res => {
                this.team = res;
                this.props.store.sponsors.forTeam = res.sponsors;
            });
    }

    getResult = (array, fieldName) => {
        return array.map(d => {
            const tdr = d.teamDayResults;
            if (!tdr || tdr.length === 0) return null;
            return tdr[0][fieldName];
        });
    }

    render() {
        const team = this.team;

        return (
            <Spinner loading={this.loading} >
                { team ?
                <div className='SectionContainer'>

                    <TitleOneLineComponent title={team.name} image={getUploadsImg(team.logoImgUrl, team.id, 'team', 'TeamLogo')} className='Team' />

                    <div className='Section'>
                        <h3><Loc>Players</Loc></h3>
                        <TeamPicture image={team.teamImgUrl} />
                        <div className='Content'>
                            <TeamPlayers data={team.players} />
                        </div>
                    </div>

                    <SponsorBanner className='Secondary' position={2} team />

                    <TeamPicture image={team.teamImgUrl2} />

                    <div className='Section TacticM'>
                        <div className='Content'>
                            <DetailedTacticViewer value={team.idTactic} players={team.players} />
                            { team.apparelConfig ? <Apparel data={team.apparelConfig} /> : null }
                        </div>
                    </div>

                    <div className='Section Rankings'>
                        <h3><Loc>Rankings</Loc></h3>
                        <div className='Content'>
                            <div className='WideContainer'>
                                <TeamGoalsChart data={this.getResult(team.days, 'points')} numDays={team.days.length} />
                                <TeamRankingChart data={this.getResult(team.days, 'ranking1')} numDays={team.days.length} numTeams={team.days.length + 1} />
                            </div>
                        </div>
                    </div>

                    <TeamPicture image={team.teamImgUrl3} />

                    {/* <div className='Section'>
                        <h3><Loc>Awards</Loc></h3>
                        <div className='Content'>
                            <p>List of team awards (not players, only team awards here. But probably related.</p>
                        </div>
                    </div> */}

                    <div className='Section'>
                        <h3><Loc>Matches</Loc></h3>
                        <div className='Content'>
                            <TeamCalendar data={team.days} idTournament={this.props.match.params.idTournament} />
                        </div>
                    </div>


                    <div className='Section'>
                        <h3><Loc>Sanctions.Team.All</Loc></h3>
                        <div className='Content'>
                            <TeamSanctions />
                        </div>
                    </div>

                </div>
                : null }
            </Spinner>
        )
    }
}

export default TeamIndex;