import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Loc from './Locale/Loc';
import { Link } from 'react-router-dom';
import { getUploadsIcon } from '../helpers/Utils';
import { withRouter } from 'react-router-dom';


@inject("store") @observer
class BreadCrumb extends Component {
    
    handleClick = () => {
        // Clear the current team when clicking on any of these links. 
        this.props.store.teams.setCurrent(null);
    }
    
    render() {
        const st = this.props.store;
        const t = st.tournaments.current;
        if (!t) return null;
        
        const tournamentLogo = getUploadsIcon(t.logoImgUrl, t.id, 'tournament');
        
        const pa = this.props.match.params;
        let team = null;
        if (pa.idTeam) team = st.teams.current;

        return (
            <div className='BreadCrumb'>
                <div className='TournamentLogo' style={{backgroundImage: 'url(' + tournamentLogo + ')'}}>
                </div>
                <div className='Tournament'>
                    <p><Link to='/tournaments' onClick={this.handleClick}><Loc>Tournaments</Loc></Link></p>
                    <Link to={'/tournaments/' + pa.idTournament}><h3>{t.name}</h3></Link>
                </div>
                
                {team ? 
                    <Fragment>
                        <div className='BreadCrumbSeparator' >&gt;</div>
                        <div className='Team'>

                            <p><Link to={'/tournaments/' + t.id + '/teams'} onClick={this.handleClick}><Loc>Teams</Loc></Link></p>
                            <h3>{team.name}</h3>
                        </div>
                    </Fragment>
                : null}
            </div>
        )
    }
}


export default withRouter(BreadCrumb);