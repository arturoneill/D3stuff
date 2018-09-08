(function() {

//define margin, width, height variables
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1200 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;
	

	
var pop_domain = [0, 10000, 50000, 100000, 200000, 500000, 1000000, 2000000]
var pop_color = d3.scaleThreshold()
    .domain(pop_domain)
    .range(d3.schemeGreens[7]);	
	
	
var popData = d3.map();
	
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
	.defer(d3.csv, "data/UScountypop.csv", function(d) {
        if (d.respop72017 == '-') {
            povertyData.set(d.id2, 0);
        } else {
            povertyData.set(d.id2, +d.respop72017); 
        }
        
    })
	.await(ready)
 
//define projection
  var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2 ])
  .scale(1200)
  
  //create a path (geoPath) using projection
  var path = d3.geoPath()
  .projection(projection)
 
  
   //function that feeds data to geopath so it can draw 
function ready (error, data, popData) {
	console.log(data)

	 //feature "obects.xxxx" has to include xxxx from actual topojson file 
	
	var counties = topojson.feature(data, data.objects.county).features
  console.log(counties)
	
	svg.selectAll(".county")
	.data(counties)
	.enter().append("path")
	.attr("class", "county")
	.attr("d", path)
	  .attr("fill", function(d) { 
            var value = popData.get(d.objects.id);
            return (value != 0 ? pop_color(value) : "lightblue");  

        })
        
	
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
