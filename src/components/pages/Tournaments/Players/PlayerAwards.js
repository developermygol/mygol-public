import React from 'react';
import Loc from '../../../common/Locale/Loc';

const awardTypes = ['Award_DreamTeam', 'Award_MVP', 'Award_MaxScorer'];

export default props => {
  const { player, currentIdTeam, currentIdTournament } = props;
  const { awards } = player;
  const hasAwards = awards && awards.length > 0;
  const relevantAwards = awards.filter(
    award => award.idTeam === parseInt(currentIdTeam) && award.idTournament === parseInt(currentIdTournament)
  );

  if (!hasAwards && relevantAwards.length === 0) return null;

  return (
    <div className="PlayerAwards Section">
      <h3>
        <Loc>Awards</Loc>
      </h3>
      {relevantAwards ? (
        <ul className="AwardList">
          {relevantAwards.map((award, i) => {
            const typeKey = awardTypes[award.type];

            return (
              <li className={'Award ' + typeKey} key={i}>
                <p className="AwardTitle">
                  <Loc>{typeKey}</Loc>
                </p>
                <p className="AwardDetail">{award.desc}</p>
                {/* <p className="AwardDate"><LongDate date={award.date} /></p> */}
                <p className="AwardDate">{award.day && award.day.name}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
