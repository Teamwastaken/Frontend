import axios from "axios";
import React, { Component } from "react";

import config from "./config.json";
class Vote extends Component {
  state = {
    participant: [],
  };
  handlePost = async (points) => {
    const { id } = this.props.match.params;
    //console.log(this.state.participant);
    const originalParticipant = this.state.participant;
    const participant = { ...this.state.participant };
    participant.score += points;
    this.setState({ participant });
    const obj = { person: id, score: points };
    try {
      await axios.post(config.apiUrl + "/api/persons/", obj);
    } catch (ex) {
      alert("Something failed with your voting request.");
      this.setState({ participant: originalParticipant });
    }
  };
  loadParticipant = async () => {
    const { id } = this.props.match.params;
    const { data: participant } = await axios.get(
      config.apiUrl + "/api/persons/" + id
    );
    this.setState({ participant });
    //console.log(participant);
    //console.log(this.state.participant);
  };
  componentDidMount() {
    this.loadParticipant();
  }
  render() {
    return (
      <div>
        <button onClick={() => this.handlePost(1)}>1</button>
        <button onClick={() => this.handlePost(2)}>2</button>
        <button onClick={() => this.handlePost(3)}>3</button>
        <button onClick={() => this.handlePost(4)}>4</button>
        <button onClick={() => this.handlePost(5)}>5</button>
        <button onClick={() => this.handlePost(6)}>6</button>
        <h1>Score: {this.state.participant.score}</h1>
        <button onClick={() => this.loadParticipant()}>Update Score</button>
      </div>
    );
  }
}

export default Vote;
