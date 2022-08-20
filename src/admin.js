import React, { Component } from "react";
import "./css/admin.css";
import axios from "axios";
import config from "./config/config.json";
import _ from "lodash";

class Admin extends Component {
  state = {
    popup1: false,
    popup2: false,
    deleteId: 0,
    participants: [],
    value: "",
  };
  async componentDidMount() {
    this.getParticipants();
    document.addEventListener("keydown", this.escFunction, false);
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
  handleDelete = async () => {
    try {
      await axios.delete(config.apiUrl + "/api/persons/" + this.state.deleteId);
      console.log(this.state.deleteId);
    } catch (error) {}
  };
  handlePost = async () => {
    const obj = { name: this.state.value };
    console.log(obj, "post");
    this.setState({ popup: false });
    try {
      await axios.post(config.apiUrl + "/api/persons/newUser", obj);
      this.setState({ value: "" });
    } catch (ex) {
      alert(ex);
    }
  };
  handleUpdate = async (participant) => {
    const p = new Promise((resolve, reject) => {
      resolve(
        axios.patch(config.apiUrl + "/api/persons/" + participant.id, {
          allowVotes: !participant.allowVotes,
        })
      );
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
  handleSubmit1 = (event) => {
    event.preventDefault();
    this.setState({ popup1: false });
    console.log("form submitted ✅");
  };
  handleSubmit2 = (event) => {
    event.preventDefault();
    this.setState({ popup2: false });
    console.log("form submitted ✅");
  };
  escFunction = (event) => {
    if (event.key === "Escape") {
      this.setState({ popup1: false });
      this.setState({ popup2: false });
    }
  };
  render() {
    const ordered = _.orderBy(this.state.participants, "id", "asc");
    return (
      <div>
        <header>
          <h1>Dashboard</h1>
          <button
            className="element"
            onClick={() => this.setState({ popup1: true })}
          >
            New User
          </button>
        </header>
        <div className="boxes">
          {ordered.map((participant) => (
            <div key={participant._id}>
              <div className="box">
                <a
                  href={"voting/" + participant.id + "/noLocalstorage"}
                  target="_blanc"
                >
                  {" "}
                  <h1 className="id">#Id {participant.id}</h1>
                </a>
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
                <div className="button-container">
                  <button
                    className="deleteButton"
                    onClick={() =>
                      this.setState({ popup2: true, deleteId: participant.id })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <form
            onSubmit={this.handleSubmit1}
            className={this.getBadgeClasses()}
          >
            <input
              placeholder="Name"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button
              className="submit"
              type="submit"
              onClick={() => this.handlePost()}
            >
              Submit
            </button>
          </form>
          <form
            onSubmit={this.handleSubmit2}
            className={this.getDeleteClasses()}
          >
            <p>Sure you want to delete this user?</p>
            <div className="button-container">
              <button
                className="deleteButton"
                type="submit"
                onClick={() => this.handleDelete()}
              >
                Yeah delete!
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = this.state.popup1 === true ? "popup active" : "popup";
    return classes;
  }
  getDeleteClasses() {
    let classes = this.state.popup2 === true ? "popup active " : "popup";
    return classes;
  }
}
export default Admin;
