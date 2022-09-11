import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import config from "./config/config.json";
import "./css/ranking.css";

class Ranking extends Component {
  state = { participants: [] };

  async componentDidMount() {
    //get data for participants
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      const { data: participants } = await axios.get(
        config.apiUrl + "/api/participants",
        { headers: headers }
      );

      this.setState({ participants });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  }

  render() {
    //sort it
    // if (this.state.participants.length === 0) return "No access";
    const ordered = _.orderBy(this.state.participants, "score", "desc");
    const filtered = ordered.filter((x) => x.score >= 1200);
    return (
      <section className="body">
        <header>
          <h1 className="font-grey">Ranking</h1>
        </header>
        <body className="items">
          {filtered.map((participant) => (
            <div key={participant._id} className="item center">
              {" "}
              {participant.rank + ". " + participant.name}
            </div>
          ))}
        </body>
      </section>
    );
  }
}
export default Ranking;
