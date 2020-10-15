import React, { Component } from 'react';
import TabControl from '../../../common/TabControl';
import FlatDayView from './FlatDayView';
import { getCurrentDaysInObjectArray, isDefaultDate } from '../../../helpers/Utils';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class CalendarView extends Component {
  getDayContent = day => {
    return (
      <div className="MatchesTable">
        <table>
          <tbody>
            <FlatDayView value={day} idTournament={this.props.idTournament} />
          </tbody>
        </table>
      </div>
    );
  };

  getStageContent = stage => {
    const allDays = this.props.value;
    if (!allDays) return null;

    const stageDays = allDays.filter(day => day.idStage === stage.id);

    const targetDay = getCurrentDaysInObjectArray(stageDays, this.getDateFromDay);
    const tabIndex = targetDay.nextIdx;

    return (
      <TabControl
        key={stage.id}
        defaultTab={tabIndex}
        items={stageDays}
        contentCallback={this.getDayContent}
      />
    );
  };

  getDateFromDay = day => {
    if (day.matches) {
      for (let i = 0; i < day.matches.length; ++i) {
        const dateString = day.matches[i].startTime;
        const date = new Date(dateString);
        if (date && !isDefaultDate(date)) return date;
      }
    }

    return null;
  };

  render() {
    const p = this.props;
    const days = p.value;
    if (!days) return null;

    const store = p.store.stages;
    const stages = store.all;
    if (stages && stages.length > 1) {
      // Render another tab control with the stages. Inside it will have the days tab control.
      const defaultTabIndex = store.getActiveStageIndex();

      return (
        <TabControl defaultTab={defaultTabIndex} items={stages} contentCallback={this.getStageContent} />
      );
    }

    const targetDay = getCurrentDaysInObjectArray(days, this.getDateFromDay);
    const tabIndex = targetDay.nextIdx;

    return <TabControl defaultTab={tabIndex} items={days} contentCallback={this.getDayContent} />;
  }
}

export default CalendarView;
