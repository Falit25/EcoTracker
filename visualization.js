// Global emission data
const globalEmissionData = {
    sectors: ['Energy Production', 'Agriculture', 'Industry', 'Transportation', 'Buildings', 'Other Energy'],
    emissions: [25, 24, 21, 14, 6, 10],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
};

const countryData = {
    countries: ['China', 'United States', 'India', 'Russia', 'Japan', 'Germany', 'Iran', 'South Korea'],
    emissions: [10065, 5416, 2654, 1711, 1162, 759, 720, 616],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFB6C1', '#98FB98']
};

const personalEmissionData = {
    categories: ['Transportation', 'Home Energy', 'Food', 'Goods & Services', 'Waste'],
    emissions: [2.3, 2.1, 1.8, 1.2, 0.6],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
};

// Initialize visualizations when page loads
document.addEventListener('DOMContentLoaded', function() {
    showGlobalData();
    showPieChart();
    showWorldMap();
});

function showGlobalData() {
    const trace = {
        x: globalEmissionData.sectors,
        y: globalEmissionData.emissions,
        z: globalEmissionData.emissions.map(x => x * 0.8), // Add 3D depth
        type: 'scatter3d',
        mode: 'markers',
        marker: {
            size: globalEmissionData.emissions.map(x => x * 2),
            color: globalEmissionData.colors,
            opacity: 0.8,
            line: {
                color: 'rgb(140, 140, 170)',
                width: 2
            }
        },
        text: globalEmissionData.sectors.map((sector, i) => 
            `${sector}<br>${globalEmissionData.emissions[i]}% of global emissions`
        ),
        hovertemplate: '%{text}<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Global Carbon Emissions by Sector (3D View)',
            font: { size: 16 }
        },
        scene: {
            xaxis: { title: 'Sectors' },
            yaxis: { title: 'Percentage (%)' },
            zaxis: { title: 'Impact Level' },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 1.5 }
            }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot('chart1', [trace], layout, {responsive: true});
}

function showPersonalData() {
    const trace = {
        x: personalEmissionData.categories,
        y: personalEmissionData.emissions,
        z: personalEmissionData.emissions.map(x => x * 1.2),
        type: 'scatter3d',
        mode: 'markers',
        marker: {
            size: personalEmissionData.emissions.map(x => x * 8),
            color: personalEmissionData.colors,
            opacity: 0.8
        },
        text: personalEmissionData.categories.map((category, i) => 
            `${category}<br>${personalEmissionData.emissions[i]} tons CO₂/year`
        ),
        hovertemplate: '%{text}<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Personal Carbon Footprint by Category (3D View)',
            font: { size: 16 }
        },
        scene: {
            xaxis: { title: 'Categories' },
            yaxis: { title: 'Tons CO₂/year' },
            zaxis: { title: 'Impact Level' },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 1.5 }
            }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot('chart1', [trace], layout, {responsive: true});
}

function showComparison() {
    const trace = {
        x: countryData.countries,
        y: countryData.emissions,
        z: countryData.emissions.map(x => x * 0.001), // Scale for 3D
        type: 'scatter3d',
        mode: 'markers',
        marker: {
            size: countryData.emissions.map(x => Math.sqrt(x) * 2),
            color: countryData.colors,
            opacity: 0.8
        },
        text: countryData.countries.map((country, i) => 
            `${country}<br>${countryData.emissions[i]} Mt CO₂/year`
        ),
        hovertemplate: '%{text}<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Top 8 Countries by CO₂ Emissions (3D View)',
            font: { size: 16 }
        },
        scene: {
            xaxis: { title: 'Countries' },
            yaxis: { title: 'Emissions (Mt CO₂/year)' },
            zaxis: { title: 'Relative Scale' },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 1.5 }
            }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot('chart1', [trace], layout, {responsive: true});
}

