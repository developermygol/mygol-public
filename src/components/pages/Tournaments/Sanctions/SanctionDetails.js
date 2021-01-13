import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Loc, { Localize } from '../../../common/Locale/Loc';
import { getFormattedDateTime, getFormattedDate } from '../../../common/FormsMobx/Utils';
import { getPlayerLink, getTeamLink, getTournamentLink, getMatchLink } from '../../../helpers/Utils';
import { inject, observer } from 'mobx-react';
import Spinner from '../../../common/Spinner/Spinner';
import { observable } from 'mobx';
import MatchView from '../Calendar/MatchView';

class DetailField extends Component {
  render() {
    const p = this.props;

    return (
      <div className="Field">
        <p className="Header">
          <Loc>{p.label}</Loc>
        </p>
        <p className="Value">{p.value}</p>
      </div>
    );
  }
}

class SanctionDetailsCard extends Component {
  render() {
    const { sanction } = this.props;

    return (
      <div className="">
        {/* <h3><Loc>Details</Loc></h3> */}
        <div className="Content">
          {sanction.type === 2 ? ( // Team sanctions
            <Fragment>
              <h3>
                <Loc>Sanctions.Type.Team</Loc>
              </h3>
              <div className="Details Horizontal">
                <DetailField
                  label="Team"
                  value={getTeamLink(
                    sanction.idTournament,
                    sanction.idTeam,
                    sanction.team && sanction.team.name
                  )}
                />
                <DetailField label="Tournament" value={sanction.tournament && sanction.tournament.name} />
                <DetailField label="Start date" value={getFormattedDate(sanction.startDate)} />
              </div>
              <div className="Details Horizontal">
                <DetailField label="Sanctions.Status" value={Localize('SanctionStatus' + sanction.status)} />
                <DetailField
                  label="Sanctions.Match"
                  value={getMatchLink(
                    sanction.idTournament,
                    sanction.idMatch,
                    Localize('Sanctions.Match.Click')
                  )}
                />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <h3>
                <Loc>Sanctions.Type.Player</Loc>
              </h3>
              <div className="Details Horizontal">
                <DetailField
                  label="Player"
                  value={getPlayerLink(sanction.idTournament, sanction.idTeam, sanction.player)}
                />
                <DetailField
                  label="Team"
                  value={getTeamLink(
                    sanction.idTournament,
                    sanction.idTeam,
                    sanction.team && sanction.team.name
                  )}
                />
                <DetailField
                  label="Tournament"
                  value={getTournamentLink(
                    sanction.idTournament,
                    sanction.tournament && sanction.tournament.name
                  )}
                />
              </div>
              <div className="Details Horizontal">
                <DetailField label="Start date" value={getFormattedDate(sanction.startDate)} />
                <DetailField label="Sanctions.NumMatches" value={sanction.numMatches} />
                <DetailField label="Sanctions.Status" value={Localize('SanctionStatus' + sanction.status)} />
              </div>
              <div className="Details Horizontal">
                <DetailField
                  label="Sanctions.Match"
                  value={getMatchLink(
                    sanction.idTournament,
                    sanction.idMatch,
                    Localize('Sanctions.Match.Click')
                  )}
                />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

class SanctionAllegation extends Component {
  render() {
    const p = this.props;
    const al = p.allegation;
    // console.log(al);
    // const user = al.user || { level: al.idUser >= 10000000 ? 5 : 1, name: '' };

    return (
      <div className="SubDetail">
        <div className="AllegTitle">{al.title}</div>
        <div className="Horizontal">
          {/* <p className="Header">{user.name}</p> */}
          {/* <p className="Header"> - {Localize('UserLevel' + user.level)}</p> */}
          <p className="Header">{p.typeName}</p>
          <p className="Date">{getFormattedDateTime(al.date)}</p>
        </div>
        <div className="Text">{al.content}</div>
      </div>
    );
  }
}

class SanctionAllegations extends Component {
  render() {
    const p = this.props;

    return (
      <div className="Section">
        {/* <h3><Loc>Sanction.Allegations</Loc></h3> */}
        <div className="Content">
          {p.allegations &&
            p.allegations.map(al => <SanctionAllegation key={al.id} allegation={al} typeName={p.typeName} />)}
        </div>
      </div>
    );
  }
}

class SanctionMatches extends Component {
  render() {
    const { sanction } = this.props;
    if (!sanction) return null;

    const matches = sanction.sanctionMatches;

    return (
      <div className="Section">
        <h3>
          <Loc>Sanctions.Matches</Loc>
        </h3>
        <div className="MatchesTable">
          <table>
            <tbody>
              {matches &&
                matches.map(m => {
                  return (
                    <MatchView
                      key={m.id}
                      tId={sanction.idTournament}
                      match={m}
                      home={m.homeTeam}
                      visitor={m.visitorTeam}
                      displaySanctioned
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

@inject('store')
@observer
class SanctionDetails extends Component {
  @observable showAllegationDialog = false;
  @observable showConfirmDialog = false;
  @observable dialogProps = null;

  componentDidMount = () => {
    const p = this.props;
    const { idSanction } = p.match.params;
    p.store.sanctions.actions.get(idSanction);
  };

  render() {
    const p = this.props;
    const store = p.store.sanctions;
    const sanction = store.current;
    const isPlayerSanction = sanction && sanction.type !== 2;
    const sanctionTypeName = sanction ? (
      <Loc>{sanction.type === 2 ? 'Sanctions.Type.Team' : 'Sanctions.Type.Player'}</Loc>
    ) : (
      ''
    );

    return (
      <Fragment>
        <h2>
          <Loc>Sanction</Loc>
        </h2>
        <Spinner loading={store.loading}>
          {store.current ? (
            <Fragment>
              <SanctionDetailsCard sanction={sanction} />
              {isPlayerSanction && <SanctionMatches sanction={sanction} />}
              <SanctionAllegations typeName={sanctionTypeName} allegations={sanction.allegations} />
            </Fragment>
          ) : null}
        </Spinner>
      </Fragment>
    );
  }
}

export default withRouter(SanctionDetails);
