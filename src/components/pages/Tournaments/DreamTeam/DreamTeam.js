import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { staticServer } from '../../../../axios';

import SoccerField from '../Teams/Tactics/SoccerField';
import { getPlayerLink, getTeamLink, getUploadsImg } from '../../../helpers/Utils';
import Loc from '../../../common/Locale/Loc';

const DreamTeam = () => {
  const { activeTournament, activeTournamentDreamTeamRanking } = useSelector(state => state.tournaments);
  const { tournamentModes } = useSelector(state => state.tournamentModes);
  const [tactics, setTactics] = useState(null);

  const notLoaded =
    !activeTournament ||
    !activeTournament.dreamTeam ||
    activeTournament.dreamTeam === '' ||
    !tournamentModes ||
    !tactics ||
    !activeTournamentDreamTeamRanking;

  useEffect(() => {
    const loadTactics = async () => {
      const { data } = await staticServer.get(`/tactics/tactics.es.json`);

      setTactics(data.tactics);
    };

    loadTactics();
  }, []);

  if (notLoaded) return null;

  const { players: dreamTeamPlayers, title } = JSON.parse(activeTournament.dreamTeam);
  const { numPlayers } = tournamentModes.find(mode => mode.id === activeTournament.idTournamentMode);
  const defaultTactic = tactics.filter(t => t.numPlayers === numPlayers)[0];

  if (!dreamTeamPlayers || activeTournamentDreamTeamRanking.length > 0) return null;

  return (
    <div className="DreamTeamWrapper">
      <SoccerField
        positions={defaultTactic.positions}
        players={dreamTeamPlayers}
        isDreamTeam
        numPlayers={numPlayers}
      />
      <div className="DreamTeam">
        <div className="DreamTeamTitle">{title}</div>
        {Object.keys(activeTournamentDreamTeamRanking).map(key => (
          <div key={uuidV4()} className="DreamTeamPosition">
            <h4 className="Color2">
              <Loc>{`FieldPosition${key}`}</Loc>
            </h4>
            {activeTournamentDreamTeamRanking[key].map(player => (
              <div key={uuidV4()} className="Player">
                {getUploadsImg(player.avatarImgUrl, player.idPlayer, 'user', 'Avatar')}
                <div className="Details">
                  <span className="PlayerName">
                    {getPlayerLink(activeTournament.id, player.idTeam, player)}
                  </span>
                  <span className="TeamName">
                    {getTeamLink(activeTournament.id, player.idTeam, player.teamName)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamTeam;
