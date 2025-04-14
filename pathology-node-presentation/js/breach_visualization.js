// D3.js visualization for HHS Breach Data
document.addEventListener('DOMContentLoaded', function() {
  // Initialize visualization when the slide becomes active
  Reveal.addEventListener('slidechanged', function(event) {
    if (event.currentSlide.classList.contains('breach-data-slide')) {
      initBreachVisualization();
    }
  });
  
  // Also initialize on load in case we start on this slide
  if (Reveal.getCurrentSlide() && Reveal.getCurrentSlide().classList.contains('breach-data-slide')) {
    initBreachVisualization();
  }
});

// Create tooltip div
const tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

// Main visualization initialization
function initBreachVisualization() {
  // Load the data
  d3.json('assets/data/aggregated_breach_data.json').then(data => {
    // Check which breach slide is active
    const currentSlide = Reveal.getCurrentSlide();
    
    if (currentSlide.id === 'breach-slide-1') {
      // First breach slide - Types and Locations
      initBreachSlide1(data);
    } else if (currentSlide.id === 'breach-slide-2') {
      // Second breach slide - States and Entities
      initBreachSlide2(data);
    }
  }).catch(error => {
    console.error('Error loading breach data:', error);
    d3.selectAll('.breach-charts-container')
      .html('<p class="error">Error loading breach data. Please check the console for details.</p>');
  });
}

// Initialize the first breach slide (Types and Locations)
function initBreachSlide1(data) {
  // Clear any existing visualizations
  d3.select('#breach-charts-1').html('');
  
  // Create the visualization container
  const container = d3.select('#breach-charts-1');
  
  const chartsRow = container.append('div')
    .attr('class', 'breach-row breach-row-full');
  
  // Create the visualizations
  createBreachTypeChart(chartsRow, data.byBreachType);
  createLocationChart(chartsRow, data.byLocation);
}

// Initialize the second breach slide (States and Entities)
function initBreachSlide2(data) {
  // Clear any existing visualizations
  d3.select('#breach-charts-2').html('');
  
  // Create the visualization container
  const container = d3.select('#breach-charts-2');
  
  const chartsRow = container.append('div')
    .attr('class', 'breach-row breach-row-full');
  
  // Create the visualizations
  createStateChart(chartsRow, data.byState);
  createEntityTypeChart(chartsRow, data.byEntityType);
}

