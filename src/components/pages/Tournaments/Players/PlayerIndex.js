import React, { Component } from 'react';
import Spinner from '../../../common/Spinner/Spinner';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { requestAsync, getBaseUrl } from '../../../helpers/Utils';
import axios from '../../../../axios';
import PlayerData from './PlayerData';
import PlayerSocial from './PlayerSocial';
import PlayerAwards from './PlayerAwards';
import PlayerStats from './PlayerStats';
import Loc from '../../../common/Locale/Loc';
import InfoBox from '../../../common/InfoBox';
import PlayerSanctions from '../Sanctions/PlayerSanctions';

@observer
class PlayerIndex extends Component {
  @observable loading = false;
  @observable player = null;

  setBodyStyle(style) {
    document.body.style = style;
  }

  componentDidMount() {
    const { idPlayer, idTeam, idTournament } = this.props.match.params;
    requestAsync(
      this,
      axios.get,
      null,
      '/players/' + idPlayer + '/' + idTeam + '?idTournament=' + idTournament
    ).then(res => {
      this.player = res;
      if (res && res.largeImgUrl) {
        this.setBodyStyle(
          "background-image: url('" +
            getBaseUrl(process.env.REACT_APP_STATIC_UPLOADS_URL) +
            '/' +
            res.largeImgUrl +
            "');"
        );
      }
    });
  }

  componentWillUnmount() {
    this.setBodyStyle('');
  }

  render() {
    const { player } = this;
    const { /*idPlayer,*/ idTeam, idTournament } = this.props.match.params;

    return (
      <Spinner loading={this.loading}>
        {player ? (
          <div className="">
            {/* <TitleTwoLinesComponent title={player.name} title2={player.surname} /> */}

            <PlayerData player={player} />
            <PlayerSocial player={player} />
            <PlayerAwards player={player} currentIdTeam={idTeam} currentIdTournament={idTournament} />
            <PlayerStats player={player} />
            <PlayerSanctions sanctions={player.sanctions} />
          </div>
        ) : (
          <InfoBox>
            <Loc>Player.NotFound</Loc>
          </InfoBox>
        )}
      </Spinner>
    );
  }
}

export default PlayerIndex;
