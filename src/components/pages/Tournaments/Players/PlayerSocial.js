import React from 'react';
import Loc from '../../../common/Locale/Loc';

export default props => {
  const player = props.player;

  return (
    <div className="PlayerSocial Section">
      <div className="Name">
        <p className="PlayerName Color2">&nbsp;&nbsp;{player.name}</p>
        <p className="PlayerSurname Color1">&nbsp;{player.surname}</p>
      </div>
      <div>{player.motto ? <p className="Motto">"{player.motto}"</p> : null}</div>
      <div className="Social">
        {player.signatureImgUrl ? (
          <img className="Signature" src={player.signatureImgUrl} alt={player.name} />
        ) : null}
        <a href="" className="Connect Twitter">
          <Loc>Connect.Twitter</Loc>
        </a>
        <a href="" className="Connect Facebook">
          <Loc>Connect.Facebook</Loc>
        </a>
        <a href="" className="Connect Instagram">
          <Loc>Connect.Instagram</Loc>
        </a>
      </div>
    </div>
  );
};
