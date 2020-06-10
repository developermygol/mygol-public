import React, { Component } from 'react';
import Loc from '../../common/Locale/Loc';
import { getUploadsImg } from '../../helpers/Utils';

const defaultProps = {
  players: null,
  renderHandler: pl => pl.name + ' ' + pl.surname,
};

class PlayerTable extends Component {
  render() {
    const players = this.props.players;
    if (!players || players.length === 0)
      return (
        <div>
          <Loc>Search.NoPlayerResults</Loc>
        </div>
      );

    return (
      <table>
        <tbody>
          {players.map(pl => (
            <tr key={pl.id}>
              {pl.matchData ? (
                <td>
                  <span className="ApparelNumber">{pl.matchData.apparelNumber}</span>
                </td>
              ) : (
                <td></td>
              )}
              <td>{getUploadsImg(pl.userData.avatarImgUrl, pl.userData.id, 'user', 'PlayerAvatar Mini')}</td>
              <td>{this.props.renderHandler(pl)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

PlayerTable.defaultProps = defaultProps;

export default PlayerTable;
