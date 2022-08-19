import React, { Component } from "react";
import "./admin.css";
import axios from "axios";
import config from "./config.json";
import { reject } from "lodash";

class Admin extends Component {
  state = { popup: false, participants: [], value: "" };
  async componentDidMount() {
    //get data for participants
    this.getParticipants();
  }
  getParticipants = async () => {
    try {
      const { data: participants } = await axios.get(
        config.apiUrl + "/api/persons"
      );
      this.setState({ participants });
      this.forceUpdate();
    } catch (error) {
      alert(error);
    }
  };
  handlePost = async () => {
    const obj = { name: this.state.value };
    console.log(obj, "post");
    this.setState({ popup: false });
    try {
      await axios.post(config.apiUrl + "/api/persons/newUser", obj);
    } catch (ex) {
      alert(ex);
    }
  };
  handleUpdate = async (participant) => {
    const p = new Promise((resolve, reject) => {
      axios.patch(config.apiUrl + "/api/persons/" + participant.id, {
        allowVotes: !participant.allowVotes,
      });
    });
    p.then(() => {
      setTimeout(() => {
        this.getParticipants();
      }, 1000);
    });
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    let classes = this.getBadgeClasses();
    return (
      <div>
        <header>
          <h1>Dashboard</h1>
          <button
            className="element"
            onClick={() => this.setState({ popup: true })}
          >
            New User
          </button>
        </header>
        <div className="boxes">
          {this.state.participants.map((participant) => (
            <div key={participant._id}>
              <div className="box">
                <h1 className="id">#Id {participant.id}</h1>
                <div className="elementWrapper">
                  {" "}
                  <div className="box-seperate">
                    {" "}
                    <div className="element">{participant.rank}</div>
                    <div className="element">{participant.score}</div>
                  </div>
                  <div className="box-seperate">
                    <div className="element"> {participant.name}</div>
                    <button
                      className={
                        participant.allowVotes ? "element" : "element red"
                      }
                      onClick={() => this.handleUpdate(participant)}
                    >
                      {participant.allowVotes ? "enabled" : "disabled"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={classes}>
            <input
              placeholder="Name"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button className="submit" onClick={this.handlePost}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
  getBadgeClasses() {
    console.log(this.state.popup);
    let classes = this.state.popup === true ? "popup active" : "popup";
    return classes;
  }
}
export default Admin;
