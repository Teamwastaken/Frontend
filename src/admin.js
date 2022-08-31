import React from "react";
import "./css/admin.css";
import axios from "axios";
import config from "./config/config.json";
import _ from "lodash";
import Form from "./components/common/form";

class Admin extends Form {
  state = {
    popup1: false,
    popup2: false,
    deleteId: "",
    participants: [],
    value: "",
    errors: { access: "Acces denied", responseCode: null },
    currentVoting: [],
  };
  componentDidMount() {
    this.getParticipants();
    document.addEventListener("keydown", this.escFunction, false);
    this.getCurrenVoting();
  }
  doSubmit = () => {};
  getParticipants = async () => {
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      const { data: participants } = await axios.get(
        config.apiUrl + "/api/persons",
        {
          headers: headers,
        }
      );
      this.setState({ participants });
      this.forceUpdate();
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.access = ex.response.data;
        errors.responseCode = ex.response.status;
        this.setState({ errors });
      }
    }
  };
  handleDelete = async () => {
    const headers = {
      "x-auth-token": await localStorage.getItem("token"),
    };
    console.log(this.state.deleteId);
    try {
      await axios.delete(
        config.apiUrl + "/api/persons/" + this.state.deleteId,
        {
          headers: headers,
        }
      );
    } catch (error) {}
  };
  handlePost = async () => {
    console.log("handle Post", this.state.value);
    const obj = { name: this.state.value };
    this.setState({ popup: false });
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      await axios.post(config.apiUrl + "/api/persons/newUser", obj, {
        headers: headers,
      });

      this.setState({ value: "" });
    } catch (ex) {
      console.log(ex.response.data);
      alert(ex.response.data);
    }
  };
  setCurrentVote = async (participant) => {
    const obj = { currentVoting: participant._id };
    this.setState({ currentVoting: participant });
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      await axios.put(config.apiUrl + "/api/persons/currentVoting", obj, {
        headers: headers,
      });
      this.forceUpdate();
    } catch (ex) {
      alert(ex);
    }
  };
  getCurrenVoting = async () => {
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      const { data: participant } = await axios.get(
        config.apiUrl + "/api/persons/currentVoting/admin",
        {
          headers: headers,
        }
      );
      this.setState({ currentVoting: participant });
    } catch (ex) {
      alert(ex);
    }
  };

  handleUpdate = async (participant) => {
    const headers = {
      "x-auth-token": await localStorage.getItem("token"),
    };
    const p = new Promise((resolve, reject) => {
      resolve(
        axios.patch(
          config.apiUrl + "/api/persons/" + participant._id,
          {
            allowVotes: !participant.allowVotes,
          },
          {
            headers: headers,
          }
        )
      );
    });
    p.then(() => this.updateAllowVotes(participant));
  };
  updateAllowVotes = (participant) => {
    const participants = [...this.state.participants];
    const index = participants.findIndex(
      (item) => item._id === participant._id
    );
    participants[index].allowVotes = !participant.allowVotes;
    this.setState({ participants });
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  escFunction = (event) => {
    if (event.key === "Escape") {
      this.setState({ popup1: false, popup2: false });
    }
  };
  render() {
    if (this.state.errors.responseCode === 401)
      return (
        <div className="body">
          <header>
            {" "}
            <h1>Acces denied.</h1>
          </header>
        </div>
      );
    const ordered = _.orderBy(this.state.participants, "_id", "asc");
    return (
      <div className="body">
        <header className="navbar">
          <h1 className="nav-element">Dashboard</h1>
          <h2 className="nav-element">
            <a href={"#" + this.state.currentVoting._id}>
              {" "}
              CurrentVoting: {this.state.currentVoting.name}
            </a>
          </h2>
          <button
            className="nav-element green button-newUser"
            onClick={() => this.setState({ popup1: true })}
          >
            New User
          </button>
        </header>
        <div className="boxes-container">
          {ordered.map((participant) => (
            <div className="box" key={participant._id} id={participant._id}>
              {this.state.currentVoting._id === participant._id ? (
                <div className="badge1"> Current </div>
              ) : null}

              <a
                href={"voting/" + participant._id + "/noLocalstorage"}
                target="_blanc"
              >
                {" "}
                <h3 className="center">{participant._id}</h3>
              </a>
              <div className="elementWrapper">
                {" "}
                <div className="">
                  {" "}
                  <div className="box-element">{participant.rank}.</div>
                  <div className="box-element">{participant.score}</div>
                </div>
                <div className="">
                  <div className="name box-element"> {participant.name}</div>
                  <button
                    className={
                      participant.allowVotes
                        ? "reset-margin button green box-element"
                        : "reset-margin button orange box-element"
                    }
                    onClick={() => this.handleUpdate(participant)}
                  >
                    {participant.allowVotes ? "enabled" : "disabled"}
                  </button>
                </div>
              </div>
              <div className="button-container">
                <button
                  className={
                    this.state.currentVoting._id === participant._id
                      ? "button green"
                      : "button orange"
                  }
                  onClick={() => this.setCurrentVote(participant)}
                >
                  Set
                </button>
                <button
                  className="button red deleteButton"
                  onClick={() =>
                    this.setState({ popup2: true, deleteId: participant._id })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <form onSubmit={this.handleSubmit} className={this.getBadgeClasses()}>
            <input
              className="input-popup m-auto m-10"
              placeholder="Name"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button
              className="green button m-auto m-10"
              type="submit"
              onClick={() => this.handlePost()}
            >
              Submit
            </button>
          </form>
          <form
            onSubmit={this.handleSubmit}
            className={this.getDeleteClasses()}
          >
            <p className="center">Sure you want to delete this user?</p>
            <div className="button-container">
              <button
                className="red button reset-margin"
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
