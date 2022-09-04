import React from "react";
import VotingFunction from "./components/voting";
import axios from "axios";
import config from "./config/config.json";
import "./css/voteLSj.css";

class CurrentVoting extends VotingFunction {
  state = {
    participant: [],
  };
  alreadyVoted = false;
  componentDidMount() {
    this.loadParticipant();
  }
  loadParticipant = async () => {
    try {
      const { data: participant } = await axios.get(
        config.apiUrl + "/api/participants/currentVoting"
      );
      this.setState({ participant });
    } catch (ex) {
      alert("This person could not be found");
    }
  };
  handlePost = async (points, localStorageBool) => {
    const obj = { score: points };
    const voted = { person: this.state.participant._id, voted: true };
    if (this.alreadyVoted === true) return alert("Already voted");
    this.alreadyVoted = true;
    if (localStorageBool)
      localStorage.setItem(
        "voted" + this.state.participant._id,
        JSON.stringify(voted)
      );
    try {
      await axios.post(config.apiUrl + "/api/votes/currentVoting", obj);
      this.forceUpdate();
    } catch (error) {
      if (error.response.data.message === "Votes arent allowed.") {
        const participant = { ...this.state.participant };
        participant.allowVotes = false;
        this.setState({ participant });
        localStorage.removeItem("voted" + this.state.participant._id);
      }
      console.log(error.response.data.message);
    }
  };
  render() {
    if (
      `{"person":"${this.state.participant._id}","voted":true}` ===
        localStorage.getItem(`voted${this.state.participant._id}`) ||
      this.alreadyVoted === true
    )
      return (
        <div className="body">
          <h1 className="heading">Already Voted</h1>
        </div>
      );
    if (this.state.participant.length === 0)
      return <h1 className="body">Person could not be found.</h1>;
    if (this.state.participant.allowVotes === false) {
      return (
        <div className="body">
          <h1 className="heading">Votes aren't allowed at the moment.</h1>
          <div className="button-container">
            <button
              className="button blue"
              onClick={() => this.loadParticipant()}
            >
              Check again
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="body">
        <div className="button-voting-container">
          <button
            onClick={() => this.handlePost(1, true)}
            className="button-voting grey"
          >
            1 Punkt
          </button>
          <button
            onClick={() => this.handlePost(2, true)}
            className="button-voting grey"
          >
            2 Punkte
          </button>
          <button
            onClick={() => this.handlePost(3, true)}
            className="button-voting grey"
          >
            3 Punkte
          </button>
          <button
            onClick={() => this.handlePost(4, true)}
            className="button-voting grey"
          >
            4 Punkte
          </button>
          <button
            onClick={() => this.handlePost(5, true)}
            className="button-voting grey"
          >
            5 Punkte
          </button>
          <button
            onClick={() => this.handlePost(6, true)}
            className="button-voting grey"
          >
            6 Punkte
          </button>
        </div>
      </div>
    );
  }
}

export default CurrentVoting;
