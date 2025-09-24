// Simplified Global Impact Calculator
const WORLD_POPULATION = 8000000000;
const CURRENT_GLOBAL_EMISSIONS = 36700000000;
const EARTH_CAPACITY = 11000000000;
const AVERAGE_FOOTPRINT = 4.6;

function calculateGlobalImpact() {
    const input = document.getElementById('carbonFootprint');
    if (!input) {
        alert('Carbon footprint input not found.');
        return;
    }
    
    const footprint = parseFloat(input.value);
    
    if (!footprint || footprint <= 0 || isNaN(footprint)) {
        alert('Please enter a valid carbon footprint value (greater than 0).');
        return;
    }
    
    // Calculate global impact
    const globalEmissions = footprint * WORLD_POPULATION;
    const emissionIncrease = ((globalEmissions - CURRENT_GLOBAL_EMISSIONS) / CURRENT_GLOBAL_EMISSIONS) * 100;
    const earthsNeeded = globalEmissions / EARTH_CAPACITY;
    
    // Display results
    displayResults(footprint, globalEmissions, emissionIncrease, earthsNeeded);
    generateActionItems(footprint);
    createSimpleChart(footprint);
    
    document.getElementById('results').style.display = 'block';
}

function displayResults(footprint, globalEmissions, emissionIncrease, earthsNeeded) {
    const resultsDiv = document.getElementById('globalResults');
    const comparisonDiv = document.getElementById('comparison');
    const earthsDiv = document.getElementById('earthsNeeded');
    
    resultsDiv.innerHTML = `
        <div class="impact-stat">
            <h4>Total Global Emissions:</h4>
            <p class="big-number">${(globalEmissions / 1000000000).toFixed(1)} billion tons CO₂/year</p>
        </div>
    `;
    
    let comparisonClass = 'medium-impact';
    let comparisonMessage = '';
    
    if (footprint < AVERAGE_FOOTPRINT) {
        comparisonClass = 'low-impact';
        comparisonMessage = `🎉 Great! Your footprint is ${(AVERAGE_FOOTPRINT - footprint).toFixed(1)} tons below the global average.`;
    } else if (footprint > AVERAGE_FOOTPRINT) {
        comparisonClass = 'high-impact';
        comparisonMessage = `⚠️ Your footprint is ${(footprint - AVERAGE_FOOTPRINT).toFixed(1)} tons above the global average.`;
    } else {
        comparisonMessage = `📊 Your footprint matches the global average.`;
    }
    
    comparisonDiv.innerHTML = `
        <div class="${comparisonClass}">
            <h4>Comparison to Global Average (${AVERAGE_FOOTPRINT} tons):</h4>
            <p>${comparisonMessage}</p>
            <p>Global emissions would ${emissionIncrease > 0 ? 'increase' : 'decrease'} by ${Math.abs(emissionIncrease).toFixed(1)}%</p>
        </div>
    `;
    
    let earthsClass = earthsNeeded > 1.5 ? 'high-impact' : earthsNeeded > 1 ? 'medium-impact' : 'low-impact';
    
    earthsDiv.innerHTML = `
        <div class="${earthsClass}">
            <h4>Earths Needed:</h4>
            <p class="big-number">${earthsNeeded.toFixed(1)} 🌍</p>
            <p>${earthsNeeded > 1 ? 'We would need multiple Earths to sustain this lifestyle!' : 'This lifestyle is sustainable within Earth\'s capacity.'}</p>
        </div>
    `;
    
    // Generate scenario description
    generateScenario(footprint, earthsNeeded);
}

