import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import BarChart from "./BarChart";
//use some kind of css styling
//get data
//make axis component
//make bar chart component

//have some kind of input field so user can search team

class App extends Component {
  state = {
    data: [],
    selectedTeam: "",
    selectedTeamData: []
  };
  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3000/");
    this.setState(data, () => {
      this.setTeam();
    });
  }

  setTeam() {
    const teamName = document.querySelector("#team_name").value;
    // console.log("teamName", teamName.value);

    const selectedTeamData = this.state.data.filter(
      d => d.teamName.toLowerCase() === teamName.toLowerCase()
    );
    // console.log("selectedTeamData in set team: ", selectedTeamData);

    this.setState({ selectedTeamData });
  }

  handeClick = e => {
    e.preventDefault();
    this.setTeam();
  };
  render() {
    const { data, selectedTeam, selectedTeamData } = this.state;
    // console.log("state in set team: ", this.state);

    return (
      <div className="App">
        <header className="indigo darken-1 section">
          <h2 className="center white-text">NBA Stats</h2>
          <p className="flow-text grey-text center text-lighten-2">
            Search any NBA team to see how theyre faring against other teams
          </p>
        </header>
        <div className="container section">
          <div className="row">
            <div className="col s12 m6">
              <form className="card z-depth-0">
                <div className="card-content">
                  <span className="card-title indigo-text">Search Team:</span>
                  <div className="input-field">
                    <input type="text" id="team_name" />
                    <label htmlFor="name">Team Name</label>
                  </div>
                  <div className="input-field center">
                    <button
                      className="btn-large pink white-text"
                      onClick={this.handeClick}
                    >
                      Search Team
                    </button>
                  </div>
                  <div className="input-field center">
                    <p id="error" className="red-text" />
                  </div>
                </div>
              </form>
            </div>
            <div className="col s12 m5 push-m1">
              {selectedTeamData.length > 0 && (
                <BarChart
                  data={data}
                  width={600}
                  height={600}
                  selectedTeam={selectedTeam}
                  selectedTeamData={selectedTeamData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
