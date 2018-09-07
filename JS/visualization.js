(function() {

//define margin, width, height variables
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 800 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;
	
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
	.await(ready)
 
//define projection
  var projection = d3.geoMercator()
  .translate([width / 2, height / 2 ])
  .scale(100)
  
  //create a path (geoPath) using projection
  var path = d3.geoPath()
  .projection(projection)
 
  
   //function that feeds data to geopath so it can draw 
function ready (error, data) {

	var countries = topojson.feature(data, data.objects.countries1).features
  console.log(countries1)
	
	svg.selectAll(".country")
	.data(countries1)
	.enter().append("path")
	.attr("class", "country")
	.attr("d", path)
	
 
	
}
	
})();
