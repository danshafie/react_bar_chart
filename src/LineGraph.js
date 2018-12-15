import React, { Component } from "react";
import * as d3 from "d3";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class LineGraph extends Component {
  render() {
    console.log("props: ", this.props);

    return (
      <LineChart
        width={600}
        height={300}
        data={this.props.data.seasonTotalsRegularSeason}
      >
        <XAxis dataKey="" />
        <YAxis />
        <Line
          type="monotone"
          dataKey="pts"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
      </LineChart>
    );
  }
}

// 2009,
//   d3.max(
//     this.props.data.seasonTotalsRegularSeason.map(d =>
//       d.seasonId.substring(0, d.seasonId.indexOf("-"))
//     )
//   );

// class LineGraph extends Component {
//   max = d3.max(
//     this.props.data.seasonTotalsRegularSeason.map(d =>
//       d.seasonId.substring(0, d.seasonId.indexOf("-"))
//     )
//   );

//   min = d3.min(
//     this.props.data.seasonTotalsRegularSeason.map(d =>
//       d.seasonId.substring(0, d.seasonId.indexOf("-"))
//     )
//   );

//   // line = d3
//   //   .line()
//   //   .x(function (d) {
//   //     return this.state.x(new Date(d.seasonId));
//   //   })
//   //   .y(function (d) {
//   //     return this.state.y(d.pts);
//   //   });
//   state = {
//     x: d3
//       .scaleTime()
//       .range([0, 560])
//       .domain([this.min, this.max]),
//     y: d3
//       .scaleLinear()
//       .domain([
//         0,
//         d3.max(this.props.data.seasonTotalsRegularSeason.map(d => d.pts))
//       ])
//       .range([400, 0])
//   };

//   componentDidMount() {
//     this.makeStuff();
//   }

//   componentWillReceiveProps() {
//     this.makeStuff();
//   }

//   makeStuff() {
//     setTimeout(() => {
//       const { x, y } = this.state;

//       this.line = d3
//         .line()
//         .x(function(d) {
//           return x(d.seasonId.substring(0, d.seasonId.indexOf("-")));
//         })
//         .y(function(d) {
//           return y(d.pts);
//         });

//       const graph = d3.select(".line-graph-group");
//       const xAxisGroup = graph
//         .append("g")
//         .attr("class", "x-axis")
//         .attr("transform", `translate(0, 400)`);
//       const yAxisGroup = graph.append("g").attr("class", "y-axis");

//       const xAxis = d3.axisBottom(x);

//       const yAxis = d3.axisLeft(y).ticks(6);

//       const circles = graph
//         .selectAll("circle")
//         .data(this.props.data.seasonTotalsRegularSeason);

//       circles.exit().remove();

//       circles
//         .attr("cx", d => x(d.seasonId.substring(0, d.seasonId.indexOf("-"))))
//         .attr("cy", d => y(d.pts));

//       xAxisGroup
//         .call(xAxis)
//         .selectAll("text")
//         .attr("transform", "rotate(-40)")
//         .attr("text-anchor", "end");
//       yAxisGroup.call(yAxis);

//       const path = graph.append("path");

//       path
//         .data([this.props.data.seasonTotalsRegularSeason])
//         .attr("fill", "none")
//         .attr("stroke", "#00bfa5")
//         .attr("stroke-width", 2)
//         .attr("d", this.line);
//     }, 100);
//   }

//   render() {
//     console.log("props:", this.props);
//     const { x, y, colors } = this.state;
//     if (this.props.data.length <= 0) {
//       return <div>nothing</div>;
//     }
//     return (
//       <g className="line-graph-group" transform="translate(50, 40)">
//         {this.props.data.seasonTotalsRegularSeason.map((d, i) => {
//           // console.log(d.seasonId.substring(0, d.seasonId.indexOf("-")));

//           return (
//             <circle
//               r={4}
//               cx={x(d.seasonId.substring(0, d.seasonId.indexOf("-")))}
//               cy={y(d.pts)}
//               fill={"black"}
//               key={i}
//             />
//           );
//         })}
//       </g>
//     );
//   }
// }

export default LineGraph;
