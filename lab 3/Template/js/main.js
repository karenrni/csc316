
// SVG Size
let width = 700,
	height = 500;

// Load CSV file
d3.csv("data/wealth_health_data.csv", row => {

	console.log(row)
	// TODO: convert values where necessary in this callback (d3.csv reads the csv line by line. In the callback,
	//  you have access to each line (or row) represented as a js object with key value pairs. (i.e. a dictionary).
	row.Income = +row.Income;
    row.LifeExpectancy = +row.LifeExpectancy;
    row.Population = +row.Population;
	return row;
}).then( data => {
	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)

	// TODO: sort the data
	data.sort((a, b) => b.Income - a.Income);
	// TODO: Call your separate drawing function here, i.e. within the .then() method's callback function
	drawChart(data);
});

// TODO: create a separate function that is in charge of drawing the data, which means it takes the sorted data as an argument

function drawChart(data) {
//
	let svg = d3.select("#chart-area")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	let incomeScale = d3.scaleLinear()
		.domain([d3.min(data, d => d.Income), d3.max(data, d => d.Income)])
		.range([0, width]);

	let lifeExpectancyScale = d3.scaleLinear()
		.domain([d3.min(data, d => d.LifeExpectancy), d3.max(data, d => d.LifeExpectancy)])
		.range([height, 0]);

	
		svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => incomeScale(d.Income))
        .attr("cy", d => lifeExpectancyScale(d.LifeExpectancy))
        .attr("r", 5)
        .attr("fill", "blue");

    let xAxis = d3.axisBottom(incomeScale);
    let yAxis = d3.axisLeft(lifeExpectancyScale);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .text("Income (GDP per Capita)");

    svg.append("text")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Life Expectancy");
}


// let promiseObject = d3.csv("data/wealth_health_data.csv")

// console.log(promiseObject)