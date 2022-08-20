import React from "react";
import { useParams } from "react-router-dom";
import VotingFunction from "./utils/voting";

function VoteWrapper() {
  let params = useParams();
  return <Vote id={params.id} />;
}

class Vote extends VotingFunction {
  componentDidMount() {
    this.loadParticipant();
  }

  render() {
    const { id } = this.props;
    if (
      `{"person":"${id}","voted":true}` === localStorage.getItem(`voted${id}`)
    )
      return (
        <div>
          <h1>Already Voted</h1>
          <h2>Score: {this.state.participant.score}</h2>
        </div>
      );
    if (this.state.participant.length === 0)
      return <h1>Person could not be found.</h1>;
    if (this.state.participant.allowVotes === false) {
      console.log("Check votes allowed");
      return (
        <div>
          <h1>Votes aren't allowed at the moment.</h1>
          <button onClick={() => this.loadParticipant()}>Check again</button>
        </div>
      );
    }
    return (
      <div>
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
        <h1 className="score">Score: {this.state.participant.score}</h1>
        <button onClick={() => this.loadParticipant()} className="update_score">
          Update Score
        </button>
      </div>
    );
  }
}

export default VoteWrapper;
