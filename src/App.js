import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import * as d3 from "d3";
import BarChart from "./BarChart";
import BarChartStore from "./BarChartStore";

const NBASTATS = ["orebRank", "ftaRank", "fg3PctRank", "plusMinusRank"];

class App extends Component {
  state = {
    data: [],
    teamName: "",
    selectedTeamData: [],
    teamStats: []
  };
  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3000/");
    this.setState(data);

    // const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    // const graphWidth = 600 - margin.left - margin.right;
    // const graphHeight = 600 - margin.top - margin.bottom;
    // const svg = d3
    //   .select(".canvas")
    //   .append("svg")
    //   .attr("width", 600)
    //   .attr("height", 600);

    // const graph = svg
    //   .append("g")
    //   .attr("width", graphWidth)
    //   .attr("height", graphHeight)
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }

  setTeam(team = {}) {
    const teamName =
      team.teamName || document.querySelector("#team_name").value;
    // console.log("teamName", teamName.value);

    const selectedTeamData = this.state.data.filter(
      d => d.teamName.toLowerCase() === teamName.toLowerCase()
    );

    const teamStats = NBASTATS.reduce((acc, line) => {
      let object = {};

      object["name"] = line;
      object["value"] = selectedTeamData[0][line];
      acc.push(object);

      return acc;
    }, []);

    this.setState({
      selectedTeamData,
      teamStats,
      teamName: selectedTeamData[0].teamName
    });
    document.querySelector(".form_input").reset();
  }

  createList() {
    const { data } = this.state;
    return data
      .sort((a, b) => {
        return b.plusMinus - a.plusMinus;
      })
      .map(item => {
        return (
          <li
            className={`plus_minus_rank ${
              item.teamName === this.state.teamName ? "active" : ""
            }`}
            onClick={() => this.setTeam(item)}
          >
            {item.teamName} - {item.plusMinusRank}
          </li>
        );
      });
  }

  handeClick = e => {
    e.preventDefault();
    this.setTeam();
  };
  render() {
    const { teamName, selectedTeamData, teamStats } = this.state;
    console.log("state: ", this.state);

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
              <form className="card z-depth-0 form_input">
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
              {teamName && (
                <React.Fragment>
                  <h3>{teamName}</h3>
                  <h5>Team Plus Minus (in order)</h5>
                  <ul className="plus_minus_wrapper">{this.createList()}</ul>
                </React.Fragment>
              )}
            </div>
            <div className="col s12 m5 push-m1">
              {selectedTeamData.length > 0 && (
                <svg width="600" height="700" className="svg">
                  <BarChart
                    width={600}
                    height={600}
                    teamName={teamName}
                    selectedTeamData={selectedTeamData}
                    teamStats={teamStats}
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
