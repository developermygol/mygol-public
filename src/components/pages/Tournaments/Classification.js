import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import StageClassification from './StageClassification';
import InfoBox from '../../common/InfoBox';
import Loc from '../../common/Locale/Loc';
import TabControl from '../../common/TabControl';

@inject('store')
@observer
class Classification extends Component {
  render() {
    const p = this.props;
    const tournament = p.data;
    if (!tournament) return null;

    const store = p.store.stages;
    const stages = store.all;
    if (!stages || stages.length === 0)
      return (
        <InfoBox>
          <Loc>Classification.NoStages</Loc>
        </InfoBox>
      );

    const defaultTabIndex = store.getActiveStageIndex();

    return (
      <TabControl
        defaultTab={defaultTabIndex}
        items={stages}
        contentCallback={stage => <StageClassification stage={stage} tournament={tournament} />}
      />
    );
  }
}

Classification.defaultProps = {
  data: null,
  idDay: 0,
};

export default withRouter(Classification);
