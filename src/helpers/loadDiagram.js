const d3 = window.d3;

export default function loadDiagram(dataPoints, svgId) {
  // Convert data points from strings to objects
  const transformedDataPoints = dataPoints.map((dataPoint) => {
    const matches = dataPoint.match(/\((\d*),(\d*)\)/);
    return {
      x: matches[1],
      y: matches[2],
    };
  });

  // Get svg, its height and width
  const svg = d3.select(`#${svgId}`),
    width = svg.attr("width"),
    height = svg.attr("height");

  // Add X axis
  const xAxis = d3
    .scaleLinear()
    .domain([
      d3.min(transformedDataPoints, function (d) {
        return +d.x;
      }),
      d3.max(transformedDataPoints, function (d) {
        return +d.x;
      }),
    ])
    .range([0, width]);

  // Add Y axis
  const yAxis = d3
    .scaleLinear()
    .domain([
      d3.min(transformedDataPoints, function (d) {
        return +d.y;
      }),
      d3.max(transformedDataPoints, function (d) {
        return +d.y;
      }),
    ])
    .range([0, height]);

  // Set axes
  svg.append("g").call(d3.axisBottom(xAxis));
  svg.append("g").call(d3.axisRight(yAxis));

  // Add the line
  svg
    .append("path")
    .datum(transformedDataPoints)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return xAxis(d.x);
        })
        .y(function (d) {
          return yAxis(d.y);
        })
    );
}
