(function() {

//define margin, width, height variables
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1600 - margin.left - margin.right,
	height = 800 - margin.top - margin.bottom;
	
//define svg variable	
	
var svg = d3.select("#usmap")
		    .append("svg")
		    .attr ("height", height + margin.top + margin.bottom)
		    .attr ("width", width + margin.left + margin.right)
		    .append ("g")
		    .attr("transform", "translate(" +margin.left + "," +margin.top + ")");
  

//read in world.topojson
d3.queue()
	.defer(d3.json, "uscounty.topojson")
	.await(ready)
 
//define projection
  var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2 ])
  .scale(400)
  
  //create a path (geoPath) using projection
  var path = d3.geoPath()
  .projection(projection)
 
  
   //function that feeds data to geopath so it can draw 
function ready (error, data) {
	console.log(data)

	 //feature "obects.xxxx" has to include xxxx from actual topojson file 
	
	var counties = topojson.feature(data, data.objects.county).features
  console.log(counties)
	
	svg.selectAll(".county")
	.data(counties)
	.enter().append("path")
	.attr("class", "county")
	.attr("d", path)
	//add class 'selected'
	.on('mouseover', function(d) {
		d3.select(this).classed("selected", true)
	})
	//remove  class 'selected'
	.on('mouseout', function(d) {
		d3.select(this).classed("selected", false)
	})
	
	

	
}
	
})();
