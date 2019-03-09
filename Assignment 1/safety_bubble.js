function barChart(district, year){

    d3.csv("ams_safety_index_districts.csv",function(d){
        if(d.district_1_in_area==district || d.district_2_in_area==district || d.district_3_in_area==district){
        
          // var x = new Array();
          // x[10] = new Array();
          if(parseInt(year)==2014)
              {
          
                // x[0].push({LABEL: "avoidance", value: +d['avoidance_2014']})
                // x[1].push({LABEL: "crime index", value: +d['avoidance_2014']})
                // x[2].push({LABEL: "decay", value: +d['avoidance_2014']})
                // x[3].push({LABEL: "nuisance", value: +d['nuisance_2014']})

                return{
                  "avoidance" : d.avoidance_2014,
                  "crime index": d.crime_index_2014,
                  "decay": d.decay_2014,
                  "fear of crime": d.fear_of_crime_2014,
                  "feelings of insecurity": d.feelings_of_insecurity_2014,
                  "high impact crime": d.high_impact_crime_2014,
                  "high volume crime": d.high_volume_crime_2014,
                  "nuisance": d.nuisance_2014,
                  "nuisance by persons": d.nuisance_by_persons_2014,
                  "risk perception": d.risk_perception_2014,
                  "safety index" : d.safety_index_2014
                  
                }
              }
          else if(parseInt(year)==2015)
          {
            return {
                  "avoidance" : d.avoidance_2015,
                  "crime index": d.crime_index_2015,
                  "decay": d.decay_2015,
                  "fear of crime": d.fear_of_crime_2015,
                  "feelings of insecurity": d.feelings_of_insecurity_2015,
                  "high impact crime": d.high_impact_crime_2015,
                  "high volume crime": d.high_volume_crime_2015,
                  "nuisance": d.nuisance_2015,
                  "nuisance by persons": d.nuisance_by_persons_2015,
                  "risk perception": d.risk_perception_2015,
                  "safety index" : d.safety_index_2015
            }
          }
          else if(parseInt(year)==2016)
          {
            // x[0].push({LABEL: "avoidance", value: +d['avoidance_2014']})
            // x[1].push({LABEL: "crime index", value: +d['avoidance_2014']})
            // x[2].push({LABEL: "decay", value: +d['avoidance_2014']})
            // x[3].push({LABEL: "nuisance", value: +d['nuisance_2014']})

            return {
                  "avoidance" : d.avoidance_2016,
                  "crime index": d.crime_index_2016,
                  "decay": d.decay_2016,
                  "fear of crime": d.fear_of_crime_2016,
                  "feelings of insecurity": d.feelings_of_insecurity_2016,
                  "high impact crime": d.high_impact_crime_2016,
                  "high volume crime": d.high_volume_crime_2016,
                  "nuisance": d.nuisance_2016,
                  "nuisance by persons": d.nuisance_by_persons_2016,
                  "risk perception": d.risk_perception_2016,
                  "safety index" : d.safety_index_2016
                  
            }
          }
          else if(parseInt(year)==2017)
          {
            return {
                  "avoidance" : d.avoidance_2017,
                  "crime index": d.crime_index_2017,
                  "decay": d.decay_2017,
                  "fear of crime": d.fear_of_crime_2017,
                  "feelings of insecurity": d.feelings_of_insecurity_2017,
                  "high impact crime": d.high_impact_crime_2017,
                  "high volume crime": d.high_volume_crime_2017,
                  "nuisance": d.nuisance_2017,
                  "nuisance by persons": d.nuisance_by_persons_2017,
                  "risk perception": d.risk_perception_2017,
                  "safety index" : d.safety_index_2017
            }
          }
        }
    })
    	.then(function(csv_data){
        debugger
        console.log(csv_data);

        var out = Object.keys(csv_data[0]).map(function(data){
          return [data,csv_data[0][data]];
        });
        console.log(out);
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 700 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
        

        // append the svg object to the body of the page
        var svg = d3.select("#bubble-chart")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var div = d3.select("body").append("div")	
          .attr("class", "tooltip")				
          .style("opacity", 0);
    
      
        svg.append("text")
          .attr("x", 80)   
          .attr("y", 20 )
          .attr("dy", ".5em" )
          .attr("text-anchor", "start")  
          .style("font-size", "15px")  
          .style("font-weight", "bold")
          .text("Saferty Index parameters in "+district +" for " +year)
    
        var pack = d3.pack()
            .size([width-150, height])
            .padding(1.5);
        
        var color = d3.scaleOrdinal()
            .domain(out.map(function(d){ return d[0] ;}))
            .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6',
            '#ffe9a8','#b9bfe3','#fddaec','#cccccc','#ccbccc']);
            
        var root = d3.hierarchy({children: out})
                .sum(function(d) { return d[1]; })

        var node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.append("circle")
            .attr("id", function(d) { return d.id; })
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d) { return color(d[0]); })
            .on("mouseover", function(d) {		
                div.transition()		
                  .duration(200)		
                  .style("opacity", .9);	
                
                var duration = 300;
                  out.forEach(function(d, i) {
                    console.log(d[1]);
                    node.transition().duration(duration).delay(i * duration)
                        .attr("r", d[1]);
                });
                    
                div.html(d[0] + ": <br>"+d[1]  )	
                      .style("left", (d3.event.pageX) + "px")		
                      .style("top", (d3.event.pageY - 28) + "px");	
            })					
              .on("mouseout", function(d) {		
                div.transition()		
                .duration(500)		
                .style("opacity", 0);	
            });
          
          
        node.append("text")
            .text(function(d) {
          if (d[0] > 748|| d[0] == "Other" || d[0] == "Fire"){
            return d[0];
          }
          return "";});

        var legend = svg.selectAll(".legend")
            .data(out).enter()
            .append("g")
            .attr("class","legend")
            .attr("transform", "translate(" + 780 + "," + 120+ ")");
              

            legend.append("rect")
              .attr("x", 0) 
              .attr("y", function(d, i) { return 20 * i; })
              .attr("width", 15)
              .attr("height", 15)
              .style("fill", function(d) { return color(d[0])});
            

              legend.append("text")
              .attr("x", 25) 
                .attr("text-anchor", "start")
              .attr("dy", "1em") 
              .attr("y", function(d, i) { return 20 * i; })
              .text(function(d) {return d[0];})
              .attr("font-size", "12px"); 
            
                
              legend.append("text")
              .attr("x",31) 
              .attr("dy", "-.2em")
              .attr("y",-10)
              .text("Call Type")
              .attr("font-size", "17px"); 
    });
};

  barChart("Houthavens", 2015);
