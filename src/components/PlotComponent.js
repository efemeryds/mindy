import React, { Component } from 'react'
import * as d3 from 'd3'
import './PlotComponent.css'


class PlotComponent extends Component {
    componentDidMount() {
        const data = [{"time": "2014-05-13T17:00:00.000Z", "mood": 4.0},
         {"time": "2014-05-13T18:00:00.000Z", "mood": 8.0}, 
         {"time": "2014-05-13T20:00:00.000Z", "mood": 5.0},
            {"time": "2014-05-14T18:30:00.000Z", "mood": 10.0}, 
            {"time": "2014-05-14T18:45:00.000Z", "mood": 8.0},
             {"time": "2014-05-14T19:00:00.000Z", "mood": 7.0},
             {"time": "2014-05-15T18:00:00.000Z", "mood": 8.0}, 
         {"time": "2014-05-16T18:15:00.000Z", "mood": 5.0},
            {"time": "2014-05-16T18:30:00.000Z", "mood": 10.0}, 
            {"time": "2014-05-17T18:45:00.000Z", "mood": 8.0},
             {"time": "2014-05-17T19:00:00.000Z", "mood": 7.0}
            
            ]

        this.drawBarChart(data)
    }

    
        
    drawBarChart(data) {
        console.log(data)
        let mainElement = d3.select(this.refs.canvas)

            var margin = {
                top: 30,
                right: 30,
                bottom: 40,
                left: 50
            };
        
            var plotValues = {
                hValue: 280,
                wValue: 450
            };
        
            var height = plotValues.hValue - margin.top - margin.bottom,
                width = plotValues.wValue - margin.left - margin.right;
        
            var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse;
        
            data.forEach(function (d) {
                d.time = parseDate(d.time);
            });
        
            var xExtent = d3.extent(data, function (d) {
                return d.time
            });
        
            var yExtent = d3.extent(data, function (d) {
                return d.mood
            });
        
            var xScale = d3.time.scale()
                .domain(xExtent)
                .range([0, width]);
        
            
            var yScale = d3.scale.linear()
                .domain([0, yExtent[1]])
                .range([height, 0]);
        
            //Line
            var lineGen = d3.svg.line()
        
                .x(function (d) {
                    return xScale(d.time);
                })
                .y(function (d) {
                    return yScale(d.mood);
                })
                ;
        
            var myChart = mainElement.append('svg')
                // .attr('width', width + margin.left + margin.right)
                // .attr('height', height + margin.top + margin.bottom)
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 450 600")
                .classed("svg-content", true)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
              



            myChart.append("path")	
                	// Add the valueline path.
                .datum(data)
                .attr('class', 'line')
                .attr("d", lineGen)
                .attr("data-legend", "pulse")
                .attr('stroke', 'blue')
                .attr('stroke-width', 1)
                .attr('fill', 'none');
        
        
            var legend = mainElement.select('svg').append("g")
                .attr("class", "legend")
                .style("font-size", "12px");
        
            var vGuideScale = d3.scale.linear()
                .domain([0, yExtent[1]])
                .range([height, 0]);
        
            var vAxis = d3.svg.axis()
                .scale(vGuideScale)
                .orient('left')
                .ticks(5);

                mainElement.select('svg').append('g')
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("x", -100)
        .attr("dy", ".51em")
        .attr("font-size", "11px")
        .style("text-anchor", "end")
        .attr("fill", "black")
        .text("Your mood");
        



            var vGuide = mainElement.select('svg').append('g').attr("class", "y axis")
            vAxis(vGuide)
            vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        
        
            var hAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .ticks(d3.time.day, 1);
        
            var hGuide = mainElement.select('svg').append('g').attr("class", "x axis")
            hAxis(hGuide)
            hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
        };

        // const canvasHeight = 200
        // const canvasWidth = 400
        // const scale = 20
        // const svgCanvas = d3.select(this.refs.canvas)
        //     .append('svg')
        //     .attr('width', canvasWidth)
        //     .attr('height', canvasHeight)
        //     .style('border', '1px solid black')
        // svgCanvas.selectAll('rect')
        //     .data(data).enter()
        //         .append('rect')
        //         .attr('width', 40)
        //         .attr('height', (datapoint) => datapoint * scale)
        //         .attr('fill', 'orange')
        //         .attr('x', (datapoint, iteration) => iteration * 45)
        //         .attr('y', (datapoint) => canvasHeight - datapoint * scale)
    
        //         svgCanvas.selectAll('text')
        //         .data(data).enter()
        //             .append('text')
        //             .attr('x', (dataPoint, i) => i * 45 + 10)
        //             .attr('y', (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
        //             .text(dataPoint => dataPoint)
    
            

    render() { return <div className="svg-container" ref="canvas"></div> }
}

export default PlotComponent