function generateScenario(footprint, earthsNeeded) {
    const scenarioDiv = document.getElementById('scenarioDescription');
    
    let scenario, description;
    
    if (footprint <= 2.3) {
        scenario = 'sustainable';
        description = '🌟 **Sustainable Paradise**: Your lifestyle creates a world where nature thrives alongside human civilization. Cities are green, air is clean, and renewable energy powers everything.';
    } else if (footprint <= 5) {
        scenario = 'moderate';
        description = '⚖️ **Balanced World**: Your lifestyle leads to a world with mixed outcomes. Some environmental challenges exist, but technology and adaptation help maintain livable conditions.';
    } else if (footprint <= 10) {
        scenario = 'concerning';
        description = '⚠️ **Stressed Planet**: Your lifestyle creates a world facing significant environmental challenges. Cities struggle with pollution, weather becomes more extreme, and ecosystems are under pressure.';
    } else {
        scenario = 'critical';
        description = '🚨 **Climate Crisis**: Your lifestyle leads to a world in environmental crisis. Extreme weather, rising seas, and ecosystem collapse make life increasingly difficult for future generations.';
    }
    
    scenarioDiv.innerHTML = `
        <div class="scenario-description ${scenario}">
            <p>${description}</p>
            <div class="scenario-stats">
                <div class="stat">
                    <span class="stat-label">Earths Needed:</span>
                    <span class="stat-value ${earthsNeeded > 1.5 ? 'critical' : earthsNeeded > 1 ? 'concerning' : 'sustainable'}">${earthsNeeded.toFixed(1)} 🌍</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Your Footprint:</span>
                    <span class="stat-value">${footprint} tons CO₂/year</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Global Target:</span>
                    <span class="stat-value sustainable">2.3 tons CO₂/year</span>
                </div>
            </div>
        </div>
    `;
}

function generateActionItems(footprint) {
    const actionDiv = document.getElementById('actionItems');
    
    let actions = [];
    
    if (footprint > 10) {
        actions = [
            "🏠 Consider renewable energy for your home",
            "✈️ Reduce air travel or offset carbon emissions",
            "🚗 Switch to electric or hybrid vehicles",
            "🥩 Reduce meat consumption significantly",
            "🏢 Advocate for sustainable practices at work"
        ];
    } else if (footprint > 5) {
        actions = [
            "🚲 Use public transport or bike more often",
            "💡 Upgrade to energy-efficient appliances",
            "♻️ Increase recycling and waste reduction",
            "🌱 Support renewable energy initiatives",
            "🛒 Choose sustainable products and brands"
        ];
    } else {
        actions = [
            "🌟 You're doing great! Share your knowledge",
            "📢 Educate others about sustainability",
            "🌳 Support reforestation projects",
            "💚 Advocate for environmental policies",
            "🤝 Join or create environmental groups"
        ];
    }
    
    actionDiv.innerHTML = `
        <ul class="action-list">
            ${actions.map(action => `<li>${action}</li>`).join('')}
        </ul>
    `;
}

function createSimpleChart(userFootprint) {
    const canvas = document.getElementById('impactChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const data = [
        { label: 'Your Footprint', value: userFootprint, color: '#667eea' },
        { label: 'Global Average', value: AVERAGE_FOOTPRINT, color: '#764ba2' },
        { label: 'Sustainable Target', value: 2.3, color: '#28a745' }
    ];
    
    const maxValue = Math.max(...data.map(d => d.value)) * 1.2;
    const barWidth = 80;
    const barSpacing = 40;
    const chartHeight = 150;
    const chartTop = 30;
    
    data.forEach((item, index) => {
        const x = 50 + index * (barWidth + barSpacing);
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = chartTop + chartHeight - barHeight;
        
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toFixed(1), x + barWidth/2, y - 5);
        
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(item.label, x + barWidth/2, chartTop + chartHeight + 20);
    });
    
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Carbon Footprint Comparison (tons CO₂/year)', canvas.width/2, 20);
}

// Load stored footprint on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedFootprint = localStorage.getItem('carbonFootprint');
    if (storedFootprint) {
        const input = document.getElementById('carbonFootprint');
        if (input) {
            input.value = storedFootprint;
        }
    }
});