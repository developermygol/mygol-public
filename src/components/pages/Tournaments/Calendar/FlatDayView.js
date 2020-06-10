import React, { Component } from "react";
import Loc from "../../../common/Locale/Loc";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import MatchView from "./MatchView";

const isFillerMatch = (match) => {
  return match.idHomeTeam === -1 || match.idVisitorTeam === -1;
};

@inject("store")
@observer
class FlatDayView extends Component {
  render() {
    const normalTeams = this.props.store.teams.normal;
    if (!normalTeams) return null;

    const day = this.props.value;
    if (!day || !day.matches) return null;

    const tId = this.props.idTournament;

    return day.matches.map((match) => {
      if (!match) return null;

      const home = normalTeams[match.idHomeTeam];
      const visitor = normalTeams[match.idVisitorTeam];

      // Filler Match

      if (isFillerMatch(match)) {
        return (
          <tr key={match.id}>
            <td colSpan={7} className="RestMatchContainer">
              {match.idHomeTeam === -1 ? (
                visitor ? (
                  <Link to={"/tournaments/" + tId + "/teams/" + visitor.id}>
                    {" "}
                    {visitor.name}
                  </Link>
                ) : (
                  <span className="MatchTeamDesc">
                    {match.visitorTeamDescription}
                  </span>
                )
              ) : home ? (
                <Link to={"/tournaments/" + tId + "/teams/" + home.id}>
                  {home.name}
                </Link>
              ) : (
                <span className="MatchTeamDesc">
                  {match.homeTeamDescription}
                </span>
              )}
              <Loc>Rests</Loc>
            </td>
          </tr>
        );
      }

      // Regular match

      return (
        <MatchView
          key={match.id}
          tId={tId}
          match={match}
          home={home}
          visitor={visitor}
        />
      );
    });
  }
}

export default FlatDayView;
