// Script to process and aggregate breach data
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Input and output file paths
const inputFile = path.join(__dirname, '../../data/breach_report.csv');
const outputFile = path.join(__dirname, '../assets/data/aggregated_breach_data.json');

// Create directory if it doesn't exist
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Data structures for aggregation
const byState = {};
const byBreachType = {};
const byLocation = {};
const byEntityType = {};
const byYear = {};
const stateBreachTypeCounts = {};

// Process the CSV file
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    // Skip rows with missing data
    if (!row.State || !row['Type of Breach'] || !row['Location of Breached Information'] || 
        !row['Covered Entity Type'] || !row['Breach Submission Date'] || !row['Individuals Affected']) {
      return;
    }

    const state = row.State.trim();
    const breachType = row['Type of Breach'].trim();
    const location = row['Location of Breached Information'].trim();
    const entityType = row['Covered Entity Type'].trim();
    const date = new Date(row['Breach Submission Date']);
    const year = date.getFullYear();
    const affectedCount = parseInt(row['Individuals Affected'].replace(/,/g, ''), 10) || 0;

    // Aggregate by state
    if (!byState[state]) {
      byState[state] = { count: 0, affected: 0 };
    }
    byState[state].count += 1;
    byState[state].affected += affectedCount;

    // Aggregate by breach type
    if (!byBreachType[breachType]) {
      byBreachType[breachType] = { count: 0, affected: 0 };
    }
    byBreachType[breachType].count += 1;
    byBreachType[breachType].affected += affectedCount;

    // Aggregate by location
    if (!byLocation[location]) {
      byLocation[location] = { count: 0, affected: 0 };
    }
    byLocation[location].count += 1;
    byLocation[location].affected += affectedCount;

    // Aggregate by entity type
    if (!byEntityType[entityType]) {
      byEntityType[entityType] = { count: 0, affected: 0 };
    }
    byEntityType[entityType].count += 1;
    byEntityType[entityType].affected += affectedCount;

    // Aggregate by year
    if (!byYear[year]) {
      byYear[year] = { count: 0, affected: 0 };
    }
    byYear[year].count += 1;
    byYear[year].affected += affectedCount;

    // Aggregate by state and breach type
    if (!stateBreachTypeCounts[state]) {
      stateBreachTypeCounts[state] = {};
    }
    if (!stateBreachTypeCounts[state][breachType]) {
      stateBreachTypeCounts[state][breachType] = { count: 0, affected: 0 };
    }
    stateBreachTypeCounts[state][breachType].count += 1;
    stateBreachTypeCounts[state][breachType].affected += affectedCount;
  })
  .on('end', () => {
    // Convert objects to arrays for easier use in D3
    const stateData = Object.entries(byState).map(([state, data]) => ({
      state,
      count: data.count,
      affected: data.affected
    })).sort((a, b) => b.affected - a.affected);

    const breachTypeData = Object.entries(byBreachType).map(([type, data]) => ({
      type,
      count: data.count,
      affected: data.affected
    })).sort((a, b) => b.affected - a.affected);

    const locationData = Object.entries(byLocation).map(([location, data]) => ({
      location,
      count: data.count,
      affected: data.affected
    })).sort((a, b) => b.affected - a.affected);

    const entityTypeData = Object.entries(byEntityType).map(([type, data]) => ({
      type,
      count: data.count,
      affected: data.affected
    })).sort((a, b) => b.affected - a.affected);

    const yearData = Object.entries(byYear).map(([year, data]) => ({
      year: parseInt(year),
      count: data.count,
      affected: data.affected
    })).sort((a, b) => a.year - b.year);

    // Process state-breach type data
    const stateBreachTypeData = [];
    Object.entries(stateBreachTypeCounts).forEach(([state, breachTypes]) => {
      Object.entries(breachTypes).forEach(([breachType, data]) => {
        stateBreachTypeData.push({
          state,
          breachType,
          count: data.count,
          affected: data.affected
        });
      });
    });

    // Create the final data object
    const aggregatedData = {
      byState: stateData,
      byBreachType: breachTypeData,
      byLocation: locationData,
      byEntityType: entityTypeData,
      byYear: yearData,
      stateBreachType: stateBreachTypeData
    };

    // Write to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(aggregatedData, null, 2));
    console.log(`Data aggregated and saved to ${outputFile}`);
  });
