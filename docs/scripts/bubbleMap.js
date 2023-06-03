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


var dataToDrawMap = [];
let p = "grocery_pharmacy";
const categoriesMap = [
  {name: "grocery_pharmacy", v: 0},
  {name: "park", v: 1},
  {name: "residential", v: 2},
  {name: "retail_recreation", v: 3},
  {name: "transit_station", v: 4},
  {name: "workplace", v: 5}
];

const color_list = ["blue", "red", "green", "yellow", "purple", "brown"]
let placesMap = ["grocery_pharmacy", "park", "residential", "retail_recreation", "transit_station", "workplace"];

const datesMap = Object.keys(data["France"][p]);
datesMap.sort();
const countriesMap = Object.keys(case_data);
countriesMap.sort();

// construct selection button
d3.select("#selectButton")
    .selectAll('myOptions')
    .data(categoriesMap)
    .enter()
    .append('option')
    .text(function (d) { return d.name; }) // text showed in the menu
    .attr("value", function (d) { return d.v; }) // corresponding value returned by the button


var dateMap = datesMap[300];




for (let country of countriesMap){
  if (case_data[country][dateMap][1] == 0){
    continue;
  }

  dataToDrawMap.push(
    {
      country: country,
      cases: case_data[country][dateMap][0],
      lat: case_data[country][dateMap][2],
      long: case_data[country][dateMap][1],
      value: data[country][p][dateMap] + 1
    }
  )


}






// Select the svg area and add circles:
function BubbleMap(dataIn, dateIn, pIn){

  var size = d3.scaleSqrt()
    .domain([0, 6399531])  // What's in the data
    .range([2, 50]);  // Size in pixel

  var valueExtent = d3.extent(dataIn, function(d) { return d.value; })
  var opacity = d3.scaleLinear().domain(valueExtent)
  .range(["white", color_list[pIn]])

  var svg = d3.select("#mapid")
    .select("svg")

  svg.selectAll("*").remove();

  svg.selectAll("myCircles")
    .data(dataIn)
    .join("circle")
      .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
      .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
      .attr("r", function(d){ return size(d.cases) })
      .style("fill", function(d){return opacity(d.value) })
      .attr("fill-opacity", .8)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
  // append date
  var txt_svg = d3.select("#date_text")
  txt_svg.selectAll("*").remove();
  txt_svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "white")
      .attr("x", 250)
      .attr("y", 40)
      .attr('font-size', '40px')
  		.attr('font-weight', 'bold')
      .text(dateIn)

}


function updateMap(index, pIn) {
  dateMap = datesMap[index]
  dataToDrawMap = [];

  for (let country of countriesMap){
    if (case_data[country][dateMap][1] == 0){
      continue;
    }

    dataToDrawMap.push(
      {
        country: country,
        cases: case_data[country][dateMap][0],
        lat: case_data[country][dateMap][2],
        long: case_data[country][dateMap][1],
        value: data[country][placesMap[pIn]][dateMap] + 1
      }
    )
  }

  BubbleMap(dataToDrawMap, dateMap, pIn)
}


let date_index = 200;
let place_index = 0;
updateMap(date_index, place_index)

d3.select("#mySlider").on("input", function(d){
  date_index = this.value
  updateMap(date_index, place_index)
})

d3.select("#selectButton").on("change", function(d){
    place_index = this.value
    updateMap(date_index, place_index)
  })
