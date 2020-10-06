import React, { Component } from 'react';
import { getIndexForValue } from '../../../../helpers/Data';
import { getUploadsIcon, getBaseUrl } from '../../../../helpers/Utils';

export default class SoccerField extends Component {
  getPoints() {
    const { positions, players } = this.props;
    if (!positions) return null;

    return positions.map((pos, i) => {
      const playerIdx = getIndexForValue(players, 'teamData.idTacticPosition', i);
      const player = playerIdx !== null ? players[playerIdx] : null;

      return (
        <div
          key={i}
          className="TacticPlayer"
          style={{
            position: 'absolute',
            bottom: ((pos.x - 1) * 100) / 16 + '%',
            left: ((pos.y - 1) * 100) / 10 + '%',
          }}
        >
          {player ? (
            <img
              src={getUploadsIcon(player.userData && player.userData.avatarImgUrl, player.id, 'user')}
              alt="user-icon"
            />
          ) : null}
        </div>
      );
    });
  }

  render() {
    //const st = '#AAA';
    //const sw = 0.1;

    // Decide field type based on numPlayers
    //const numPlayers = this.props.store.tournaments.teamSize;

    const numPlayers = 11;
    const image = numPlayers === 11 ? 'cesped.png' : 'sala.png';

    return (
      <div className="TacticContainer">
        <div
          className="TacticField"
          style={{
            backgroundImage:
              'url(' + getBaseUrl(process.env.REACT_APP_STATIC_STATIC_URL) + '/tactics/' + image,
          }}
        >
          <div className="TacticPositions">{this.getPoints()}</div>
        </div>
      </div>

      // <svg version="1.1" viewBox="0 0 16 10" {...this.props.passProps} onClick={this.props.onClick}>

      //     {/* <rect style={{ fill: '#ffffff' }} x='0' y='0' width='16' height='10' /> */}
      //     <rect style={{ fill: 'none', stroke: st, strokeWidth: sw * 2 }} x='0' y='0' width='16' height='10' />
      //     <line style={{ fill: 'none', stroke: st, strokeWidth: sw }} x1='8' y1='0' x2='8' y2='10' />
      //     <circle style={{ fill: 'none', stroke: st, strokeWidth: sw }} cx='8' cy='5' r='1.5' />

      //     <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x='0' y='2.5' width='2.5' height='5' />
      //     <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x='0' y='4' width='1' height='2' />

      //     <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x='13.5' y='2.5' width='2.5' height='5' />
      //     <rect style={{ fill: 'none', stroke: st, strokeWidth: sw }} x='15' y='4' width='1' height='2' />

      //     {this.getPoints()}
      // </svg>
    );
  }
}
