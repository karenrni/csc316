console.log(attractionData);

attractionData.forEach(attraction => {
    if (attraction.visitors > 10000000){
      console.log(attraction.name)
    }
});

// 4 & 5
let filteredData  = attractionData.filter(function(attraction) {
    return attraction.Visitors > 10000000;
});
console.log(filteredData);

filteredData.sort(function(a, b) {
    return b.Visitors - a.Visitors;
});
console.log(filteredData);

let sortedData = filteredData.map(function(attraction) {
    return attraction;
}).sort(function(a, b) {
    return b.Visitors - a.Visitors;
});
console.log(sortedData);