// Create breach type pie chart
function createBreachTypeChart(container, breachTypeData) {
  const chartContainer = container.append('div')
    .attr('class', 'chart-container')
    .attr('id', 'breach-type-chart');
  
  chartContainer.append('h3')
    .text('Breaches by Type');
  
  // Take top 5 breach types
  const topBreachTypes = breachTypeData.slice(0, 5);
  
  // Set up dimensions
  const width = 300;
  const height = 250;
  const radius = Math.min(width, height) / 2;
  
  // Create SVG
  const svg = chartContainer.append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
  // Set up color scale
  const color = d3.scaleOrdinal()
    .domain(topBreachTypes.map(d => d.type))
    .range(d3.schemeSet2);
  
  // Create pie chart
  const pie = d3.pie()
    .value(d => d.affected)
    .sort(null);
  
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - 20);
  
  const arcs = svg.selectAll('arc')
    .data(pie(topBreachTypes))
    .enter()
    .append('g')
    .attr('class', 'arc');
  
  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.type))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')
    .style('opacity', 0.8)
    .on('mouseover', function(event, d) {
      // Show tooltip on hover
      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip.html(`<strong>${d.data.type}</strong><br/>${d.data.affected.toLocaleString()} individuals affected`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
      
      // Highlight the current slice
      d3.select(this)
        .transition()
        .duration(200)
        .style('opacity', 1)
        .attr('stroke-width', '3px');
    })
    .on('mouseout', function() {
      // Hide tooltip
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
      
      // Reset highlight
      d3.select(this)
        .transition()
        .duration(200)
        .style('opacity', 0.8)
        .attr('stroke-width', '2px');
    });
  
  // Add legend
  const legend = chartContainer.append('div')
    .attr('class', 'breach-legend');
  
  topBreachTypes.forEach((d, i) => {
    const legendItem = legend.append('div')
      .attr('class', 'legend-item');
    
    legendItem.append('div')
      .attr('class', 'legend-color')
      .style('background-color', color(d.type));
    
    legendItem.append('div')
      .attr('class', 'legend-text')
      .text(d.type)
      .on('mouseover', function() {
        // Highlight the corresponding pie slice
        svg.selectAll('path')
          .filter(path => path.data.type === d.type)
          .transition()
          .duration(200)
          .style('opacity', 1)
          .attr('stroke-width', '3px');
        
        // Show tooltip
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip.html(`<strong>${d.type}</strong><br/>${d.affected.toLocaleString()} individuals affected`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        // Reset highlight
        svg.selectAll('path')
          .transition()
          .duration(200)
          .style('opacity', 0.8)
          .attr('stroke-width', '2px');
        
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
  });
}

// Create location bar chart
function createLocationChart(container, locationData) {
  const chartContainer = container.append('div')
    .attr('class', 'chart-container')
    .attr('id', 'location-chart');
  
  chartContainer.append('h3')
    .text('Breaches by Location');
  
  // Take top 5 locations
  const topLocations = locationData.slice(0, 5);
  
  // Abbreviate "Electronic Medical Records" to "EMR"
  topLocations.forEach(d => {
    if (d.location === "Electronic Medical Record") {
      d.displayName = "EMR";
    } else if (d.location === "Electronic Medical Record, Network Server") {
      d.displayName = "EMR, Network Server";
    } else {
      d.displayName = d.location;
    }
  });
  
  // Set up dimensions - make it larger
  const margin = {top: 20, right: 30, bottom: 40, left: 60};
  const width = 350 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;
  
  // Create SVG
  const svg = chartContainer.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // Set up scales
  const x = d3.scaleBand()
    .domain(topLocations.map(d => d.location))
    .range([0, width])
    .padding(0.3); // Increased padding for wider bars
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(topLocations, d => d.count)])
    .nice()
    .range([height, 0]);
  
  // Set up color scale for different bars
  const colorScale = d3.scaleOrdinal()
    .domain(topLocations.map(d => d.location))
    .range(['#3498db', '#9b59b6', '#2ecc71', '#f1c40f', '#e74c3c']);
  
  // Add axes
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0)) // Remove tick marks
    .selectAll('text')
    .remove(); // Remove axis labels
  
  svg.append('g')
    .call(d3.axisLeft(y));
  
  // Add bars
  svg.selectAll('.bar')
    .data(topLocations)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.location))
    .attr('y', d => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.count))
    .attr('fill', d => colorScale(d.location))
    .style('opacity', 0.8)
    .on('mouseover', function(event, d) {
      // Show tooltip on hover
      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip.html(`<strong>${d.location}</strong><br/>${d.count} breaches<br/>${d.affected.toLocaleString()} individuals affected`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
      
      // Highlight the current bar
      d3.select(this)
        .transition()
        .duration(200)
        .style('opacity', 1)
        .attr('stroke', '#333')
        .attr('stroke-width', 2);
    })
    .on('mouseout', function(event, d) {
      // Hide tooltip
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
      
      // Reset highlight
      d3.select(this)
        .transition()
        .duration(200)
        .style('opacity', 0.8)
        .attr('stroke', 'none')
        .attr('stroke-width', 0);
    });
  
  // Add legend for locations
  const legend = chartContainer.append('div')
    .attr('class', 'breach-legend');
  
  topLocations.forEach((d, i) => {
    const legendItem = legend.append('div')
      .attr('class', 'legend-item');
    
    legendItem.append('div')
      .attr('class', 'legend-color')
      .style('background-color', colorScale(d.location));
    
    legendItem.append('div')
      .attr('class', 'legend-text')
      .text(d.displayName) // Use the abbreviated display name
      .on('mouseover', function() {
        // Find and highlight the corresponding bar
        svg.selectAll('.bar')
          .filter(bar => bar.location === d.location)
          .transition()
          .duration(200)
          .style('opacity', 1)
          .attr('stroke', '#333')
          .attr('stroke-width', 2);
        
        // Show tooltip
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip.html(`<strong>${d.location}</strong><br/>${d.count} breaches<br/>${d.affected.toLocaleString()} individuals affected`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        // Reset highlight
        svg.selectAll('.bar')
          .transition()
          .duration(200)
          .style('opacity', 0.8)
          .attr('stroke', 'none')
          .attr('stroke-width', 0);
        
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
  });
}

// Create state map chart
function createStateChart(container, stateData) {
  const chartContainer = container.append('div')
    .attr('class', 'chart-container')
    .attr('id', 'state-chart');
  
  chartContainer.append('h3')
    .text('Breaches by State');
  
  // Set up dimensions
  const width = 400;
  const height = 280;
  
  // Create SVG
  const svg = chartContainer.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Create a map of state data for easy lookup
  const stateDataMap = {};
  stateData.forEach(d => {
    stateDataMap[d.state] = d;
  });
  
  // Set up color scale
  const colorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain([0, d3.max(stateData, d => d.affected)]);
  
  // Load US states TopoJSON
  d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(us => {
    // Convert TopoJSON to GeoJSON
    const states = topojson.feature(us, us.objects.states).features;
    
    // Set up projection
    const projection = d3.geoAlbersUsa()
      .fitSize([width, height], topojson.feature(us, us.objects.states));
    
    const path = d3.geoPath()
      .projection(projection);
    
    // Draw states
    svg.selectAll('.state')
      .data(states)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
      .attr('fill', d => {
        const stateAbbr = getStateAbbreviation(d.properties.name);
        return stateDataMap[stateAbbr] ? colorScale(stateDataMap[stateAbbr].affected) : '#eee';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', function(event, d) {
        const stateAbbr = getStateAbbreviation(d.properties.name);
        const stateData = stateDataMap[stateAbbr];
        
        // Highlight the state
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke', '#333')
          .attr('stroke-width', 2);
        
        // Show tooltip with affected count
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        
        if (stateData) {
          tooltip.html(`<strong>${d.properties.name} (${stateAbbr})</strong><br/>
                      ${stateData.count} breaches<br/>
                      ${stateData.affected.toLocaleString()} individuals affected`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        } else {
          tooltip.html(`<strong>${d.properties.name}</strong><br/>No breach data reported`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        }
      })
      .on('mouseout', function() {
        // Reset highlight
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5);
        
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
    
    // Add legend
    const legendWidth = 180;
    const legendHeight = 15;
    
    const legend = svg.append('g')
      .attr('transform', `translate(${(width - legendWidth) / 2}, ${height - 30})`);
    
    const legendScale = d3.scaleLinear()
      .domain(colorScale.domain())
      .range([0, legendWidth]);
    
    const legendAxis = d3.axisBottom(legendScale)
      .ticks(4)
      .tickSize(4)
      .tickFormat(d => d3.format('.1s')(d));
    
    legend.append('g')
      .call(legendAxis)
      .attr('transform', `translate(0, ${legendHeight})`)
      .style('font-size', '8px');
    
    const defs = svg.append('defs');
    
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient');
    
    linearGradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => d)
      .attr('stop-color', d => colorScale(d * colorScale.domain()[1]));
    
    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)');
  });
}

// Create entity type chart
function createEntityTypeChart(container, entityTypeData) {
  const chartContainer = container.append('div')
    .attr('class', 'chart-container')
    .attr('id', 'entity-type-chart');
  
  chartContainer.append('h3')
    .text('Breaches by Entity Type');
  
  // Set up dimensions
  const margin = {top: 20, right: 30, bottom: 40, left: 60};
  const width = 320 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;
  
  // Create SVG
  const svg = chartContainer.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // Set up scales
  const x = d3.scaleBand()
    .domain(entityTypeData.map(d => d.type))
    .range([0, width])
    .padding(0.3);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(entityTypeData, d => d.affected)])
    .nice()
    .range([height, 0]);
  
  // Add axes
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0)) // Remove tick marks
    .selectAll('text')
    .remove(); // Remove axis labels
  
  svg.append('g')
    .call(d3.axisLeft(y).tickFormat(d => d3.format('.1s')(d)));
  
  // Add bars
  svg.selectAll('.bar')
    .data(entityTypeData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.type))
    .attr('y', d => y(d.affected))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.affected))
    .attr('fill', '#e74c3c')
    .style('opacity', 0.8)
    .on('mouseover', function(event, d) {
      // Show tooltip on hover
      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip.html(`<strong>${d.type}</strong><br/>${d.count} breaches<br/>${d.affected.toLocaleString()} individuals affected`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
      
      // Highlight the current bar
      d3.select(this)
        .transition()
        .duration(200)
        .style('opacity', 1)
        .attr('fill', '#c0392b');
    })
    .on('mouseout', function() {
      // Hide tooltip
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
      
      // Reset highlight
      d3.select(this)
        .transition()
        .duration(200)
        .style('opacity', 0.8)
        .attr('fill', '#e74c3c');
    });
  
  // Add legend for entity types
  const legend = chartContainer.append('div')
    .attr('class', 'breach-legend');
  
  entityTypeData.forEach((d, i) => {
    const legendItem = legend.append('div')
      .attr('class', 'legend-item');
    
    legendItem.append('div')
      .attr('class', 'legend-color')
      .style('background-color', '#e74c3c');
    
    legendItem.append('div')
      .attr('class', 'legend-text')
      .text(d.type)
      .on('mouseover', function() {
        // Find and highlight the corresponding bar
        svg.selectAll('.bar')
          .filter(bar => bar.type === d.type)
          .transition()
          .duration(200)
          .style('opacity', 1)
          .attr('fill', '#c0392b');
        
        // Show tooltip
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip.html(`<strong>${d.type}</strong><br/>${d.count} breaches<br/>${d.affected.toLocaleString()} individuals affected`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        // Reset highlight
        svg.selectAll('.bar')
          .transition()
          .duration(200)
          .style('opacity', 0.8)
          .attr('fill', '#e74c3c');
        
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
  });
}

// Add controls for switching views
function addViewControls(container, data) {
  const controls = container.append('div')
    .attr('class', 'breach-controls');
  
  controls.append('button')
    .attr('class', 'breach-control-btn active')
    .text('By Count')
    .on('click', function() {
      d3.selectAll('.breach-control-btn').classed('active', false);
      d3.select(this).classed('active', true);
      updateChartMetric('count');
    });
  
  controls.append('button')
    .attr('class', 'breach-control-btn')
    .text('By Affected')
    .on('click', function() {
      d3.selectAll('.breach-control-btn').classed('active', false);
      d3.select(this).classed('active', true);
      updateChartMetric('affected');
    });
  
  // Function to update charts based on selected metric
  function updateChartMetric(metric) {
    // Implementation would update all charts to show count or affected
    // This would require recreating the charts with the new metric
    console.log(`Switching to ${metric} view`);
    // For simplicity, we'll just reload the visualization
    initBreachVisualization();
  }
}

// Helper function to convert state names to abbreviations
function getStateAbbreviation(stateName) {
  const stateMap = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District of Columbia': 'DC'
  };
  
  return stateMap[stateName] || stateName;
}
