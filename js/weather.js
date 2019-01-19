d3.csv("data/weather.csv").then(function (data) {
    data.forEach(function (d) {
        d.TotalAA = +d.TotalAA;
        d.TotalDA = +d.TotalDA;
        d.FloodAA = +d.FloodAA;
        d.FloodDA = +d.FloodDA;
        d.DroughtAA = +d.DroughtAA;
        d.DroughtDA = +d.DroughtDA;
        d.FoodProduction = +d.FoodProduction;
    })
//    console.log(data)

    var margin = {
        top: 10,
        right: 50,
        bottom: 50,
        left: 35
    };

    var width = 1180 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select('#sixth-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var bar = g.selectAll("rect")
        .data(data);

    //scale
    var min = d3.min(data, function (d) {
        return d.TotalAA;
    })
    var max = d3.max(data, function (d) {
        return d.TotalAA;
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

    //Enter data totalAA
    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Year) + 20;
        })
        .attr("y", function (d) {
            return y(d.TotalAA)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y(d.TotalAA);
        })
        .attr("fill", function (d) {
            return "#DB5D5D"
        })

    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Year) + 30;
        })
        .attr("y", function (d) {
            return y(d.TotalDA)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y(d.TotalDA);
        })
        .attr("fill", function (d) {
            return "#DB5D5D"
        })
        .style("opacity", 0.4)

    //Flood
    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Year) + 45;
        })
        .attr("y", function (d) {
            return y(d.FloodAA)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y(d.FloodAA);
        })
        .attr("fill", function (d) {
            return "#4D8EB6"
        })

    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Year) + 55;
        })
        .attr("y", function (d) {
            return y(d.FloodDA)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y(d.FloodDA);
        })
        .attr("fill", function (d) {
            return "#4D8EB6"
        })
        .style("opacity", 0.4)

    //Drought
    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Year) + 70;
        })
        .attr("y", function (d) {
            return y(d.DroughtAA)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y(d.DroughtAA);
        })
        .attr("fill", function (d) {
            return "#AC5D02"
        })
    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Year) + 80;
        })
        .attr("y", function (d) {
            return y(d.DroughtDA)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y(d.DroughtDA);
        })
        .attr("fill", function (d) {
            return "#AC5D02"
        })
        .style("opacity", 0.4)

    //food production
    var valueline = d3.line()
        .x(function (d) {
            return x(d.Year) + 85;
        })
        .y(function (d) {
            return y(Math.abs(d.FoodProduction) / 4 - 140);
        })
        .curve(d3.curveMonotoneX)



    svg.append("path")
        .attr("class", "line")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("stroke", "#4DB6AC")
        .attr("fill", "none")
        .attr("stroke-width", "3px")

    var circle = g.selectAll("circle")
        .data(data)

    circle.enter()
        .append("circle")
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d) {
            return x(d.Year) + 53
        })
        .attr("cy", function (d) {
            return y(Math.abs(d.FoodProduction) / 4);
        })
        .attr("r", 5)
        .attr("fill", "#4DB6AC");




}).catch(function (error) {
    console.log(error);
}) //debugging
