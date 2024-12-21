// Visualization factory object
const D3Visualizations = {
    // Bar Chart
    createBarChart: function(containerId, data) {
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const container = d3.select(`#${containerId}`);
        const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
        const height = container.node().getBoundingClientRect().height - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.category))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .style("fill", "steelblue")
            .style("opacity", 0.8)
            .on("mouseover", function() {
                d3.select(this).style("opacity", 1);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 0.8);
            });

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));
    },

    // Line Chart
    createLineChart: function(containerId, data) {
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const container = d3.select(`#${containerId}`);
        const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
        const height = container.node().getBoundingClientRect().height - margin.top - margin.bottom;

        const svg = container.append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y))
            .range([height, 0]);

        const line = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y))
            .curve(d3.curveMonotoneX);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));
    },

    // Pie Chart
    createPieChart: function(containerId, data) {
        const container = d3.select(`#${containerId}`);
        const width = container.node().getBoundingClientRect().width;
        const height = container.node().getBoundingClientRect().height;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const svg = container.append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .append("g")
            .attr("transform", `translate(${width/2},${height/2})`);

        const pie = d3.pie()
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius - 20);

        const arcs = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .style("fill", (d, i) => color(i))
            .style("opacity", 0.8)
            .on("mouseover", function() {
                d3.select(this).style("opacity", 1);
            })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 0.8);
            });

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.category)
            .style("fill", "white")
            .style("font-size", "12px");
    }
};

// Sample data
const barData = [
    {category: "A", value: 10},
    {category: "B", value: 20},
    {category: "C", value: 15},
    {category: "D", value: 25},
    {category: "E", value: 30}
];

const lineData = [
    {x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7},
    {x: 3, y: 5}, {x: 4, y: 3}, {x: 5, y: 3.5},
    {x: 6, y: 4}, {x: 7, y: 6}, {x: 8, y: 9},
    {x: 9, y: 8}
];

const pieData = [
    {category: "A", value: 30},
    {category: "B", value: 15},
    {category: "C", value: 45},
    {category: "D", value: 10}
];

// Initialize visualizations
D3Visualizations.createBarChart('bar-chart', barData);
D3Visualizations.createLineChart('line-chart', lineData);
D3Visualizations.createPieChart('pie-chart', pieData);

// Make visualizations responsive
window.addEventListener('resize', function() {
    // Clear existing visualizations
    d3.selectAll('.visualization-container').html('');
    
    // Recreate visualizations
    D3Visualizations.createBarChart('bar-chart', barData);
    D3Visualizations.createLineChart('line-chart', lineData);
    D3Visualizations.createPieChart('pie-chart', pieData);
});
