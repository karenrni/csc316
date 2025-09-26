d3.csv("data/cities.csv", d => {
    d.x = +d.x;
    d.y = +d.y;
    d.population = +d.population;
    return d;
  }).then(data => {

    const eu_cities = data.filter(d => d.eu === "true");
  
    d3.select("body")
      .append("p")
      .text(`Number of EU cities: ${eu_cities.length}`); // not sure if its cities or countries
  
    const svg = d3.select("body")
      .append("svg")
      .attr("width", 700)
      .attr("height", 550);
  
    svg.selectAll("circle")
      .data(eu_cities)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.population < 1000000 ? 4 : 8)
  
    svg.selectAll("text")
      .data(eu_cities.filter(d => d.population >= 1000000))
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("class", "city-label")
      .text(d => d.city);
  });
  