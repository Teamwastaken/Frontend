import axios from "axios";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import config from "./config.json";

function VoteWrapperLs() {
  let params = useParams();
  return <Vote id={params.id} />;
}

class Vote extends Component {
  state = {
    participant: [],
  };
  handlePost = async (points) => {
    const { id } = this.props;

    const obj = { person: id, score: points };
    try {
      await axios.post(config.apiUrl + "/api/persons/", obj);
    } catch (ex) {
      alert("Something failed with your voting request.");
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

    //console.log(participant);
    //console.log(this.state.participant);
  };

  render() {
    const { id } = this.props;
    this.loadParticipant();

    if (this.state.participant.length === 0)
      return <h1>Person could not be found.</h1>;
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

export default VoteWrapperLs;
