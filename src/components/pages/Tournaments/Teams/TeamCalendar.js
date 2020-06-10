import React, { Component } from "react";
import FlatDayView from "../Calendar/FlatDayView";

export default class TeamCalendar extends Component {
  render() {
    const calendarDaysOrderedByDate = this.props.data.sort((a, b) => {
      const aDate = new Date(a.matches[0].startTime);
      const bDate = new Date(b.matches[0].startTime);
      return aDate - bDate;
    });

    return (
      <div className="MatchesTable">
        <table>
          <tbody>
            {calendarDaysOrderedByDate.map((day, i) => {
              return (
                <FlatDayView
                  key={i}
                  value={day}
                  idTournament={this.props.idTournament}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
