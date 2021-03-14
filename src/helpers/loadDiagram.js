const d3 = window.d3;

export default function loadDiagram(data, svgId) {
  console.log(data, svgId);
  const dataPoints = data.data_points;
  // Convert data points from strings to objects
  const transformedDataPoints = dataPoints.map((dataPoint) => {
    const matches = dataPoint.match(/\(([0-9-.]*),(\d*)\)/);
    return {
      x: matches[1],
      y: matches[2],
    };
  });

  const margin = {
    left: 50,
    right: 25 + data["x-axis"].Label.length * 5,
    bottom: 30,
    top: 40,
  };

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
    .range([margin.left, width - margin.right]);

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
    .range([height - margin.bottom, margin.top]);

  // Set axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xAxis))
    .call((g) =>
      g
        .select(".tick:last-of-type text")
        .clone()
        .attr("x", (data["x-axis"].Label.length * 5))
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data["x-axis"].Label)
    );
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yAxis))
    .call((g) =>
      g
        .select(".tick:last-of-type text")
        .clone()
        .attr("y", -30)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data["y-axis"].Label)
    );

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
