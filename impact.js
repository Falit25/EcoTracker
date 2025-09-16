// Add CSS for scenario styling
const scenarioStyle = document.createElement('style');
scenarioStyle.textContent = `
    .future-scenario {
        margin: 2rem 0;
        padding: 1.5rem;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 15px;
        text-align: center;
    }
    
    .future-scenario h4 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }
    
    #scenarioImage {
        margin: 1rem 0;
        display: flex;
        justify-content: center;
    }
    
    #scenarioImage canvas {
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        max-width: 100%;
        height: auto;
    }
    
    .scenario-description {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 10px;
    }
    
    .scenario-description.sustainable {
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        border-left: 4px solid #28a745;
    }
    
    .scenario-description.moderate {
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        border-left: 4px solid #ffc107;
    }
    
    .scenario-description.concerning {
        background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
        border-left: 4px solid #fd7e14;
    }
    
    .scenario-description.critical {
        background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
        border-left: 4px solid #dc3545;
    }
    
    .scenario-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .stat {
        background: rgba(255,255,255,0.7);
        padding: 0.8rem;
        border-radius: 8px;
        text-align: center;
    }
    
    .stat-label {
        display: block;
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 0.3rem;
    }
    
    .stat-value {
        display: block;
        font-size: 1.2rem;
        font-weight: bold;
    }
    
    .stat-value.sustainable { color: #28a745; }
    .stat-value.concerning { color: #fd7e14; }
    .stat-value.critical { color: #dc3545; }
    
    .ai-loading {
        padding: 2rem;
        font-size: 1.1rem;
        color: #667eea;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(scenarioStyle);

// Global constants
const WORLD_POPULATION = 8000000000; // 8 billion
const CURRENT_GLOBAL_EMISSIONS = 36700000000; // 36.7 billion tons CO2/year
const EARTH_CAPACITY = 11000000000; // Earth's capacity in tons CO2/year
const AVERAGE_FOOTPRINT = 4.6; // Global average tons CO2/person/year

document.addEventListener('DOMContentLoaded', function() {
    // Check if carbon footprint is available from quiz
    const storedFootprint = localStorage.getItem('carbonFootprint');
    if (storedFootprint) {
        document.getElementById('carbonFootprint').value = storedFootprint;
    }
});

function calculateGlobalImpact() {
    const footprint = parseFloat(document.getElementById('carbonFootprint').value);
    
    if (!footprint || footprint <= 0) {
        alert('Please enter a valid carbon footprint value.');
        return;
    }
    
    // Calculate global impact
    const globalEmissions = footprint * WORLD_POPULATION;
    const emissionIncrease = ((globalEmissions - CURRENT_GLOBAL_EMISSIONS) / CURRENT_GLOBAL_EMISSIONS) * 100;
    const earthsNeeded = globalEmissions / EARTH_CAPACITY;
    
    // Display results
    displayResults(footprint, globalEmissions, emissionIncrease, earthsNeeded);
    
    // Generate future scenario
    generateFutureScenario(footprint, earthsNeeded);
    
    // Create visualization
    createImpactChart(footprint);
    
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
    
    // Generate action items
    generateActionItems(footprint, earthsNeeded);
}

function generateActionItems(footprint, earthsNeeded) {
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

function createImpactChart(userFootprint) {
    const canvas = document.getElementById('impactChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart data
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
    
    // Draw bars
    data.forEach((item, index) => {
        const x = 50 + index * (barWidth + barSpacing);
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = chartTop + chartHeight - barHeight;
        
        // Draw bar
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw value on top
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toFixed(1), x + barWidth/2, y - 5);
        
        // Draw label
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(item.label, x + barWidth/2, chartTop + chartHeight + 20);
    });
    
    // Draw title
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Carbon Footprint Comparison (tons CO₂/year)', canvas.width/2, 20);
}

function generateFutureScenario(footprint, earthsNeeded) {
    const scenarioImageDiv = document.getElementById('scenarioImage');
    const scenarioDescDiv = document.getElementById('scenarioDescription');
    
    let scenario, imagePrompt, description;
    
    if (footprint <= 2.3) {
        scenario = 'sustainable';
        imagePrompt = 'A beautiful sustainable future world with green cities, renewable energy, clean air, thriving nature, solar panels, wind turbines, electric vehicles, and happy people in a pristine environment';
        description = '🌟 **Sustainable Paradise**: Your lifestyle creates a world where nature thrives alongside human civilization. Cities are green, air is clean, and renewable energy powers everything.';
    } else if (footprint <= 5) {
        scenario = 'moderate';
        imagePrompt = 'A moderately impacted world with some pollution, mixed energy sources, urban areas with both green and industrial zones, moderate air quality, and people adapting to environmental changes';
        description = '⚖️ **Balanced World**: Your lifestyle leads to a world with mixed outcomes. Some environmental challenges exist, but technology and adaptation help maintain livable conditions.';
    } else if (footprint <= 10) {
        scenario = 'concerning';
        imagePrompt = 'A world with visible climate change effects, smoggy cities, rising sea levels, extreme weather, people wearing masks, struggling ecosystems, and infrastructure dealing with environmental stress';
        description = '⚠️ **Stressed Planet**: Your lifestyle creates a world facing significant environmental challenges. Cities struggle with pollution, weather becomes more extreme, and ecosystems are under pressure.';
    } else {
        scenario = 'critical';
        imagePrompt = 'A dystopian future world with severe climate change, polluted skies, flooded coastal cities, extreme weather disasters, people in protective gear, dying forests, and environmental collapse';
        description = '🚨 **Climate Crisis**: Your lifestyle leads to a world in environmental crisis. Extreme weather, rising seas, and ecosystem collapse make life increasingly difficult for future generations.';
    }
    
    // Generate AI image using a placeholder service (in real implementation, you'd use DALL-E, Midjourney, or Stable Diffusion)
    generateAIImage(imagePrompt, scenario, scenarioImageDiv);
    
    scenarioDescDiv.innerHTML = `
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

