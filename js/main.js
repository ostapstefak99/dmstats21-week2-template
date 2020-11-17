
// PART I: Manipulating the DOM

// Step 1: Select the body of the HTML document and append an h2 element
// with the text "We're learning D3!"

d3.select("body").append("h2").text("We're learning D3!");

// Step 2: Select the body again and append a div with the id dynamic-content

d3.select("body").append("div").attr("id", "dynamic-content");

// Step 3: Select the div you just created (using its id!) and append a
// paragraph with some text of your choice (you can also style this if you want!)

d3.select("#dynamic-content").append("p").text("Hello!");

// PART II: Binding data

var schools = [
    { name: "Harvard", signups: 4695, region: "Northeast" },
    { name: "UW Madison", signups: 4232, region: "Midwest" },
    { name: "WashU", signups: 3880, region: "Midwest" },
    { name: "Brown", signups: 2603, region: "Northeast" },
    { name: "UChicago", signups: 2088, region: "Midwest" },
    { name: "UW", signups: 2042, region: "West" }
];

// Step 1: Append a new SVG element to HTML document with D3
// (width = 500px, height = 500px)

var svg = d3.select("#dynamic-content").append("svg").attr("width", 500).attr("height", 500);


// Step 2: Append a new SVG circle for every object in the schools array

svg.selectAll("circle").data(schools).enter().append("circle");


// Step 3: Define the following dynamic properties for each circle:
//   - Position: set the x/y coordinates and make sure that the circles don’t overlap each other
//   - Radius: schools with over 3500 signups should be twice as big as schools with less than 2500 signups
//   - Colors: use a different color for each region
//   - Border: add a border to every circle (SVG property: stroke)

svg.selectAll("circle")
    .attr("cx", function(d, index) {return (index*30 + 50)})
    .attr("cy", function(d, index) {return (index*40 + 50)})
    .attr("r", function (d) {if (d.signups>3500) {return 20} else {return 10}})
    .attr("fill", function (d)
    {if (d.name === "Harvard")
        {return "red"}
    else if (d.name === "UW Madison")
        {return "black"}
    else if (d.name === "WashU")
         {return "blue"}
    else if (d.name === "Brown")
        {return "brown"}
    else if (d.name === "UChicago")
        {return "yellow"}
    else
        {return  "orange"}})
    .attr("stroke", "black")

// PART III: Loading data

// Step 1: Use D3 to load the CSV file "cities.csv". then, print the data
// to the console and inspect it in your browser

d3.csv("data/cities.csv", function (data) {
    console.log(data)
});


// Step 2: Filter the dataset: Filter the dataset to only include cities that are
// part of the EU.

var europeanUnion = ["Austria", "Belgium", "Bulgaria", "Croatia",
    "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
    "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania",
    "Slovakia", "Slovenia", "Spain", "Sweden", "United Kingdom"];


var rowConverter = function (row) {
    if (europeanUnion.includes(row.country)) {
        return row
    }
}

d3.csv("data/cities.csv", rowConverter, function (data) {
    console.log(data)
})

// Step 3: Append a new paragraph to your HTML document that shows the
// number of EU countries

d3.select("#dynamic-content").append("h2").text("Number of EU countries: " + (europeanUnion.length).toString(10));


// Step 4: Prepare the data - each value of the CSV file is stored as a string,
// but we want numerical values to be numbers.


var rowConverter_2 = function (row) {
    if (europeanUnion.includes(row.country)) {
        return {
            city : row.city,
            country : row.country,
            eu : row.eu,
            population : parseFloat(row.population),
            x : parseFloat(row.x),
            y : parseFloat(row.y)
        }
    }
};

d3.csv("data/cities.csv", rowConverter_2, function (data) {
    console.log(data)
});


// Step 5: Draw an SVG circle for each city in the filtered dataset
//   - All the elements (drawing area + circles) should be added dynamically with D3
//   - SVG container: width = 700px, height = 550px
//   - Use the x/y coordinates from the dataset to position the circles

var svg2 = d3.select("#dynamic-content").append("svg").attr("width", 700).attr("height", 550);

d3.csv("data/cities.csv", rowConverter_2, function (data) {
    svg2.selectAll("circle").data(data).enter().append("circle")
        .attr("cx", function (data) {return (data.x)})
        .attr("cy", function (data) {return (data.y)})
        .attr("r", function (d) {
            if (d.population<1000000) {
                return 4
            } else {
                return 8
            }
        })
        .attr("fill", "purple")
        .attr("stroke", "white");
    svg2.selectAll("text").data(data).enter().append("text")
        .attr("x", function (data) {return (data.x)})
        .attr("y", function (data) {return (data.y-10)})
        .attr("opacity", function (data) {
            if (data.population > 1000000) {
                return 1
            } else {
                return 0
            }
        })
        .text(function(data) {return data.city})
        .attr("class", "city-label")
});


// Step 6: Change the radius of the circle to be data-dependent
//   - The radius should be 4px for cities with population less than one million
//   - The radius for all other cities should be 8px

//DONE ABOVE


// Step 7: Add labels with the names of the European cities
//   - Use the SVG text element
//   - All the elements should be the class of city-label
//   - The labels should only be visible for cities with population greater
//   than one million (use opacity)

//DONE ABOVE


// Step 8: Styling - in the external stylesheet, do some styling
//   - Make sure to at least style city-label with font size = 11 px and
//   text anchor = middle

//SEE STYLESHEET

// Optional bonus step: add tooltips displaying the country for each city
// https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
