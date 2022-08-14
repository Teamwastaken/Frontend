import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import config from "./config.json";
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
    const ordered = _.orderBy(this.state.participants, "rank", "asc");
    return (
      <div>
        {ordered.map((participant) => (
          <div key={participant._id}>
            {" "}
            {participant.rank + ". " + participant.name}
          </div>
        ))}
      </div>
    );
  }
}
export default Ranking;