function generateAIImage(prompt, scenario, container) {
    // Create a canvas to generate the AI-style image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 350;
    
    // Create gradient background based on scenario
    let gradient;
    switch(scenario) {
        case 'sustainable':
            gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, '#87CEEB'); // Sky blue
            gradient.addColorStop(0.3, '#98FB98'); // Pale green
            gradient.addColorStop(1, '#228B22'); // Forest green
            break;
        case 'moderate':
            gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, '#F0E68C'); // Khaki
            gradient.addColorStop(0.5, '#DDA0DD'); // Plum
            gradient.addColorStop(1, '#696969'); // Dim gray
            break;
        case 'concerning':
            gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, '#FF6347'); // Tomato
            gradient.addColorStop(0.5, '#FF4500'); // Orange red
            gradient.addColorStop(1, '#8B0000'); // Dark red
            break;
        case 'critical':
            gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, '#2F4F4F'); // Dark slate gray
            gradient.addColorStop(0.5, '#800000'); // Maroon
            gradient.addColorStop(1, '#000000'); // Black
            break;
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);
    
    // Add scenario-specific elements
    drawScenarioElements(ctx, scenario);
    
    // Add the canvas to container
    container.innerHTML = '';
    container.appendChild(canvas);
    
    // Add loading effect and then show the generated image
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = '<div class="ai-loading">🤖 Generating AI vision of your future world...</div>';
    container.appendChild(loadingDiv);
    
    // Simulate AI generation delay
    setTimeout(() => {
        loadingDiv.remove();
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 1s ease-in';
        setTimeout(() => {
            canvas.style.opacity = '1';
        }, 100);
    }, 2000);
}

function drawScenarioElements(ctx, scenario) {
    ctx.save();
    
    switch(scenario) {
        case 'sustainable':
            drawSustainableWorld(ctx);
            break;
        case 'moderate':
            drawModerateWorld(ctx);
            break;
        case 'concerning':
            drawConcerningWorld(ctx);
            break;
        case 'critical':
            drawCriticalWorld(ctx);
            break;
    }
    
    ctx.restore();
}

