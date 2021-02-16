import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import Loc, { Localize } from '../../../../common/Locale/Loc';
import { getUploadsImg, getPlayerLink } from '../../../../helpers/Utils';
import { redirect } from '../../../../common/FormsMobx/Utils';
import InfoBox from '../../../../common/InfoBox';
import { findByIdInArray } from '../../../../helpers/Data';

const defaultProps = {
  match: null,
  canAdd: true,
  canEdit: true,
  canDelete: true,

  addMessage: '',
  listData: null,

  editHandler: null,
  addHandler: null,
  deleteHandler: null,
};

@observer
class EventList extends Component {
  getTeam = (match, idTeam) => {
    const team = match.idHomeTeam === idTeam ? match.homeTeam : match.visitorTeam;
    return team;
  };

  getPlayer = (match, idTeam, idPlayer) => {
    const players = match.idHomeTeam === idTeam ? match.homePlayers : match.visitorPlayers;
    return findByIdInArray(players, idPlayer);
  };

  getTypeElement = (type, minute, match) => {
    const imageEventsTypes = [30, 31, 50, 61, 62, 63, 64, 65]; // TODO: 🚧 Search for all
    const hasImageEventType = imageEventsTypes.find(el => el === type);
    const isMatchStarted = type === 1;
    const isShootout = type === 80;

    if (minute !== undefined || isMatchStarted)
      return (
        <span className={'EventType Type' + type}>{`${Localize('MatchEventType' + type)} ${
          isShootout &&
          `(${match.homeScore - match.visibleHomeScore}-${match.visitorScore - match.visibleVisitorScore}) `
        } (${minute}')`}</span>
      );

    if (hasImageEventType) return <span className={'PlayerStat EventType Type' + type}></span>;

    return <span className={'EventType Type' + type}>{Localize('MatchEventType' + type)}</span>;
  };

  addButtonHandler = () => {
    redirect(this, this.props.match.url + '/events/new');
  };

  getPlayerRender = (match, idTeam, idPlayer, first) => {
    const player = this.getPlayer(match, idTeam, idPlayer);
    const { idTournament } = this.props.match.params;

    if (player)
      if (player.userData)
        if (first)
          return (
            <Fragment>
              <span className="Name">{getPlayerLink(idTournament, player.matchData.idTeam, player)}</span>
              <span>
                {getUploadsImg(player.userData.avatarImgUrl, player.userData.id, 'user', 'PlayerAvatar Mini')}
              </span>
              <span className="ApparelNumber Color1Border">{player.matchData.apparelNumber}</span>
            </Fragment>
          );
        else
          return (
            <Fragment>
              <span className="ApparelNumber Color1Border">{player.matchData.apparelNumber}</span>
              <span>
                {getUploadsImg(player.userData.avatarImgUrl, player.userData.id, 'user', 'PlayerAvatar Mini')}
              </span>
              <span className="Name">{getPlayerLink(idTournament, player.matchData.idTeam, player)}</span>
            </Fragment>
          );
      else return <span className="">{player.name + ' ' + player.surname}</span>;
  };

  isVisibleEvent = type => {
    switch (type) {
      // case 30: // Assist
      case 100: // Record closed
      case 1001: // hidden: AddToPdrData1
      case 1002: // hidden: AddTournamentPoints
        return false;
      default:
        return true;
    }
  };

  render() {
    const match = this.props.listData;
    if (!match) return;

    const events = match ? match.events : null;

    return (
      <Fragment>
        {!match || !match.events || match.events.length === 0 ? (
          <Fragment>
            <InfoBox>
              <Loc>Match.NoEvents</Loc>
            </InfoBox>
          </Fragment>
        ) : (
          <Fragment>
            <div className="MatchEventsTable">
              {events.map(ev => {
                if (!this.isVisibleEvent(ev.type)) return null;

                const home = ev.idTeam === match.idHomeTeam;
                const isMatchStart = ev.type === 1;

                return (
                  <div key={ev.id} className="Entry">
                    {ev.idTeam === 0 || isMatchStart ? (
                      <div className="Wide" colSpan={5}>
                        {/* <div className="Time"> */}
                        {/* <span className="Minute">{ev.matchMinute}'</span> */}
                        {/* <span className='Hour'> {getFormattedTime(ev.timeStamp)}</span> */}
                        {/* </div> */}
                        {this.getTypeElement(ev.type, ev.matchMinute, match)}
                      </div>
                    ) : (
                      <Fragment>
                        <div className="Group-Right">
                          <div className="EntryBox Left Player">
                            {home ? this.getPlayerRender(match, ev.idTeam, ev.idPlayer, home) : null}
                          </div>
                          <div className="EntryBox Left Type">
                            {home ? this.getTypeElement(ev.type) : null}
                          </div>
                        </div>
                        <div className="EntryBox Central">
                          <div className="Time">
                            <span className="Minute">{ev.matchMinute}'</span>
                            {/* <span className='Hour'> {getFormattedTime(ev.timeStamp)}</span> */}
                          </div>
                        </div>
                        <div className="Group-Left">
                          <div className="EntryBox Right Type">
                            {home ? ' ' : this.getTypeElement(ev.type)}
                          </div>
                          <div className="EntryBox Rigt Player">
                            {home ? ' ' : this.getPlayerRender(match, ev.idTeam, ev.idPlayer, home)}
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </div>
                );
              })}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

EventList.defaultProps = defaultProps;

export default withRouter(EventList);
