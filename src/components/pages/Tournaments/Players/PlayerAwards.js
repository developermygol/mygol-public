import React from 'react';
import Loc from '../../../common/Locale/Loc';
import { awardTypes } from '../../../helpers/Awards';

// const awardTypes = ['Award_DreamTeam', 'Award_MVP', 'Award_MaxScorer'];

export default props => {
  const { player, currentIdTeam, currentIdTournament, history } = props;
  const { awards } = player;
  const hasAwards = awards && awards.length > 0;
  const relevantAwards = awards.filter(
    award =>
      award.idTeam === parseInt(currentIdTeam, 10) && award.idTournament === parseInt(currentIdTournament, 10)
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
            const typeKey = awardTypes(award.type);

            return (
              <li className={'Award ' + typeKey} key={i}>
                <p
                  className="AwardTitle"
                  style={{ cursor: 'pointer' }}
                  onClick={() => history.push(`/awards/${award.id}`)}
                >
                  <Loc>{typeKey}</Loc>
                </p>
                <p className="AwardMatch">{award.text1}</p>
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
