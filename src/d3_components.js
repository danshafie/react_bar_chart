import * as d3 from "d3";

const margin = { top: 20, right: 20, bottom: 100, left: 100 };
export const graphWidth = 600 - margin.left - margin.right;
export const graphHeight = 600 - margin.top - margin.bottom;

export const t = d3.transition().duration(500);

export const x = d3
  .scaleBand()
  // .domain(teamStats.map(d => d.name))
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

export const y = d3
  .scaleLinear()
  // .domain([0, d3.max(teamStats, d => d.value)])
  .range([0, graphHeight]);

export const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

export const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

export const colors = d3
  .scaleLinear()
  .domain([30, 0])
  .range(["red", "green"]);
