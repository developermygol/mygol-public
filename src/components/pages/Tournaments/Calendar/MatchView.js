import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getFormattedDateTime } from '../../../common/FormsMobx/Utils';
import { getUploadsImg, matchHasSootOut } from '../../../helpers/Utils';
import Loc, { Localize } from '../../../common/Locale/Loc';

const matchHasResult = match => {
  const s = match.status;
  console.log(match.status);
  // eslint-disable-next-line eqeqeq
  return s == 3 || s == 4 || s == 5;
};

class MatchView extends Component {
  getMatchSanctionStatusBadge = match => {
    return <span className={match.status <= 3 ? 'SanctionMatchPending' : 'SanctionMatchDone'}></span>;
  };

  render() {
    const p = this.props;
    const { match, home, visitor, tId } = p;
    const isMatchPlaying = match.status === 3;
    const hasShootout = matchHasSootOut(match);

    return (
      <tr key={match.id}>
        <td className="MatchSchedule">
          <Link to={'/tournaments/' + tId + '/matches/' + match.id}>
            {/* <span className='Day'>{day.name}</span> */}
            {p.displaySanctioned ? this.getMatchSanctionStatusBadge(match) : null}
            <span className="Date">{getFormattedDateTime(new Date(match.startTime))}</span>
          </Link>
        </td>
        <td className="MatchTeamName Home ">
          {home ? (
            <Link to={'/tournaments/' + tId + '/teams/' + home.id}>{home.name}</Link>
          ) : (
            <span className="MatchTeamDesc">{match.homeTeamDescription}</span>
          )}
        </td>
        <td className="MatchTeamLogo Home">
          {home ? getUploadsImg(home.logoImgUrl, home.id, 'team', 'TeamLogo') : null}
        </td>

        {matchHasResult(match) ? (
          <td className="MatchScore">
            {isMatchPlaying ? (
              <div className="ScoreWrapper Playing">
                <span className="MatchPlaying">
                  <Loc>MatchStatus3</Loc>
                </span>
                <span className="Score Color2">{hasShootout ? match.visibleHomeScore : match.homeScore}</span>
                <span className="Score Color2">
                  {hasShootout ? match.visibleVisitorScore : match.visitorScore}
                  {hasShootout && (
                    <span className="PenaltiesWinner" title={Localize('PenaltiesWinner')}></span>
                  )}
                </span>
              </div>
            ) : (
              <React.Fragment>
                <span className="Score Color2">{hasShootout ? match.visibleHomeScore : match.homeScore}</span>
                <span className="Score Color2">
                  {hasShootout ? match.visibleVisitorScore : match.visitorScore}
                  {hasShootout && (
                    <span className="PenaltiesWinner" title={Localize('PenaltiesWinner')}></span>
                  )}
                </span>
              </React.Fragment>
            )}
          </td>
        ) : (
          <td className="MatchNoScore">
            <Loc>{'MatchStatus' + match.status}</Loc>
          </td>
        )}

        <td className="MatchTeamLogo Visitor">
          {visitor ? getUploadsImg(visitor.logoImgUrl, visitor.id, 'team', 'TeamLogo') : null}
        </td>
        <td className="MatchTeamName Visitor">
          {visitor ? (
            <Link to={'/tournaments/' + tId + '/teams/' + visitor.id}>{visitor.name}</Link>
          ) : (
            <span className="MatchTeamDesc">{match.visitorTeamDescription}</span>
          )}
        </td>
        <td>{match.field ? '@ ' + (match.field && match.field.name) : null}</td>
        {match.videoUrl ? (
          <td className="MatchVideoWrapper">
            <span className="MatchVideo">Vi</span>
          </td>
        ) : null}
      </tr>
    );
  }
}

export default MatchView;
