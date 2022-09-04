import React from "react";
import { useParams } from "react-router-dom";
import VotingFunction from "./components/voting";
import "./css/voteLSj.css";

function VoteWrapperLs() {
  let params = useParams();
  return <Vote id={params.id} />;
}

class Vote extends VotingFunction {
  componentDidMount() {
    this.loadParticipant();
  }

  render() {
    if (this.state.participant.length === 0)
      return (
        <div className="body">
          <h1 className="heading">Person could not be found.</h1>
        </div>
      );

    return (
      <div className="body">
        <div className="button-voting-container">
          <button
            onClick={() => this.handlePost(1, false)}
            className="button-voting grey"
          >
            1 Punkt
          </button>
          <button
            onClick={() => this.handlePost(2, false)}
            className="button-voting grey"
          >
            2 Punkte
          </button>
          <button
            onClick={() => this.handlePost(3, false)}
            className="button-voting grey"
          >
            3 Punkte
          </button>
          <button
            onClick={() => this.handlePost(4, false)}
            className="button-voting grey"
          >
            4 Punkte
          </button>
          <button
            onClick={() => this.handlePost(5, false)}
            className="button-voting grey"
          >
            5 Punkte
          </button>
          <button
            onClick={() => this.handlePost(6, false)}
            className="button-voting grey"
          >
            6 Punkte
          </button>
        </div>
      </div>
    );
  }
}

export default VoteWrapperLs;
