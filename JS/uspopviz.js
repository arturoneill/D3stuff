(function() {

//define margin, width, height variables
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1200 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;
	



var svg = d3.select("#usmap")
		    .append("svg")
		    .attr ("height", height + margin.top + margin.bottom)
		    .attr ("width", width + margin.left + margin.right)
		    .append ("g")
		    .attr("transform", "translate(" +margin.left + "," +margin.top + ")");
  




// color 
var pop_domain = [0, 10000, 50000, 100000, 200000, 500000, 2000000, 15000000]
var pop_color = d3.scaleThreshold()
    .domain(pop_domain)
    .range(d3.schemeGreens[7]);



// popData 
var popData = d3.map();




// asynchronous tasks, load topojson maps and data
d3.queue()
    .defer(d3.json, "data/uscounty.topojson")
    .defer(d3.csv, "data/UScountypop.csv", function(d) { 
        if (isNaN(d.respop72014)) {
            popData.set(d.id2, 0); 
        } else {
            popData.set(d.id2, +d.respop72014); 
        }
        
    })
    .await(ready);
	
	
	
	//define projection
 // var projection = d3.geoAlbersUsa()
  //.translate([width / 2, height / 2 ])
 // .scale(1200)
  




// callback function  
function ready(error, data) {
	
	if (error) throw error;
	
console.log(data)


      // new york topojson
    var USA = topojson.feature(data, {
        type: "GeometryCollection",
        geometries: data.objects.county.geometries
    });
	
	var projection = d3.geoAlbersUsa()
        .fitExtent([[20, 20], [460, 580]], USA);;

  //create a path (geoPath) using projection
  var path = d3.geoPath()
  .projection(projection)
  
  
  	//var counties = topojson.feature(data, data.objects.county).features
  console.log(USA)
	console.log(popData)
	
	svg.selectAll(".county")
	.data(USA.features)
	.enter().append("path")
	.attr("class", "county")
	.attr("d", path)
   .attr("fill", "white")
        .transition().duration(2000)
        .delay(function(d, i) {
            return i * 5; 
        })
        .ease(d3.easeLinear)
        .attr("fill", function(d) { 
            var value = popData.get(d.objects.county.id);
            return (value != 0 ? pop_color(value) : "lightblue");  

        })



	
}
	
})();
