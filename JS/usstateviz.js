(function() {

//define margin, width, height variables
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1200 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;
	

var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 8])
    .on("zoom", zoomed);	

	
//define svg variable	
	
var svg = d3.select("#usmap")
		    .append("svg")
		    .attr ("height", height + margin.top + margin.bottom)
		    .attr ("width", width + margin.left + margin.right)
		    .on("click", stopped, true)
		    .append ("g")
		    .attr("transform", "translate(" +margin.left + "," +margin.top + ")");
	
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g");

svg
    .call(zoom) // delete this line to disable free zooming
    .call(zoom.event);
  

//read in world.topojson
d3.queue()
	.defer(d3.json, "data/usstates.topojson")
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
	
	
	function clicked(d) {
  if (active.node() === this) return reset();
  active.classed("active", false);
  active = d3.select(this).classed("active", true);

  var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
      translate = [width / 2 - scale * x, height / 2 - scale * y];

  svg.transition()
      .duration(750)
      .call(zoom.translate(translate).scale(scale).event);
}

function reset() {
  active.classed("active", false);
  active = d3.select(null);

  svg.transition()
      .duration(750)
      .call(zoom.translate([0, 0]).scale(1).event);
}

function zoomed() {
  g.style("stroke-width", 1.5 / d3.event.scale + "px");
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
}

	
}
	
})();
