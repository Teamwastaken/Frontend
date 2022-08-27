import "./css/diagram.css";
import axios from "axios";
import config from "./config/config.json";
import Form from "./components/common/form";

class CurrentVotingDiagram extends Form {
  state = {
    errors: { access: "Acces denied", responseCode: null },
    currentVotingName: "",
    currentVotingScore: 0,
    barWidth: null,
    qualificationScore: 1200,
  };
  componentDidMount() {
    this.interval = setInterval(() => this.getCurrenVoting(), 1000);
    this.getCurrenVoting();
  }
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
      this.setState(
        {
          currentVotingScore: participant.score,
        },
        () => {
          this.calcBarWidth();
        }
      );
    } catch (ex) {
      alert(ex);
    }
  };
  calcBarWidth = () => {
    this.setState({ barWidth: this.state.currentVotingScore / 12 });
  };

  render() {
    return (
      <div className="body ">
        <div className="bar-container">
          {" "}
          <div className="border">
            {" "}
            <div
              className="bar "
              style={{ width: `${this.state.barWidth}%`, maxWidth: "100%" }}
            >
              <div className="percentage">
                Punkte: {this.state.currentVotingScore}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentVotingDiagram;
