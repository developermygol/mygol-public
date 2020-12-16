import React, { Component } from 'react';
import InfoBox from '../../common/InfoBox';
import Loc from '../../common/Locale/Loc';
import { normalize, groupBy } from '../../helpers/Data';
import { inject, observer } from 'mobx-react';
import LeagueGroupClassification from './LeagueGroupClassification';

@inject('store')
@observer
class LeagueClassification extends Component {
  adaptTeamListToClassification = stage => {
    // Just add an idTeam to each field
    //return teams.map(t => ({ ...t, idTeam: t.id, idGroup:  }));
    return this.props.store.teamGroups.all.filter(tg => tg.idStage === stage.id);
  };

  render() {
    const p = this.props;
    let { classification, teams, stage } = p;
    const tnmt = p.tournament;

    if (!classification || classification.length === 0) {
      classification = this.adaptTeamListToClassification(stage);
    }

    const stageGroups = p.store.groups.forStage(stage.id);
    const data = groupBy(classification, stageGroups, 'id', 'idGroup');
    if (!data)
      return (
        <InfoBox>
          <Loc>Classification.NoGroups</Loc>
        </InfoBox>
      );

    const normalTeams = normalize(teams);

    if (data.length === 1) {
      return (
        <LeagueGroupClassification
          classification={data[0].grouped}
          normalTeams={normalTeams}
          tournament={tnmt}
          stage={stage}
        />
      );
    }

    return data.map(group => {
      return (
        <div key={group.id} className="">
          <h4>{group.name}</h4>
          <LeagueGroupClassification
            classification={group.grouped}
            normalTeams={normalTeams}
            tournament={tnmt}
          />
        </div>
      );
    });
  }
}

export default LeagueClassification;
