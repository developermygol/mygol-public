import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Loc from '../../../common/Locale/Loc';
import { getSettings } from '../../../common/Chart';

const defaultProps = {
  data: [],
  numDays: 10,
  numTeams: 7,
};

class TeamRankingChart extends Component {
  constructor(props) {
    super(props);

    // const s = getSettings('Ranking', props.data, props.numDays, props.numTeams); // 💥 numTeams?
    const s = this.props.theme
      ? getSettings('Ranking', props.data, props.numDays, this.props.theme.color1, this.props.theme.color2)
      : getSettings('Ranking', props.data, props.numDays);

    s.data.datasets[0].fill = false;
    const axis = s.options.scales.yAxes[0];
    axis.ticks.reverse = true;
    axis.ticks.max = props.numTeams;

    this.settings = s;
  }

  render() {
    if (!this.settings) return null;

    return (
      <div className="Chart">
        <h4 className="Color1">
          <Loc>Ranking</Loc>
        </h4>
        <Line width={4} height={1} data={this.settings.data} options={this.settings.options} />
      </div>
    );
  }
}

TeamRankingChart.defaultProps = defaultProps;

export default TeamRankingChart;
