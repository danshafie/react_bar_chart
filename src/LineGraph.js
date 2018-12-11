import React, { Component } from "react";
import * as d3 from "d3";

class LineGraph extends Component {
  state = {
    x: d3
      .scaleTime()
      .range([0, 560])
      .domain([
        0,
        d3.max(
          this.props.data.seasonTotalsRegularSeason.map(d =>
            d.seasonId.substring(0, d.seasonId.indexOf("-"))
          )
        )
      ]),
    y: d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.props.data.seasonTotalsRegularSeason.map(d => d.pts))
      ])
      .range([400, 0]),
    line: d3
      .line()
      .x(function(d) {
        return this.state.x(new Date(d.seasonId));
      })
      .y(function(d) {
        return this.state.y(d.pts);
      })
  };

  componentDidMount() {}
  render() {
    console.log("props:", this.props);
    const { x, y, colors } = this.state;
    if (this.props.data.length <= 0) {
      return <div>nothing</div>;
    }
    return (
      <g className="line-graph-group" transform="translate(100, 40)">
        {this.props.data.seasonTotalsRegularSeason.map((d, i) => {
          // console.log(d.seasonId.substring(0, d.seasonId.indexOf("-")));

          return (
            <circle
              r={4}
              cx={x(d.seasonId.substring(0, d.seasonId.indexOf("-")))}
              cy={y(d.pts)}
              fill={"ccc"}
              key={i}
            />
          );
        })}
      </g>
    );
  }
}

export default LineGraph;
