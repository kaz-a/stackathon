import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { fetchWords, fetchTranscripts } from '../store';
import * as d3 from "d3";

class Analyze extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { words, texts } = this.props;
    const lastText = texts[texts.length-1].text;
    const textArr = lastText.split(' ');

    let data = [];
    textArr.forEach(text => {
      let obj = {}
      obj['word'] = text;
      obj['count'] = 1;
      data.push(obj)
    })

    const nestedData = d3.nest()
      .key(function(d) { return d.word; })
      .rollup(function(v) { return {
        totalCount: d3.sum(v, function(d) { return +d.count; })
      }})
      .entries(data);

    // console.log(nestedData);

    const positiveWords = words.filter(word => {
      return word.category === "positive";
    }).map(word => {
      return word.word
    });

    const negativeWords = words.filter(word => {
      return word.category === "negative";
    }).map(word => {
      return word.word
    });

    const margin = {top: 50, right: 10, bottom: 100, left: 60};
    const width = 600 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;

    let x = d3.scaleBand().range([0,width]);
    let y = d3.scaleLinear().range([height,0]); 
    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisLeft().scale(y).ticks(6);

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let tooltip = d3.select(".chart").append("div")   
      .attr("class", "tooltip").style("opacity", 0);
        
    const svg = d3.select(".chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(nestedData.map(function(d) { return d.key }));
    y.domain([0, d3.max(nestedData, function(d) { return d.value.totalCount; })]);

    svg.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 8)
      .attr("x", 3)
      .attr("dy", "-0.2em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    const y_axis = svg.append("g")
      .attr("class", "axis axis-y")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", "0.5em")
      .attr("text-anchor", "end")
      .text("Word Frequency")
      .style("fill", "black");

    const bars = svg.append("g").attr("class", "bars")

    bars.selectAll(".bar")
      .data(nestedData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("y", function(d) { return y(d.value.totalCount); })
      .attr("width", 10)
      .attr("height", function(d) { return height - y(d.value.totalCount); })
      .style("fill", function(d) { return negativeWords.indexOf(d.key) >= 0 ? "#d9534f" : positiveWords.indexOf(d.key) >= 0 ? "#5cb85c" : "#ccc" })
      .style("stroke", "#fff")
      .on("mouseover", function(d) {
        d3.select(this).style("opacity", 0.8)
        tooltip.text("'" + d.key + "' was said " + d.value.totalCount + " times")
          .style("opacity", 0.8)
          .style("left", (d3.event.pageX - 700) + "px") 
          .style("top", (d3.event.pageY -100) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.style("opacity", 0);
          d3.select(this).style("opacity", 1);
      });
        

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            <h1>Analysis</h1>
            Summary of your speech patterns 
          </div>

          <div className="col-md-1"></div>

          <div className="col-md-8">          
            <blockquote className="blockquote">
               <p className="mb-0"><span className="quote">"</span>{ lastText }<span className="quote">"</span></p>
            </blockquote>   
            <div className="chart"></div>               
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ words, texts }) => {
  return {
    words,
    texts
  }
}

export default connect(mapStateToProps, null)(Analyze);