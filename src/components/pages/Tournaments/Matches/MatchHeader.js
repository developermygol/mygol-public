import React, { Component, Fragment } from 'react';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { getUploadsImg } from '../../../helpers/Utils';
import { getFormattedDateTime } from '../../../common/FormsMobx/Utils';
import { Link, withRouter } from 'react-router-dom';
import VideoContainer from '../../Content/VideoContainer';

export default class MatchHeader extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="MatchHeader">
        {/* Should have the routes for display and edition here. */}
        {match.videoUrl && <VideoContainer video={match.videoUrl} />}
        <div className="MatchTeams">
          <TeamInfo team={match.homeTeam} fillerText={match.homeTeamDescription} />
          <MatchStatus match={match} onEdit={this.props.onEdit} />
          <TeamInfo team={match.visitorTeam} fillerText={match.visitorTeamDescription} />
        </div>
      </div>
    );
  }
}

const TeamInfo = withRouter(
  class extends Component {
    render() {
      const { props } = this;
      const { team, fillerText } = props;
      const { idTournament } = this.props.match.params;

      if (!team)
        return (
          <div className={'Team'}>
            <div className="FillerText">{fillerText}</div>
          </div>
        );

      return (
        <div className={'Team'}>
          <div className="LargeTeamInfo ">
            {getUploadsImg(team.logoImgUrl, team.id, 'team', 'TeamLogo')}
            <Link to={'/tournaments/' + idTournament + '/teams/' + team.id}>
              <p className="TeamName">{team.name}</p>
            </Link>
          </div>
        </div>
      );
    }
  }
);

class MatchStatus extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="MatchStatus">
        <div className="Details">
          <p className="Day">{match.day ? match.day.name : null}</p>
          <p>
            <span className="V">
              {match.startTime ? getFormattedDateTime(match.startTime) : Localize('Match.NoTime')}
            </span>{' '}
          </p>
          <p>
            <span className="">{match.field ? match.field.name : Localize('Match.NoFacility')}</span>
          </p>
        </div>
        <div className="Scores">
          {match.status >= 3 ? (
            <Fragment>
              <span className="Score">{match.homeScore}</span>{' '}
              <span className="Score">{match.visitorScore}</span>
            </Fragment>
          ) : null}
        </div>
        <div className="Details">
          <p>
            <span className={'MatchStatus' + match.status}>
              <Loc>{'MatchStatus' + match.status}</Loc>
            </span>
          </p>
        </div>
      </div>
    );
  }
}
