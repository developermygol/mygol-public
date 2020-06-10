import React,  { Component } from 'react';
import Classification from './Classification';
import Spinner from '../../common/Spinner/Spinner';
import ScorersRanking from './ScorersRanking';
import Calendar from './Calendar/Calendar';
import SponsorBanner from '../../common/SponsorBanner';
import Loc from '../../common/Locale/Loc';
import { Link, withRouter } from 'react-router-dom';
import TournamentSanctionsSummary from './Sanctions/TournamentSanctionsSummary';
import { inject, observer } from 'mobx-react';


@inject('store') @observer
export default withRouter(class CompetitionHome extends Component {
    render() {
        const t = this.props.store.tournaments.current;

        return (
            <div className='SectionContainer'>
                <div className='Header'>
                    
                </div>
                <Spinner loading={t === undefined || t === null}>
                    <div className='Section'>
                        <h3><Loc>Classification</Loc></h3>
                        <div className='Content'>
                            <Classification data={t} />
                        </div>
                    </div>

                    <SponsorBanner className='Secondary' position={2} organization />

                    <div className='Section'>
                        <h3><Loc>Calendar</Loc></h3>
                        <div className='Content'>
                            <Link className='ActionLink' to={ this.props.match.url + '/matches'}><Loc>View complete calendar</Loc></Link>
                            <Calendar />
                        </div>
                    </div>


                    {/* <div className='Section'>
                        <h3>Equipo ideal</h3>
                        <div className='Content'>

                        </div>
                    </div>


                    <div className='Section'>
                        <h3>MVPs</h3>
                        <div className='Content'>

                        </div>
                    </div> */}

                    <div className='Section'>
                        <h3><Loc>ScorersRanking</Loc></h3>
                        <div className='Content'>
                            <ScorersRanking />
                        </div>
                    </div>

                    {/* <div className='Section'>
                        <h3>Ranking Zamora</h3>
                        <div className='Content'>
                        <p>Lazy load</p>
                        <p>Rank, team name, pointsAgainst, gamesPlayed, points, pointDiff <a href="http://futplaya.com/tournament.php?n=65">Sample futplaya</a></p>
                        </div>
                    </div> */}

                    <div className='Section'>
                        <h3><Loc>Sanctions</Loc></h3>
                        <div className='Content'>
                            <TournamentSanctionsSummary />
                        </div>
                    </div>

                </Spinner>
            </div>
        )
    }
})
