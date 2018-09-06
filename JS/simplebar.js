var chartdata = [];
for( var i=0; i<10; i++) {
var mydata = Math.random()*300;
  chartdata.push(mydata);
    }

d3.select("body").selectAll("div")
.data(chartdata)
.enter()
.append("div")
.attr("class", "bar")
.style("height", function(d){
  return d + "px";
});




