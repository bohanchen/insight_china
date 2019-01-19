d3.csv("data/death.csv").then(function (data) {
//    console.log(data);
    data.forEach(function (d) {
        d.numbers = +d.numbers;
    })

    var margin = {
        top: 10,
        right: 50,
        bottom: 50,
        left: 35
    };

    var width = 1180 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select('#forth-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var circle = g.selectAll("circle")
        .data(data)

    var min = d3.min(data, function (d) {
        return d.numbers;
    })
    var max = d3.max(data, function (d) {
        return d.numbers;
    })
    var r = d3.scaleLinear()
        .domain([0, max])
        .range([0, height / 2]);

    var x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.numbers
        }))
        .range([0, width])
    
    var formatComma = d3.format(",");

    circle.enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", function (d, i) {
            return width/3;
        })
        .attr("cy", height / 2)
        .attr("r", function (d) {
            return r(d.numbers)
        })
        .attr("fill", "#A23B3B")
        .style("opacity", 0.5)
        .on('mouseover', function(d, i) {
            d3.select(this)
            .transition().duration(300)
            .style('stroke', '#ffffff')
            .style('stroke-width','8px')
            .style('fill', '#A23B3B')
            .style("opacity", 0.9)  
                svg.append('text')
                .attr("class", "tooptip")
                .attr("x",width/1.5)
                .attr("y",height/2)
    //            .attr("dx", "-1em")
                .attr("fill", "#ffffff")
                .style("font-size", "16px")
                .text(d.name)
                svg.append('text')
                .attr("class", "tooptip2")
                .attr("x",width/1.5)
                .attr("y",height/2-30)
                .attr("fill", "#ffffff")
                .style("font-size", "25px")
                .text(formatComma(d.numbers))
        })
        .on('mouseout', function(d,i){
            d3.select(this)
            .transition().duration(300)
            .attr('fill','#ffffff')
            .style('stroke',"none")
            .style('opacity',0.3)
            d3.select(".tooptip").remove();
            d3.select(".tooptip2").remove();
        })
            
}).catch(function (error) {
    console.log(error);
}) //debugging

//visualization for mapping
d3.csv("data/DeathByState.csv").then(function(data){
//    console.log(data)
    
    data.forEach(function (d) {
        d.Death2 = +d.Death2;
        d.Death = +d.Death;
    })

    var margin = {
        top: 10,
        right: 50,
        bottom: 80,
        left: 35
    };

    var width = 1180 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select('#fifth-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var g2 = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    let bar2 = g2.selectAll("rect")
        .data(data);
    
    //scale
    var min = d3.min(data, function (d) {
        return d.Death2;
    })
//    console.log(min);
    var max = d3.max(data, function (d) {
        return d.Death2;
    })
//    console.log(max);


    let y2 = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);

    
    
   let x2 = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.States
        }))
        .range([0, width])

    //x-axis
    let xAxisCall2 = d3.axisBottom(x2);
    g2.append('g')
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .transition().duration(3500)
        .call(xAxisCall2)
        .selectAll("text")
        .attr("y", "15")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-50)")

    //y-axis
    let yAxisCall2 = d3.axisLeft(y2);
    g2.append('g')
        .attr("class", "y-axis")
        .transition().duration(3500)
        .call(yAxisCall2)

    //enter data
    bar2.enter()
        .append("rect")
        .attr("class", "death-1")
        .attr("x", function (d, ) {
            return x2(d.States) + 13;
        })
        .attr("y", function (d) {
            return y2(d.Death)
        })
        .transition().duration(2500)
        .attr("width", 4)
        .attr("height", function (d) {
            return height - y2(d.Death);
        })
        .attr("fill", function (d) {

            return "#79C788"
        })

    bar2.enter()
        .append("rect")
        .attr("class", "death-2")
        .attr("x", function (d, ) {
            return x2(d.States) + 19;
        })
        .attr("y", function (d) {
            return y2(d.Death2)
        })
        .transition().duration(2500)
        .attr("width", 4)
        .attr("height", function (d) {
            return height - y2(d.Death2);
        })
        .attr("fill", function (d) {

            return "#DB5D5D"
        })
    
    bar2.enter()
        .append("rect")
        .attr("class", "death-3")
        .attr("x", function (d, ) {
            return x2(d.States) + 25;
        })
        .attr("y", function (d) {
            return y2(Math.abs((d.Death2)-(d.Death)))
        })
        .transition().duration(2500)
        .attr("width", 4)
        .attr("height", function (d) {
            return height - y2(Math.abs((d.Death2)-(d.Death)));
        })
        .attr("fill", function (d) {

            return "#4D8EB6"
        })
    
    
}).catch(function (error) {
    console.log(error);
}) //debugging

