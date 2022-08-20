import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import config from "./config/config.json";
import "./css/ranking.css";

class Ranking extends Component {
  state = { participants: [] };

  async componentDidMount() {
    //get data for participants
    const { data: participants } = await axios.get(
      config.apiUrl + "/api/persons"
    );
    this.setState({ participants });
  }

  render() {
    //sort it
    const ordered = _.orderBy(this.state.participants, "score", "desc");
    return (
      <header className="ranking_box">
        <div className="ranking">
          {ordered.map((participant) => (
            <div key={participant._id} className="participant">
              {" "}
              {participant.rank +
                ". " +
                participant.name +
                "   " +
                participant.score}
            </div>
          ))}
        </div>
      </header>
    );
  }
}
export default Ranking;
