/*
function BubbleMap(id, data, category, date){
  var size = d3.scaleSqrt()
    .domain([0, 6399531])  // What's in the data
    .range([0, 50]);  // Size in pixel

  var svg = d3.select("#mapid")
    .select("svg")
  // remove previous svg
  svg.selectAll("*").remove();

  // add circles
  svg.selectAll("myCircles")
    .data(data)
    .join("circle")
      .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
      .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).x)
      .attr("r", function(d){ return size(+d.cases) })
      .style("fill", "red")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("fill-opacity", .4)
}
*/


var dataToDraw = [];
let p = "grocery_pharmacy";

const dates = Object.keys(data["France"][p]);
dates.sort();
const countries = Object.keys(case_data);
countries.sort();

// slider setup
const slider = $('#date-slider-sec1')

slider.slider({
    max: dates.length - 1,
    min: 0,
    step: 1,
    slide: (event, ui) => {
        dateId = ui.value
        date = dates[dateId]

    }

})

var date = dates[300];
var maxValue = 2.0;


for (let country of countries){
  if (case_data[country][date][1] == 0){
    continue;
  }

  dataToDraw.push(
    {
      country: country,
      cases: case_data[country][date][0],
      lat: case_data[country][date][2],
      long: case_data[country][date][1],
      value: Math.min(data[country][p][date] + 1, maxValue)
    }
  )
}

const markers = [
  {long: 9.083, lat: 42.149}, // corsica
  {long: 7.26, lat: 43.71}, // nice
  {long: 2.349, lat: 48.864}, // Paris
  {long: -1.397, lat: 43.664}, // Hossegor
  {long: 3.075, lat: 50.640}, // Lille
  {long: -3.83, lat: 48}, // Morlaix
];

// Select the svg area and add circles:
function BubbleMap(data){

  var size = d3.scaleSqrt()
    .domain([0, 6399531])  // What's in the data
    .range([2, 50]);  // Size in pixel

  var valueExtent = d3.extent(data, function(d) { return d.value; })
  var opacity = d3.scaleLinear().domain(valueExtent)
  .range(["white", "blue"])

  var svg = d3.select("#mapid")
    .select("svg")

  svg.selectAll("*").remove();

  svg.selectAll("myCircles")
    .data(data)
    .join("circle")
      .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
      .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
      .attr("r", function(d){ return size(d.cases) })
      .style("fill", function(d){return opacity(d.value) })
      .attr("fill-opacity", .8)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
}
BubbleMap(dataToDraw);
