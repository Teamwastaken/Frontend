import { Component } from "react";
import config from "../config/config.json";
import axios from "axios";

class VotingFunction extends Component {
  state = {
    participant: [],
  };
  handlePost = async (points, localStorageBool) => {
    const { id } = this.props;
    const obj = { person: id, score: points };
    const voted = { person: id, voted: true };
    if (localStorageBool)
      localStorage.setItem("voted" + id, JSON.stringify(voted));
    try {
      await axios.post(config.apiUrl + "/api/persons/", obj);
      this.forceUpdate();
    } catch (error) {
      if (error.response.data.message === "Votes arent allowed.") {
        const participant = { ...this.state.participant };
        participant.allowVotes = false;
        this.setState({ participant });
        localStorage.removeItem("voted" + id);
      }
      console.log(error.response.data.message);
    }
  };
  loadParticipant = async () => {
    try {
      const { data: participant } = await axios.get(
        config.apiUrl + "/api/persons/" + this.props.id
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
