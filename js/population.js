d3.csv("data/ChinaPopulation.csv").then(function (data) {
//    console.log(data);
    //conver string to int
    data.forEach(function (d) {
        d.TotalPopulation = +d.TotalPopulation
        d.BirthRate = +d.BirthRate
        d.DeathRate = +d.DeathRate
        d.NaturalGrowthRate = +d.NaturalGrowthRate
    })

    var margin = {
        top: 10,
        right: 50,
        bottom: 50,
        left: 35
    };

    var width = 1180 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    //=========================chart-1=====================
    var svg = d3.select('#first-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var bar = g.selectAll("rect")
        .data(data);

    //scale
    var min = d3.min(data, function (d) {
        return d.TotalPopulation;
    })
    var max = d3.max(data, function (d) {
        return d.TotalPopulation;
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
        .style("font-size", "14px")

    //y-axis
    var yAxisCall = d3.axisLeft(y);
    g.append('g')
        .attr("class", "y-axis")
        .transition().duration(3500)
        .call(yAxisCall)

    //enter data
    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Year) + 7;
        })
        .attr("y", function (d) {
            return y(d.TotalPopulation)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y(d.TotalPopulation);
        })
        .attr("fill", function (d) {
            if (d.Year == "1959") {
                return "#DB5D5D"
            } else if (d.Year == "1960") {
                return "#DB5D5D"
            } else if (d.Year == "1961") {
                return "#DB5D5D"
            } else {
                return "#A4ADD9"
            }
        })
        .style("opacity", function(d){
            if (d.Year == "1959"||d.Year == "1960"|| d.Year == "1961") {
                return "1.0"
            } else{
                return "0.3"
            }
        })

    //========================chart-2===========================
    //chart-2
    let svg2 = d3.select('#second-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    let g2 = svg2.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    let bar2 = g2.selectAll("rect")
        .data(data);

    //scale
    let min2 = d3.min(data, function (d) {
        return d.BirthRate;
    })
    let max2 = d3.max(data, function (d) {
        return d.BirthRate;
    })

    let y2 = d3.scaleLinear()
        .domain([0, max2])
        .range([height, 0]);

    let x2 = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.Year
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
        .attr("class", "bar2")
        .attr("x", function (d, ) {
            return x2(d.Year) + 5;
        })
        .attr("y", function (d) {
            return y2(d.BirthRate)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y2(d.BirthRate);
        })
        .attr("fill", function (d) {

            return "#79C788"
        })
        .style("opacity", function(d){
            if(d.DeathRate-d.BirthRate<0){
                return "0.3"
            }
        })

    bar2.enter()
        .append("rect")
        .attr("class", "bar2")
        .attr("x", function (d, ) {
            return x2(d.Year) + 11;
        })
        .attr("y", function (d) {
            return y2(d.DeathRate)
        })
        .transition().duration(2500)
        .attr("width", 6)
        .attr("height", function (d) {
            return height - y2(d.DeathRate);
        })
        .attr("fill", function (d) {
            return "#DB5D5D"
        })
        .style("opacity", function(d){
            if(d.DeathRate-d.BirthRate<0){
                return "0.3"
            }
        })


    //=================chart-three====================
    let svg3 = d3.select('#third-chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    let g3 = svg3.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    let min3 = d3.min(data, function (d) {
        return d.NaturalGrowthRate;
    })
//    console.log(min3)
    let max3 = d3.max(data, function (d) {
        return d.NaturalGrowthRate;
    })
//    console.log(max3)


    //scale here
    let y3 = d3.scaleLinear()
                .domain([0, max3])
                .range([0, height]);
    let y3_axis = d3.scaleLinear()
                    .domain([min3, max3])
                    .range([height - y3(min3), 0 ]);

    let x3 = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.Year
        }))
        .range([0, width])
    
    let bar3 = g3.selectAll("rect")
        .data(data);
    
    //axis
    let yAxisCall3 = d3.axisLeft(y3_axis);
    g3.append('g')
        .attr("class", "y-axis")
        .transition().duration(3500)
        .call(yAxisCall3)

    var xAxisCall3 = d3.axisBottom(x3);
    g3.append('g')
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .transition().duration(3500)
        .call(xAxisCall3)
        .selectAll("text")
        .style("display", 'none')
    
    bar3.enter()
        .append("rect")
            .attr("class","bar3")
            .attr("x", function(d, i) { 
                return x3(d.Year) + 7; 
            })
            .attr("y", function(d, i) { 
                return height - Math.max(0, y3(d.NaturalGrowthRate));
            })
            .attr("height", function(d) { 
                return Math.abs(y3(d.NaturalGrowthRate));
            })
            .attr("width", 17)
            .attr("fill", function (d) {
                if (d.Year == "1960") {
                    return "#DB5D5D"
                } else if (d.Year == "1961") {
                    return "#DB5D5D"
                }else{
                    return "#22BCBC"    
                }
                
            })
    
    //tooptip
    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);
    
    svg3.append("rect")
            .attr("class", "event")
            .attr("x",230)
            .attr("y",20)
            .attr("height",10)
            .attr("width",30)
            .attr("fill", "#DB5D5D")
    
    svg3.append("text")
        .attr("class", "event")
        .attr("x",110)
        .attr("y",15)
        .attr("dx", "-0.35em")
        .attr("fill", "#ffffff")
        .text("Great China Famine")

        
            
    




}).catch(function (error) {
    console.log(error);
}) //debugging