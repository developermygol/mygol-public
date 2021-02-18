import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { startLoadAward } from '../../../store/actions/awards';
import { getPlayerLink, getTeamLink, getTeamLogo, getUploadsImg } from '../../helpers/Utils';
import Loc from '../../common/Locale/Loc';

const AwardScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { activeAward } = useSelector(state => state.awards);

  useEffect(() => {
    dispatch(startLoadAward(id));
  }, []);

  if (!activeAward) return null;

  const { type, text1, player, day, tournament, team } = activeAward;

  return (
    <div className={`LargeAward AwardType${type}`}>
      <div className="Details">
        <p className="Tournament Color2">{tournament.name}</p>
        <p className="PlayerName Color2">
          {player.name}
          {player.surname}
        </p>
        <p className="AwardTitle Color3">
          <Loc>{`AwardType${type}`}</Loc>
        </p>
        <p className="AwardDetail Color3">{text1}</p>
        <p className="AwardDate">{day.name}</p>
      </div>
      <div className="PlayerTeam">
        <div className="TeamBadge">
          {/* <img src="/static/team/default2.png" alt="" className="TeamLogo" /> */}
          {getTeamLogo(tournament.id, team.id, team.logoImgUrl)}
          {getTeamLink(tournament.id, team.id, team.name)}
          {/* <a href="/tournaments/52/teams/301">{team.name}</a> */}
        </div>
        <div className="PlayerBadge">
          {/* <img src="/static/user/default1.png" alt="" className="PlayerAvatar Medium" /> */}
          {getUploadsImg(player.userData.avatarImgUrl, player.id, 'user', 'PlayerAvatar Medium')}
          {getPlayerLink(tournament.id, team.id, player)}
          {/* <a href="/tournaments/52/teams/301/players/160">{player.name}</a> */}
        </div>
      </div>
    </div>
  );
};

export default AwardScreen;