function drawSustainableWorld(ctx) {
    // Draw realistic sun with rays
    drawSun(ctx, 350, 50);
    
    // Draw fluffy white clouds
    drawClouds(ctx, '#FFFFFF', 0.8);
    
    // Draw green hills in background
    drawHills(ctx, '#32CD32');
    
    // Draw realistic trees with varied sizes
    drawRealisticTree(ctx, 60, 220, 'large', '#228B22');
    drawRealisticTree(ctx, 120, 230, 'medium', '#32CD32');
    drawRealisticTree(ctx, 180, 225, 'large', '#228B22');
    drawRealisticTree(ctx, 300, 235, 'medium', '#90EE90');
    
    // Draw modern wind turbines
    drawModernWindTurbine(ctx, 250, 180);
    drawModernWindTurbine(ctx, 320, 170);
    
    // Draw eco-friendly city with solar panels
    drawEcoBuilding(ctx, 80, 200, 60, '#4169E1', true);
    drawEcoBuilding(ctx, 150, 190, 80, '#6495ED', true);
    drawEcoBuilding(ctx, 220, 185, 70, '#87CEEB', true);
    
    // Draw birds
    drawBirds(ctx, 5);
    
    // Draw clean river
    drawRiver(ctx, '#87CEEB');
}

function drawModerateWorld(ctx) {
    // Draw hazy sun
    drawSun(ctx, 320, 60, 0.7);
    
    // Draw mixed clouds
    drawClouds(ctx, '#F5F5DC', 0.6);
    
    // Draw some green areas
    drawHills(ctx, '#9ACD32');
    
    // Draw mixed vegetation
    drawRealisticTree(ctx, 80, 230, 'medium', '#9ACD32');
    drawRealisticTree(ctx, 200, 235, 'small', '#8FBC8F');
    
    // Draw mixed buildings
    drawBuilding(ctx, 120, 200, 50, '#708090');
    drawEcoBuilding(ctx, 180, 190, 60, '#4682B4', false);
    drawBuilding(ctx, 250, 195, 70, '#696969');
    
    // Draw some pollution
    drawSmoke(ctx, 280, 190, 'light');
    
    // Draw fewer birds
    drawBirds(ctx, 2);
}

function drawConcerningWorld(ctx) {
    // Draw dim sun through smog
    drawSun(ctx, 300, 70, 0.4);
    
    // Draw pollution clouds
    drawPollutionClouds(ctx);
    
    // Draw brown/dying hills
    drawHills(ctx, '#8B7355');
    
    // Draw dying trees
    drawRealisticTree(ctx, 100, 240, 'small', '#8B4513', true);
    drawRealisticTree(ctx, 250, 245, 'small', '#A0522D', true);
    
    // Draw industrial buildings
    drawIndustrialBuilding(ctx, 150, 180, 80);
    drawIndustrialBuilding(ctx, 240, 170, 90);
    drawBuilding(ctx, 320, 185, 75, '#2F4F4F');
    
    // Draw heavy smoke
    drawSmoke(ctx, 180, 180, 'heavy');
    drawSmoke(ctx, 270, 170, 'heavy');
    
    // Draw acid rain
    drawRain(ctx, '#DAA520');
}

function drawCriticalWorld(ctx) {
    // Draw dark stormy sky
    drawStormySky(ctx);
    
    // Draw lightning
    drawLightning(ctx, 200, 80);
    drawLightning(ctx, 120, 90);
    
    // Draw flooded landscape
    drawFlood(ctx);
    
    // Draw dead trees
    drawDeadTree(ctx, 80, 200);
    drawDeadTree(ctx, 300, 190);
    
    // Draw damaged/collapsed buildings
    drawDamagedBuilding(ctx, 150, 160);
    drawDamagedBuilding(ctx, 220, 150);
    
    // Draw toxic smoke
    drawToxicSmoke(ctx, 180, 160);
    
    // Draw heavy rain
    drawRain(ctx, '#4682B4');
    
    // Draw debris
    drawDebris(ctx);
}

