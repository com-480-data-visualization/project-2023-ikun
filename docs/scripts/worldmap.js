var map = L
  .map('mapid')
  .setView([47, 2], 4);   // center position + zoom

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 6,
    minZoom: 2,
    }).addTo(map);

// Add a svg layer to the map
L.svg().addTo(map);


function update_map() {
  d3.selectAll("circle")
    .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
    .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
}

map.on("moveend", update_map);
