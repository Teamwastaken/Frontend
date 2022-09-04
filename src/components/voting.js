import { Component } from "react";
import config from "../config/config.json";
import axios from "axios";

class VotingFunction extends Component {
  state = {
    participant: [],
  };
  handlePost = async (points, localStorageBool) => {
    const { id } = this.props;
    const obj = { score: points };
    const voted = { person: id, voted: true };
    if (localStorageBool)
      localStorage.setItem("voted" + id, JSON.stringify(voted));
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      await axios.post(config.apiUrl + "/api/votes/" + id, obj, {
        headers: headers,
      });

      this.forceUpdate();
    } catch (error) {
      if (error.response.data.message === "Votes arent allowed.") {
        const participant = { ...this.state.participant };
        participant.allowVotes = false;
        this.setState({ participant });
        localStorage.removeItem("voted" + id);
      }
      if (error.response.status === 401) {
      }
    }
  };
  loadParticipant = async () => {
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      const { data: participant } = await axios.get(
        config.apiUrl + "/api/participants/" + this.props.id,
        {
          headers: headers,
        }
      );
      this.setState({ participant });
    } catch (ex) {
      alert("This person could not be found");
    }
  };

  componentDidMount() {
    this.loadParticipant();
  }
}

export default VotingFunction;
