d3.csv("data/GDP.csv").then(function(data){
//    console.log(data);
    
    data.forEach(function (d) {
        d.China = +d.China
        d.UK = +d.UK
        d.China2 = +d.China2
        d.UK2 = +d.UK2
    })

    var margin = {
        top: 10,
        right: 50,
        bottom: 50,
        left: 35
    };

    var width = 1180 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select('#seven-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    //scale
    var min = d3.min(data, function (d) {
        return d.China2;
    })
//    console.log(min)
    var max = d3.max(data, function (d) {
        return d.China2;
    })
//    console.log(max)
    
     var max2 = d3.max(data, function (d) {
        return d.UK2;
    })
    
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    var x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.Year
        }))
        .range([0, width])
    
    //x-axis
    var xAxisCall = d3.axisBottom(x);
    g.append('g')
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .transition().duration(3500)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "15")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-50)")

    //y-axis
    var yAxisCall = d3.axisLeft(y);
    g.append('g')
        .attr("class", "y-axis")
        .transition().duration(3500)
        .call(yAxisCall)
    
   
    var valueline = d3.line()
                    .x(function(d) { return x(d.Year)+45;})
                    .y(function(d) { return y(d.China2);})
    
    
    var valueline2 = d3.line()
                    .x(function(d) { return x(d.Year)+45;})
                    .y(function(d) { return y(d.UK2);})
    

    
    svg.append("path")
        .data([data])
        .attr("class", "line-gdp")
        .attr("d", valueline)
        .attr("stroke", "#C16969")
        .attr("fill", "none")
        .attr("stroke-width", "3px")
    
    svg.append("path")
        .data([data])
        .attr("class", "line-gdp")
        .attr("d", valueline2)
        .attr("stroke", "#4DB6AC")
        .attr("fill", "none")
        .attr("stroke-width", "3px")
    
     svg.append("rect")
        .attr("class", "point")
        .attr("x", 45)
        .attr("y", 108)
        .attr("width", 1050)
        .attr("height", 3)
        .attr("fill","#4D8EB6")
        .style("opacity", 0)
    
    svg.append("text")
        .attr("class","duration")
        .attr("y", 95)
        .attr("x", 1050/2)
        .attr("fill","#ffffff")
        .style("font-size","20px")
        .text("48 Years")
        .style("opacity", 0)
            
    
    svg.append("circle")
        .attr("class", "point")
        .attr("cx", 1090)
        .attr("cy", 110)
        .attr("r",10)
        .attr("fill","#4D8EB6")
        .on('mouseover', function(d, i) {
            d3.select(this)
            .transition().duration(300)
            .style('stroke', '#ffffff')
            .style('stroke-width','2px')
            d3.select(".duration")
                .transition().duration(300)
                .style("opacity", 1)
            d3.select(".point")
                .transition().duration(300)
                .style("opacity", 1)

            
        })
        .on('mouseout', function(d,i){
            d3.select(this)
            .transition().duration(300)
            .style('stroke',"none")
            d3.select(".duration")
                .transition().duration(300)
                .style("opacity", 0)
            d3.select(".point")
                .transition().duration(300)
                .style("opacity", 0)
        })
    
    
}).catch(function (error) {
    console.log(error);
}) //debugging