d3.csv("data/steel.csv").then(function(data){
    console.log(data)
    data.forEach(function (d) {
        d.SteelProduction = +d.SteelProduction
    })
    
    var margin = {
        top: 10,
        right: 50,
        bottom: 50,
        left: 35
    };

    var width = 1180 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select('#eighth-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    //scale
    var min = d3.min(data, function (d) {
        return d.SteelProduction;
    })
    console.log(min)
    var max = d3.max(data, function (d) {
        return d.SteelProduction;
    })
    
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    var x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.Year
        }))
        .range([0, width])
    
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
                    .x(function(d) { return x(d.Year)+68;})
                    .y(function(d) { return y(d.SteelProduction);})
    
      svg.append("path")
        .data([data])
        .attr("class", "line-gdp")
        .attr("d", valueline)
        .attr("stroke", "#C16969")
        .attr("fill", "none")
        .attr("stroke-width", "3px")
    
    
    
}).catch(function (error) {
    console.log(error);
}) //debugging