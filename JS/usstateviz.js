(function() {

//define margin, width, height variables
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1200 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;
	

	

	
//define svg variable	
	
var svg = d3.select("#usmap")
		    .append("svg")
		    .attr ("height", height + margin.top + margin.bottom)
		    .attr ("width", width + margin.left + margin.right)
		    .append ("g")
		    .attr("transform", "translate(" +margin.left + "," +margin.top + ")");
  

//read in world.topojson
d3.queue()
	.defer(d3.json, "usstates.topojson")
	.await(ready)
 
//define projection
  var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2 ])
  .scale(1200)
  
  //create a path (geoPath) using projection
  var path = d3.geoPath()
  .projection(projection)
 
  
   //function that feeds data to geopath so it can draw 
function ready (error, data) {
	console.log(data)

	 //feature "obects.xxxx" has to include xxxx from actual topojson file 
	
	var states = topojson.feature(data, data.objects.state).features
  console.log(states)
	
	svg.selectAll(".state")
	.data(states)
	.enter().append("path")
	.attr("class", "state")
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