function showTrends() {
    const years = [2000, 2005, 2010, 2015, 2020, 2023];
    const emissions = [25000, 28000, 32000, 35000, 34000, 36700];
    
    const trace = {
        x: years,
        y: emissions,
        z: emissions.map((_, i) => i * 2), // Time progression in 3D
        type: 'scatter3d',
        mode: 'lines+markers',
        line: {
            color: '#FF6B6B',
            width: 6
        },
        marker: {
            size: 8,
            color: '#4ECDC4'
        },
        text: years.map((year, i) => 
            `Year: ${year}<br>Emissions: ${emissions[i]} Mt CO₂`
        ),
        hovertemplate: '%{text}<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Global CO₂ Emissions Trend (2000-2023)',
            font: { size: 16 }
        },
        scene: {
            xaxis: { title: 'Year' },
            yaxis: { title: 'Emissions (Mt CO₂)' },
            zaxis: { title: 'Time Progression' },
            camera: {
                eye: { x: 1.5, y: 1.5, z: 1.5 }
            }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot('chart1', [trace], layout, {responsive: true});
}

function showPieChart() {
    const trace = {
        labels: globalEmissionData.sectors,
        values: globalEmissionData.emissions,
        type: 'pie',
        marker: {
            colors: globalEmissionData.colors
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        hovertemplate: '%{label}<br>%{value}% of total emissions<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Global Emissions Distribution',
            font: { size: 16 }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot('chart2', [trace], layout, {responsive: true});
}

function showBarChart() {
    const trace = {
        x: globalEmissionData.sectors,
        y: globalEmissionData.emissions,
        type: 'bar',
        marker: {
            color: globalEmissionData.colors,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        },
        text: globalEmissionData.emissions.map(x => x + '%'),
        textposition: 'auto',
        hovertemplate: '%{x}<br>%{y}% of global emissions<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Emissions by Sector (Bar Chart)',
            font: { size: 16 }
        },
        xaxis: { title: 'Sectors' },
        yaxis: { title: 'Percentage (%)' },
        margin: { l: 50, r: 50, b: 100, t: 40 }
    };

    Plotly.newPlot('chart2', [trace], layout, {responsive: true});
}

function showSunburst() {
    const trace = {
        type: 'sunburst',
        labels: [
            'Global Emissions',
            'Energy Production', 'Agriculture', 'Industry', 'Transportation', 'Buildings', 'Other Energy',
            'Electricity', 'Heat', 'Livestock', 'Crops', 'Manufacturing', 'Cement', 'Road', 'Aviation',
            'Residential', 'Commercial', 'Fugitive', 'Flaring'
        ],
        parents: [
            '',
            'Global Emissions', 'Global Emissions', 'Global Emissions', 'Global Emissions', 'Global Emissions', 'Global Emissions',
            'Energy Production', 'Energy Production', 'Agriculture', 'Agriculture', 'Industry', 'Industry',
            'Transportation', 'Transportation', 'Buildings', 'Buildings', 'Other Energy', 'Other Energy'
        ],
        values: [
            100,
            25, 24, 21, 14, 6, 10,
            15, 10, 14, 10, 12, 9, 10, 4, 3, 3, 6, 4
        ],
        branchvalues: 'total',
        hovertemplate: '%{label}<br>%{value}% of emissions<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Hierarchical Emissions Breakdown',
            font: { size: 16 }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot('chart2', [trace], layout, {responsive: true});
}

function showWorldMap() {
    const trace = {
        type: 'choropleth',
        locationmode: 'country names',
        locations: ['China', 'United States', 'India', 'Russia', 'Japan', 'Germany', 'Iran', 'South Korea', 'Saudi Arabia', 'Indonesia'],
        z: [10065, 5416, 2654, 1711, 1162, 759, 720, 616, 582, 568],
        colorscale: [
            [0, '#E8F5E8'],
            [0.2, '#A8E6A3'],
            [0.4, '#68D391'],
            [0.6, '#F6AD55'],
            [0.8, '#FC8181'],
            [1, '#E53E3E']
        ],
        colorbar: {
            title: 'CO₂ Emissions<br>(Mt/year)',
            titleside: 'right'
        },
        hovertemplate: '%{location}<br>%{z} Mt CO₂/year<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Global CO₂ Emissions by Country',
            font: { size: 16 }
        },
        geo: {
            showframe: false,
            showcoastlines: true,
            projection: { type: 'natural earth' }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 }
    };

    Plotly.newPlot('chart3', [trace], layout, {responsive: true});
}

// Add CSS for insight cards
const style = document.createElement('style');
style.textContent = `
    .data-insights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .insight-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #667eea;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .insight-card h4 {
        margin-bottom: 0.5rem;
        color: #2c3e50;
    }
    
    .insight-card p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);