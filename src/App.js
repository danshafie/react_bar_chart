import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import * as d3 from "d3";
import BarChart from "./BarChart";
import BarChartStore from "./BarChartStore";
import LineGraph from "./LineGraph";

const NBASTATS = [
  "orebRank",
  "ftaRank",
  "fg3PctRank",
  "tovRank",
  "plusMinusRank"
];

class App extends Component {
  state = {
    data: [],
    teamName: "",
    selectedTeamData: [],
    teamStats: [],
    error: false,
    daysRestedStats: {},
    teamId: "",
    fetching: false,
    playerName: "",
    playerStats: []
  };
  async componentDidMount() {
    const { data } = await axios.get("/allTeams");

    this.setState(data);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   this.compareTeam(prevState);
  // }

  setTeam(team = {}) {
    const teamName =
      team.teamName || document.querySelector("#team_name").value;
    // console.log("teamName", teamName.value);

    const selectedTeamData = this.state.data.filter(
      d => d.teamName.toLowerCase() === teamName.toLowerCase()
    );

    if (selectedTeamData.length < 1) {
      this.setState({ error: true });
      return;
    }

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
      teamName: selectedTeamData[0].teamName,
      error: false
    });
    document.querySelector(".form_input").reset();
  }

  createList() {
    const { data } = this.state;
    return data
      .sort((a, b) => {
        return b.plusMinus - a.plusMinus;
      })
      .map((item, i) => {
        return (
          <li
            className={`plus_minus_rank ${
              item.teamName === this.state.teamName ? "active" : ""
            }`}
            onClick={() => this.setTeam(item)}
            key={i}
          >
            {item.plusMinusRank} - {item.teamName} ( {item.plusMinus} )
          </li>
        );
      });
  }

  createDaysRestedDiv() {
    const { teamId, fetching } = this.state;
    const { gp, w, l, teamDaysRestRange } = this.state.daysRestedStats;

    if (fetching) {
      return (
        <div className="loader-wrapper">
          <div className="loader">hold please</div>
        </div>
      );
    }

    if (teamId === this.state.selectedTeamData[0].teamId) {
      return (
        <div>
          <h3>{teamDaysRestRange}</h3>
          <div className="days-rest-stats-wrapper">
            <span className="days-rest-span">Games Played: {gp}</span>
            <span className="days-rest-span">Wins: {w}</span>
            <span className="days-rest-span">Loses: {l}</span>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  handeClick = e => {
    e.preventDefault();
    this.setTeam();
  };

  handleSearchPlayer = e => {
    const { playerName } = this.state;
    e.preventDefault();
    axios.post("/playerStats", { playerName }).then(response => {
      const {
        data: { playerStats }
      } = response;
      this.setState({ playerStats });
    });
  };

  daysRest(daysRested) {
    const team = this.state.selectedTeamData[0].teamId;
    this.setState({ fetching: true });
    axios.post("/days_rested", { team, daysRested }).then(res => {
      const {
        data: { data, team }
      } = res;

      // console.log("data", data);
      this.setState({
        daysRestedStats: data,
        teamId: team,
        fetching: false
      });
    });
  }
  render() {
    const {
      teamName,
      selectedTeamData,
      teamStats,
      error,
      daysRestedStats,
      diffTeam,
      playerName,
      playerStats
    } = this.state;

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
            <div className="col s12 m4">
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
                    {error && (
                      <p id="error" className="red-text">
                        please type or select a team
                      </p>
                    )}
                  </div>
                </div>
              </form>
              {teamName && (
                <React.Fragment>
                  <h3>
                    {teamName}
                    <span className="record">
                      ({this.state.selectedTeamData[0]["w"]} -{" "}
                      {this.state.selectedTeamData[0]["l"]}){" "}
                    </span>
                  </h3>
                  <h5>Team Plus Minus (in order)</h5>
                  <ul className="plus_minus_wrapper">{this.createList()}</ul>
                </React.Fragment>
              )}
            </div>
            <div className="col s12 m5 push-m1 col m8">
              {selectedTeamData.length > 0 && (
                <React.Fragment>
                  <svg width="600" height="700" className="svg">
                    <BarChart
                      width={600}
                      height={600}
                      teamName={teamName}
                      selectedTeamData={selectedTeamData}
                      teamStats={teamStats}
                    />
                  </svg>
                  <div className="days-rest">
                    <h5 className="days-rest-header">
                      How the {teamName} are playing when rested
                    </h5>
                    <div className="button-wrapper">
                      <button
                        className="days-rest-button"
                        onClick={() => this.daysRest(0)}
                      >
                        0 days
                      </button>
                      <button
                        className="days-rest-button"
                        onClick={() => this.daysRest(1)}
                      >
                        1 days
                      </button>
                      <button
                        className="days-rest-button"
                        onClick={() => this.daysRest(2)}
                      >
                        2 days
                      </button>
                      <button
                        className="days-rest-button"
                        onClick={() => this.daysRest(3)}
                      >
                        3 days
                      </button>
                    </div>
                  </div>

                  {this.createDaysRestedDiv()}
                </React.Fragment>
              )}
            </div>
            <div className="player-search col s12 col m9">
              <form className="card z-depth-0 form_input">
                <div className="card-content">
                  <span className="card-title indigo-text">Search player:</span>
                  <div className="input-field">
                    <input
                      type="text"
                      id="player_name"
                      onChange={e =>
                        this.setState({ playerName: e.target.value })
                      }
                    />
                    <label htmlFor="name">Player Name</label>
                  </div>
                  <div className="input-field center">
                    <button
                      className="btn-large blue white-text"
                      onClick={this.handleSearchPlayer}
                      value={playerName}
                    >
                      Search player
                    </button>
                  </div>
                  <div className="input-field center">
                    {error && (
                      <p id="error" className="red-text">
                        please type in a player
                      </p>
                    )}
                  </div>
                </div>
              </form>
              {playerStats.seasonTotalsRegularSeason &&
              playerStats.seasonTotalsRegularSeason.length > 0 ? (
                <svg width="700" height="520">
                  <LineGraph data={playerStats} />
                </svg>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