// Realistic drawing functions
function drawSun(ctx, x, y, opacity = 1) {
    ctx.save();
    ctx.globalAlpha = opacity;
    
    // Draw sun rays
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    for(let i = 0; i < 8; i++) {
        const angle = (i * 45) * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * 35, y + Math.sin(angle) * 35);
        ctx.lineTo(x + Math.cos(angle) * 45, y + Math.sin(angle) * 45);
        ctx.stroke();
    }
    
    // Draw sun body with gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
    gradient.addColorStop(0, '#FFFF99');
    gradient.addColorStop(1, '#FFD700');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawClouds(ctx, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    
    // Draw multiple fluffy clouds
    for(let i = 0; i < 3; i++) {
        const x = 50 + i * 120;
        const y = 40 + Math.random() * 20;
        
        // Multiple circles for fluffy effect
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.arc(x + 20, y, 20, 0, Math.PI * 2);
        ctx.arc(x + 40, y, 15, 0, Math.PI * 2);
        ctx.arc(x + 20, y - 10, 15, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
}

function drawHills(ctx, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.quadraticCurveTo(100, 200, 200, 220);
    ctx.quadraticCurveTo(300, 240, 400, 210);
    ctx.lineTo(400, 300);
    ctx.lineTo(0, 300);
    ctx.fill();
}

function drawRealisticTree(ctx, x, y, size, leafColor, isDying = false) {
    const scale = size === 'large' ? 1.2 : size === 'medium' ? 1 : 0.8;
    
    // Draw trunk with texture
    const trunkGradient = ctx.createLinearGradient(x - 8 * scale, 0, x + 8 * scale, 0);
    trunkGradient.addColorStop(0, '#8B4513');
    trunkGradient.addColorStop(0.5, '#A0522D');
    trunkGradient.addColorStop(1, '#654321');
    
    ctx.fillStyle = trunkGradient;
    ctx.fillRect(x - 8 * scale, y - 40 * scale, 16 * scale, 40 * scale);
    
    // Draw branches
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.moveTo(x, y - 30 * scale);
    ctx.lineTo(x - 15 * scale, y - 45 * scale);
    ctx.moveTo(x, y - 25 * scale);
    ctx.lineTo(x + 12 * scale, y - 40 * scale);
    ctx.stroke();
    
    // Draw leaves with multiple layers
    if (!isDying) {
        const leafGradient = ctx.createRadialGradient(x, y - 50 * scale, 0, x, y - 50 * scale, 25 * scale);
        leafGradient.addColorStop(0, leafColor);
        leafGradient.addColorStop(1, '#228B22');
        ctx.fillStyle = leafGradient;
        
        // Multiple leaf clusters
        ctx.beginPath();
        ctx.arc(x, y - 50 * scale, 25 * scale, 0, Math.PI * 2);
        ctx.arc(x - 15 * scale, y - 45 * scale, 15 * scale, 0, Math.PI * 2);
        ctx.arc(x + 12 * scale, y - 40 * scale, 12 * scale, 0, Math.PI * 2);
        ctx.fill();
    } else {
        // Sparse dying leaves
        ctx.fillStyle = '#8B4513';
        for(let i = 0; i < 5; i++) {
            const leafX = x + (Math.random() - 0.5) * 30 * scale;
            const leafY = y - 40 * scale + (Math.random() - 0.5) * 20 * scale;
            ctx.beginPath();
            ctx.arc(leafX, leafY, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawModernWindTurbine(ctx, x, y) {
    // Draw tower with gradient
    const towerGradient = ctx.createLinearGradient(x - 5, 0, x + 5, 0);
    towerGradient.addColorStop(0, '#E0E0E0');
    towerGradient.addColorStop(0.5, '#FFFFFF');
    towerGradient.addColorStop(1, '#C0C0C0');
    
    ctx.fillStyle = towerGradient;
    ctx.fillRect(x - 3, y - 80, 6, 80);
    
    // Draw nacelle (turbine housing)
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(x - 8, y - 85, 16, 8);
    
    // Draw rotating blades with motion blur effect
    ctx.save();
    ctx.translate(x, y - 81);
    
    for(let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * 120 + Date.now() * 0.01) * Math.PI / 180);
        
        // Blade with gradient
        const bladeGradient = ctx.createLinearGradient(0, 0, 0, -35);
        bladeGradient.addColorStop(0, '#FFFFFF');
        bladeGradient.addColorStop(1, '#F0F0F0');
        
        ctx.fillStyle = bladeGradient;
        ctx.beginPath();
        ctx.ellipse(0, -17, 3, 17, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    ctx.restore();
}

function drawEcoBuilding(ctx, x, y, height, color, hasSolar) {
    // Building with gradient
    const buildingGradient = ctx.createLinearGradient(x, 0, x + 40, 0);
    buildingGradient.addColorStop(0, color);
    buildingGradient.addColorStop(1, '#87CEEB');
    
    ctx.fillStyle = buildingGradient;
    ctx.fillRect(x, y, 40, height);
    
    // Windows
    ctx.fillStyle = '#E6F3FF';
    for(let row = 0; row < Math.floor(height / 15); row++) {
        for(let col = 0; col < 3; col++) {
            ctx.fillRect(x + 5 + col * 10, y + 5 + row * 15, 8, 10);
        }
    }
    
    // Solar panels on roof
    if (hasSolar) {
        ctx.fillStyle = '#191970';
        ctx.fillRect(x + 5, y - 5, 30, 8);
        
        // Solar panel grid lines
        ctx.strokeStyle = '#000080';
        ctx.lineWidth = 1;
        for(let i = 1; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(x + 5 + i * 5, y - 5);
            ctx.lineTo(x + 5 + i * 5, y + 3);
            ctx.stroke();
        }
    }
}

function drawBuilding(ctx, x, y, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 35, height);
    
    // Windows
    ctx.fillStyle = '#FFFF99';
    for(let row = 0; row < Math.floor(height / 12); row++) {
        for(let col = 0; col < 2; col++) {
            if (Math.random() > 0.3) { // Some windows are lit
                ctx.fillRect(x + 5 + col * 12, y + 5 + row * 12, 8, 8);
            }
        }
    }
}

function drawBirds(ctx, count) {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    for(let i = 0; i < count; i++) {
        const x = 50 + Math.random() * 300;
        const y = 60 + Math.random() * 40;
        
        // Simple bird shape
        ctx.beginPath();
        ctx.moveTo(x - 5, y);
        ctx.quadraticCurveTo(x, y - 3, x + 5, y);
        ctx.moveTo(x - 3, y);
        ctx.quadraticCurveTo(x, y + 2, x + 3, y);
        ctx.stroke();
    }
}

function drawRiver(ctx, color) {
    const gradient = ctx.createLinearGradient(0, 270, 400, 270);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, '#B0E0E6');
    gradient.addColorStop(1, color);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, 280);
    ctx.quadraticCurveTo(200, 270, 400, 285);
    ctx.lineTo(400, 300);
    ctx.lineTo(0, 300);
    ctx.fill();
}

// Additional functions for other scenarios...
function drawPollutionClouds(ctx) {
    ctx.fillStyle = 'rgba(105, 105, 105, 0.8)';
    
    for(let i = 0; i < 4; i++) {
        const x = 60 + i * 80;
        const y = 50 + Math.random() * 30;
        
        // Irregular pollution clouds
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.arc(x + 20, y - 5, 20, 0, Math.PI * 2);
        ctx.arc(x - 15, y + 5, 18, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawSmoke(ctx, x, y, intensity) {
    const alpha = intensity === 'heavy' ? 0.8 : 0.4;
    ctx.fillStyle = `rgba(64, 64, 64, ${alpha})`;
    
    // Smoke particles rising
    for(let i = 0; i < 8; i++) {
        const smokeX = x + (Math.random() - 0.5) * 20;
        const smokeY = y - i * 8 - Math.random() * 10;
        const size = 8 + Math.random() * 6;
        
        ctx.beginPath();
        ctx.arc(smokeX, smokeY, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawIndustrialBuilding(ctx, x, y, height) {
    // Main building
    ctx.fillStyle = '#2F4F4F';
    ctx.fillRect(x, y, 50, height);
    
    // Smokestacks
    ctx.fillStyle = '#696969';
    ctx.fillRect(x + 10, y - 20, 8, 20);
    ctx.fillRect(x + 30, y - 25, 8, 25);
    
    // Industrial windows
    ctx.fillStyle = '#FF6347';
    for(let i = 0; i < 3; i++) {
        ctx.fillRect(x + 15 + i * 10, y + 20, 6, 15);
    }
}

function drawStormySky(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, '#2F2F2F');
    gradient.addColorStop(0.5, '#4F4F4F');
    gradient.addColorStop(1, '#1C1C1C');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 150);
}

function drawLightning(ctx, x, y) {
    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#FFFF00';
    ctx.shadowBlur = 10;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 10, y + 30);
    ctx.lineTo(x + 5, y + 30);
    ctx.lineTo(x - 5, y + 60);
    ctx.lineTo(x + 10, y + 60);
    ctx.lineTo(x, y + 90);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
}

function drawFlood(ctx) {
    const waterGradient = ctx.createLinearGradient(0, 220, 0, 300);
    waterGradient.addColorStop(0, 'rgba(70, 130, 180, 0.8)');
    waterGradient.addColorStop(1, '#4682B4');
    
    ctx.fillStyle = waterGradient;
    ctx.fillRect(0, 220, 400, 80);
    
    // Water ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for(let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(50 + i * 80, 250, 20, 0, Math.PI);
        ctx.stroke();
    }
}

function drawDeadTree(ctx, x, y) {
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 8;
    
    // Main trunk
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 50);
    ctx.stroke();
    
    // Dead branches
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x - 20, y - 45);
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x + 15, y - 35);
    ctx.moveTo(x, y - 40);
    ctx.lineTo(x - 10, y - 55);
    ctx.stroke();
}

function drawDamagedBuilding(ctx, x, y) {
    // Tilted/damaged building
    ctx.save();
    ctx.translate(x + 20, y + 40);
    ctx.rotate(0.1); // Slight tilt
    
    ctx.fillStyle = '#696969';
    ctx.fillRect(-20, -40, 40, 80);
    
    // Broken windows
    ctx.fillStyle = '#000000';
    ctx.fillRect(-15, -30, 8, 8);
    ctx.fillRect(-5, -15, 8, 8);
    ctx.fillRect(5, -25, 8, 8);
    
    // Cracks
    ctx.strokeStyle = '#2F2F2F';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, -40);
    ctx.lineTo(-5, 0);
    ctx.lineTo(0, 40);
    ctx.stroke();
    
    ctx.restore();
}

function drawToxicSmoke(ctx, x, y) {
    ctx.fillStyle = 'rgba(128, 0, 128, 0.6)';
    
    for(let i = 0; i < 10; i++) {
        const smokeX = x + (Math.random() - 0.5) * 30;
        const smokeY = y - i * 6 - Math.random() * 8;
        const size = 6 + Math.random() * 8;
        
        ctx.beginPath();
        ctx.arc(smokeX, smokeY, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawRain(ctx, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    for(let i = 0; i < 50; i++) {
        const x = Math.random() * 400;
        const y = Math.random() * 200;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 2, y + 15);
        ctx.stroke();
    }
}

function drawDebris(ctx) {
    ctx.fillStyle = '#8B4513';
    
    for(let i = 0; i < 8; i++) {
        const x = Math.random() * 400;
        const y = 200 + Math.random() * 50;
        const size = 3 + Math.random() * 5;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI);
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();
    }
}