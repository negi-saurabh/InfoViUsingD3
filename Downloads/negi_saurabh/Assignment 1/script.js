
//document.getElementById("demo").innerHTML = "Hello JavaScript!";
var width = 1000;
var height = 500;
										
var chart_height = 400,
	chart_width = 700;

debugger
var csv_data;
const padding = {top: 50, right: 20, bottom: 60, left: 60};
d3.csv("meteo.csv")
	.then(function(data){
	  data.forEach(function(d) {
    d.year = +d.year;
		d.month = +d.month;
		d.day = +d.day;
		d.temperature = +d.temperature;
		csv_data = data;
	});

	var dataGroupByMonth = d3.nest()
	.key(function(d){return d.year; }) 
	.key(function(d) {return d.month; })
	.rollup(function(v) { return d3.mean(v, function(d) { return d.temperature; }); })
	.entries(csv_data);
	
	console.log(dataGroupByMonth);

	var months = [];
	for (var i=0; i < dataGroupByMonth[0].values.length; i++) {
		months.push(dataGroupByMonth[0].values[i].key);
	};

	function barChart(data, year){
			var tempArray = [];
			var barData = [];
			// for (var i=0; i < data.length; i++) {
			// 	barData.push(data[i].values);
			// };

			for (var i=0; i < data.length; i++) {
				if(parseInt(data[i].key)==year){
					barData.push(data[i].values);
					for (var j=0; j < data[0].values.length; j++) {
						tempArray.push(data[0].values[j].value);
					}
					break;
				}
			};

			var Xdatas = barData[0].map(function (d) {
				return d.key;
			});    
			var values = barData[0].map(function (d) {
				return d.value;
			});


			var xScale = d3.scaleBand().domain(Xdatas).rangeRound([0, chart_width]).padding(0.1),
				yScale = d3.scaleLinear().domain([0, d3.max(values)]).rangeRound([chart_height, 0]);
				
			var svgContainer = d3.select('#bar').append('svg')
				.attr('width', width + padding.left + padding.right)
				.attr('height', height + padding.top + padding.bottom);

			var chart_group = svgContainer.append("g")
				.attr("id", "chart_group")
				.attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');
			
			chart_group.attr('class', 'headerText')
				.append('text')
				.attr("id", "titleBar")
				.attr('transform', 'translate(' + (chart_width / 2) + ',' + (-padding.top / 2) + ')')
				.attr('text-anchor', 'middle')
				.attr('font-weight', 600)
				.text('Average Temperature Per Month In Year '+year);
				
			chart_group.append('g')
				.attr('class', 'axisX')
				.attr("id", "xaxis")
				.attr('transform', 'translate(0,' + chart_height + ')')
				.call(d3.axisBottom(xScale))
				.attr('font-weight', 'bold');
		
			chart_group.append('g')
				.attr('class', 'axisY')
				.attr("id", "yaxis")
				.call(d3.axisLeft(yScale).ticks(10));

			chart_group.selectAll('.bar')
				.data(barData[0])
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr("x", function(d) { return xScale(d.key); })
				.attr("y", function(d) { return yScale(d.value); })
				.attr("width", xScale.bandwidth())
				.attr("height", function(d) { return chart_height - yScale(d.value); });

			chart_group.selectAll(".bartext")
				.data(barData[0])
				.enter()
				.append("text")
				.attr("class", "bartext")
				.attr("x", function(d) { return xScale(d.key) + (xScale.bandwidth()/2); })
				.attr("y", function(d) { return yScale(d.value); })
				.style("text-anchor", "middle")
				.text(function (d) {
					return Math.round(d.value*100)/100;
				});
			
			d3.select("#next").on("click",function(){
					if(year<2015){
						d3.select("svg").remove();
						year++;
						data=dataGroupByMonth;
						barChart(data, year);    
					}            
				})

			d3.select("#previous").on("click",function(){
					if(year>2011){
						d3.select("svg").remove();
						year--;
						data=dataGroupByMonth;
						barChart(data, year);    
					}            
				})
		} 

		var year = 2011; // setting the default values
		barChart(dataGroupByMonth, year);
 });

