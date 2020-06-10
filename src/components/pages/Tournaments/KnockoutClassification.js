import React, { Component, Fragment } from 'react';
import InfoBox from '../../common/InfoBox';
import Loc, { Localize } from '../../common/Locale/Loc';
import { getTeamLogo, getTeamLink } from '../../helpers/Utils';
import { normalize } from '../../helpers/Data';

class KnockoutClassification extends Component {
    render() {
        const p = this.props;
        const days = p.classification;
        if (!days || days.length === 0) return <InfoBox><Loc>Knockout.NoMatchDays</Loc></InfoBox>

        const normalTeams = normalize(p.teams);

        return (
            <div className='Knockout'>
                {days.map(day => {
                    return <KnockoutStage key={day.id} day={day} {...p} normalTeams={normalTeams} />
                })}
            </div>
        )
    }
}

class KnockoutStage extends Component {
    render() {
        const p = this.props;
        const matches = p.day.matches;
        if (!matches) return null;

        return (
                <div className='KnockoutStage'>
                    {matches.map(match => {
                        return <KnockoutMatch key={match.id} match={match} {...p} />
                    })}
                </div>
        )
    }
}

class KnockoutMatch extends Component {
    render() {
        const p = this.props;
        const { match, normalTeams } = p;

        const homeTeam = normalTeams[match.idHomeTeam];
        const visitorTeam = normalTeams[match.idVisitorTeam];

        return (
            <div className='KnockoutMatch'>
                <KnockoutTeam team={homeTeam} description={match.homeTeamDescription} score={match.homeScore}  {...p} showScore={match.status >= 3} />
                <KnockoutTeam team={visitorTeam} description={match.visitorTeamDescription} score={match.visitorScore}  {...p} showScore={match.status >= 3} />
            </div>
        )
    }
}

class KnockoutTeam extends Component {
    render() {
        const p = this.props;
        const { team, tournament } = p;

        return (
            <div className='KnockoutTeam'>
                {team ?
                    <Fragment>
                        <span className='Logo'>{getTeamLogo(tournament.id, team.id, team.logoImgUrl)}</span>
                        <span className='TeamName'>{getTeamLink(tournament.id, team.id, team.name)}</span>
                        {p.showScore ? <span className='Score'>{p.score}</span> : <span className='Score'>·</span> }
                    </Fragment>
                    :
                    <span className='MatchTeamDescription'>{p.description || Localize('Knockout.NoTeam')}</span>
                }
            </div>
        )
    }
}

export default KnockoutClassification;