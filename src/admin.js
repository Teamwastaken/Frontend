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
  };
  async componentDidMount() {
    this.getParticipants();
    document.addEventListener("keydown", this.escFunction, false);
  }
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
  doSubmit = () => {};

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
        <header>
          <h1>Dashboard</h1>
          <button
            className="button button-hover element"
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
                  href={"voting/" + participant._id + "/noLocalstorage"}
                  target="_blanc"
                >
                  {" "}
                  <h3 className="id">{participant._id}</h3>
                </a>
                <div className="elementWrapper">
                  {" "}
                  <div className="box-seperate">
                    {" "}
                    <div className="element">{participant.rank}.</div>
                    <div className="element">{participant.score}</div>
                  </div>
                  <div className="box-seperate">
                    <div className="element"> {participant.name}</div>
                    <button
                      className={
                        participant.allowVotes
                          ? "button button-hover element allow"
                          : "button element allow orange"
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
                      this.setState({ popup2: true, deleteId: participant._id })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <form onSubmit={this.handleSubmit} className={this.getBadgeClasses()}>
            <input
              className="inputPopup"
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
            onSubmit={this.handleSubmit}
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
