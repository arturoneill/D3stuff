(function() {

//define margin, width, height variables
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1600 - margin.left - margin.right,
	height = 800 - margin.top - margin.bottom;
	
//define svg variable	
	
var svg = d3.select("#map")
		    .append("svg")
		    .attr ("height", height + margin.top + margin.bottom)
		    .attr ("width", width + margin.left + margin.right)
		    .append ("g")
		    .attr("transform", "translate(" +margin.left + "," +margin.top + ")");
  

//read in world.topojson
d3.queue()
	.defer(d3.json, "world.topojson")
	.defer(d3.csv, "capitals.csv")
	.await(ready)
 
//define projection
  var projection = d3.geoMercator()
  .translate([width / 2, height / 2 ])
  .scale(200)
  
  //create a path (geoPath) using projection
  var path = d3.geoPath()
  .projection(projection)
 
  
   //function that feeds data to geopath so it can draw 
function ready (error, data, capitals) {
	console.log(data)

	 //feature "obects.xxxx" has to include xxxx from actual topojson file 
	
	var countries = topojson.feature(data, data.objects.countries1).features
  console.log(countries)
	
	svg.selectAll(".country")
	.data(countries)
	.enter().append("path")
	.attr("class", "country")
	.attr("d", path)
	//add class 'selected'
	.on('mouseover', function(d) {
		d3.select(this).classed("selected", true)
	})
	//remove  class 'selected'
	.on('mouseout', function(d) {
		d3.select(this).classed("selected", false)
	})
	
	
	console.log(capitals)
	
	svg.selectAll(".city-circle")
	.data(capitals)
	.enter().append("circle")
	.attr("r", 2)
	.attr("cx", function(d) {
		var coords = projection([d.Longitude, d.Latitude])
		return coords[0];
	})
	.attr("cy", function(d) {
		var coords = projection([d.Longitude, d.Latitude])
		return coords[1];
	})
	
	svg.selectAll(".city-label")
	.data(capitals)
	.enter().append("text")
	.attr("class", "city-label")
	.attr("x", function(d) {
		var coords = projection([d.Longitude, d.Latitude])
		return coords[0];
	})
	.attr("y", function(d) {
		var coords = projection([d.Longitude, d.Latitude])
		return coords[1];
	})
	.text(function(d) {
		return d.Name
		 })
		.attr("dx", 5)
		.attr("dy", 5)

	
}
	
})();
