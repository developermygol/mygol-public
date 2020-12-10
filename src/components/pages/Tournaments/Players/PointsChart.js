import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getSettings } from '../../../common/Chart';

class PointsChart extends Component {
  constructor(props) {
    super(props);

    const data = this.extractData(props.data);
    // const s = getSettings('Points', data);
    const s = props.theme
      ? getSettings('Points', data, this.props.numDays, this.props.theme.color1, this.props.theme.color2)
      : getSettings('Points', data, this.props.numDays);

    // Adapt settings to this chart
    s.data.labels = this.extractLabels(props.data);
    const yAxis = s.options.scales.yAxes[0];
    yAxis.ticks.stepSize = 1;
    yAxis.gridLines.display = false;
    s.options.scales.xAxes[0].ticks.display = false;

    this.settings = s;
  }

  extractData(data) {
    return data.map(dayResult => {
      if (!dayResult || !dayResult.playerDayResults) return null;
      return dayResult.playerDayResults[0].points;
    });
  }

  extractLabels(data, numItems = 40) {
    const num = data.length > numItems ? data.length : numItems;
    const result = new Array(num);

    for (let i = 0; i < data.length; ++i) result[i] = data[i].name;
    return result;
  }

  render() {
    return (
      <div className="PointsChart">
        <div className="Chart">
          <Bar width={5} height={1} data={this.settings.data} options={this.settings.options} />
        </div>
      </div>
    );
  }
}

export default PointsChart;
