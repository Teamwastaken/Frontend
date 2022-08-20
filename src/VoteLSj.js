import axios from "axios";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import config from "./config.json";
import "./voteLSj.css";

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
    } catch (error) {
      if (error.response.data.message === "Votes arent allowed.") {
        const participant = { ...this.state.participant };
        participant.allowVotes = false;
        this.setState({ participant });
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

  render() {
    if (this.state.participant.length === 0)
      return <h1>Person could not be found.</h1>;
    if (this.state.participant.allowVotes === false)
      return (
        <div>
          <h1>Votes aren't allowed at the moment.</h1>
          <button onClick={() => this.loadParticipant()}>Check again</button>
        </div>
      );
    return (
      <div>
        <div className="buttondiv">
          <button onClick={() => this.handlePost(1)} className="b1">
            1
          </button>
          <button onClick={() => this.handlePost(2)} className="b1">
            2
          </button>
          <button onClick={() => this.handlePost(3)} className="b1">
            3
          </button>
          <button onClick={() => this.handlePost(4)} className="b1">
            4
          </button>
          <button onClick={() => this.handlePost(5)} className="b1">
            5
          </button>
          <button onClick={() => this.handlePost(6)} className="b1">
            6
          </button>
        </div>
        <h1 className="score">Score: {this.state.participant.score}</h1>
        <button onClick={() => this.loadParticipant()} className="update_score">
          Update Score
        </button>
      </div>
    );
  }
}

export default VoteWrapperLs;
