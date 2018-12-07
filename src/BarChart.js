import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  state = {
    x: d3
      .scaleBand()
      .domain(this.props.teamStats.map(d => d.name))
      .range([0, 600])
      .paddingInner(0.2)
      .paddingOuter(0.2),
    y: d3
      .scaleLinear()
      .domain([0, d3.max(this.props.teamStats, d => d.value)])
      .range([0, 600]),
    colors: d3
      .scaleLinear()
      .domain([30, 0])
      .range(["red", "green"])
  };

  componentDidMount() {
    setTimeout(() => {
      const { x, y } = this.state;
      const graph = d3.select(".barchart_group");
      const xAxisGroup = graph
        .append("g")
        .attr("transform", `translate(0, 600)`);
      const yAxisGroup = graph.append("g");
      const xAxis = d3.axisBottom(x);
      const yAxis = d3
        .axisLeft(y)
        .tickFormat(d => d)
        .ticks(5);
      xAxisGroup.call(xAxis);
      yAxisGroup.call(yAxis);
    }, 100);
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      const graph = d3.selectAll("rect");
      console.log("graph in cwrp: ", graph);
    }, 1000);
  }

  // createGraph() {
  //   const { width, height, teamStats } = this.props;

  //   const margin = { top: 20, right: 20, bottom: 100, left: 100 };
  //   const graphWidth = width - margin.left - margin.right;
  //   const graphHeight = height - margin.top - margin.bottom;
  //   const t = d3.transition().duration(500);
  //   const svg = d3
  //     .select(".canvas")
  //     .append("svg")
  //     .attr("width", 600)
  //     .attr("height", 600);
  //   const colors = d3
  //     .scaleLinear()
  //     .domain([30, 0])
  //     .range(["red", "green"]);
  //   const graph = svg
  //     .append("g")
  //     .attr("width", graphWidth)
  //     .attr("height", graphHeight)
  //     .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //   const x = d3
  //     .scaleBand()
  //     .domain(teamStats.map(d => d.name))
  //     .range([0, graphWidth])
  //     .paddingInner(0.2)
  //     .paddingOuter(0.2);

  //   const y = d3
  //     .scaleLinear()
  //     .domain([0, d3.max(teamStats, d => d.value)])
  //     .range([0, graphHeight]);

  //   const rects = graph.selectAll("rect").data(teamStats);

  //   rects.exit().remove();

  //   rects
  //     .attr("width", x.bandwidth)
  //     .attr("x", d => x(d.name))
  //     .attr("y", graphHeight)
  //     .attr("height", 0)
  //     .attr("fill", d => colors(d.value))
  //     .transition(t)
  //     .attr("height", d => graphHeight - y(d.value))
  //     .attr("y", d => y(d.value));

  //   rects
  //     .enter()
  //     .append("rect")
  //     .attr("width", x.bandwidth)
  //     .attr("x", d => x(d.name))
  //     .attr("y", graphHeight)
  //     .attr("height", 0)
  //     .attr("fill", d => colors(d.value))
  //     .transition(t)
  //     .attr("height", d => graphHeight - y(d.value))
  //     .attr("y", d => y(d.value));

  //   const xAxisGroup = graph
  //     .append("g")
  //     .attr("transform", `translate(0, ${graphHeight})`);
  //   const yAxisGroup = graph.append("g");

  //   const xAxis = d3.axisBottom(x);
  //   const yAxis = d3
  //     .axisLeft(y)
  //     .tickFormat(d => d)
  //     .ticks(5);

  //   xAxisGroup.call(xAxis);
  //   yAxisGroup.call(yAxis);
  // }

  render() {
    console.log("props: ", this.props);
    console.log("state: ", this.state);
    const { x, y, colors } = this.state;
    const { teamStats } = this.props;
    console.log("d3 select: ", d3.select(".barchart_group"));

    const svg = d3.select(".barchart_group");
    console.log("svg: ", svg);
    setTimeout(() => {
      const allbars = d3.selectAll(".bar_bitch");
      console.log("allbars", allbars);
    }, 2000);

    return (
      <g className="barchart_group" transform={`translate(20, 20)`}>
        {teamStats.map((d, i) => {
          console.log("yvalue: ", 600 - y(d.value));

          return (
            <rect
              x={x(d.name)}
              y={y(d.value)}
              height={600 - y(d.value)}
              fill={colors(d.value)}
              width={x.bandwidth()}
              key={i}
              className="bar"
            />
          );
        })}
      </g>
    );
  }
}

BarChart.defaultProps = {
  data: []
};

export default BarChart;
