import React from "react";
import VotingFunction from "./components/voting";
import "./css/voteLSj.css";
import axios from "axios";
import config from "./config/config.json";

class CurrentVoting extends VotingFunction {
  state = {
    participant: [],
  };
  componentDidMount() {
    this.loadParticipant();
  }
  loadParticipant = async () => {
    try {
      const { data: participant } = await axios.get(
        config.apiUrl + "/api/persons/currentVoting"
      );
      this.setState({ participant });
    } catch (ex) {
      alert("This person could not be found");
    }
  };
  handlePost = async (points, localStorageBool) => {
    const obj = { score: points };
    const voted = { person: this.state.participant._id, voted: true };
    if (localStorageBool)
      localStorage.setItem(
        "voted" + this.state.participant._id,
        JSON.stringify(voted)
      );
    try {
      await axios.post(config.apiUrl + "/api/persons/currentVoting", obj);
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
      localStorage.getItem(`voted${this.state.participant._id}`)
    )
      return (
        <div className="body">
          <h1 className="buttondiv">Already Voted</h1>
        </div>
      );
    if (this.state.participant.length === 0)
      return <h1 className="body">Person could not be found.</h1>;
    if (this.state.participant.allowVotes === false) {
      console.log("Check votes allowed");
      return (
        <div className="body">
          <h1 className="buttondiv">Votes aren't allowed at the moment.</h1>
          <button onClick={() => this.loadParticipant()} className="buttondiv">
            Check again
          </button>
        </div>
      );
    }
    return (
      <div className="body">
        <div className="buttondiv">
          <button onClick={() => this.handlePost(1, true)} className="b1">
            1
          </button>
          <button onClick={() => this.handlePost(2, true)} className="b1">
            2
          </button>
          <button onClick={() => this.handlePost(3, true)} className="b1">
            3
          </button>
          <button onClick={() => this.handlePost(4, true)} className="b1">
            4
          </button>
          <button onClick={() => this.handlePost(5, true)} className="b1">
            5
          </button>
          <button onClick={() => this.handlePost(6, true)} className="b1">
            6
          </button>
        </div>
      </div>
    );
  }
}

export default CurrentVoting;
