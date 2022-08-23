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
      return <h1>Person could not be found.</h1>;

    return (
      <div className="body">
        <div className="buttondiv">
          <button onClick={() => this.handlePost(1, false)} className="b1">
            1
          </button>
          <button onClick={() => this.handlePost(2, false)} className="b1">
            2
          </button>
          <button onClick={() => this.handlePost(3, false)} className="b1">
            3
          </button>
          <button onClick={() => this.handlePost(4, false)} className="b1">
            4
          </button>
          <button onClick={() => this.handlePost(5, false)} className="b1">
            5
          </button>
          <button onClick={() => this.handlePost(6, false)} className="b1">
            6
          </button>
        </div>
      </div>
    );
  }
}

export default VoteWrapperLs;
