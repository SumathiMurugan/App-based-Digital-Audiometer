// Sample audiogram data (frequency in Hz and dB levels)
const audiogramData = [
    { frequency: 250, leftEar: 20, rightEar: 25 },
    { frequency: 500, leftEar: 15, rightEar: 20 },
    // Add more data points here
];

// Create the SVG element
const svg = d3.select("#audiogram")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

// Define the chart margins
const margin = { top: 30, right: 30, bottom: 60, left: 60 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;

// Create scales for the X and Y axes
const xScale = d3.scaleLinear().domain([125, 8000]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

// Create X and Y axes
const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d"));
const yAxis = d3.axisLeft(yScale);

// Append X and Y axes to the chart
svg.append("g")
    .attr("transform", `translate(${margin.left},${height + margin.top})`)
    .call(xAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("dy", "0.71em")
    .style("text-anchor", "middle")
    .text("Frequency (Hz)");

svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(yAxis)
    .append("text")
    .attr("x", -30)
    .attr("y", -30)
    .attr("dy", "0.71em")
    .style("text-anchor", "end")
    .text("dB HL");

// Create lines for left and right ear data
const lineLeft = d3.line()
    .x(d => xScale(d.frequency))
    .y(d => yScale(d.leftEar));

const lineRight = d3.line()
    .x(d => xScale(d.frequency))
    .y(d => yScale(d.rightEar));

// Append data lines to the chart
svg.append("path")
    .datum(audiogramData)
    .attr("class", "line")
    .attr("d", lineLeft)
    .attr("transform", `translate(${margin.left},${margin.top})`);

svg.append("path")
    .datum(audiogramData)
    .attr("class", "line")
    .attr("d", lineRight)
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("stroke", "red");

// Add labels for left and right ears
svg.append("text")
    .attr("class", "label")
    .attr("x", width - 50)
    .attr("y", yScale(audiogramData[audiogramData.length - 1].leftEar))
    .attr("dy", "0.35em")
    .text("Left Ear");

svg.append("text")
    .attr("class", "label")
    .attr("x", width - 50)
    .attr("y", yScale(audiogramData[audiogramData.length - 1].rightEar))
    .attr("dy", "0.35em")
    .style("fill", "red")
    .text("Right Ear");