import React, { Component } from 'react';
import Loc from '../../../common/Locale/Loc';

class PointsSummary extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="PointsSummary">
        <p className="">
          <span className="Points Color1">{data && data.points}</span>{' '}
          <span className="Units Color1">
            <Loc>Points</Loc>
          </span>{' '}
          <span className="Caption">
            <Loc>Points.ThisSeason</Loc>
          </span>
        </p>
      </div>
    );
  }
}

export default PointsSummary;
