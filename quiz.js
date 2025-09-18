const questions = [
    // Section A: Energy Consumption (Q1-Q6)
    {
        question: "How often do you use heating or air conditioning?",
        options: [
            { text: "Rarely, rely on natural ventilation", score: 1 },
            { text: "Only during extreme weather", score: 2 },
            { text: "Moderate use with efficient thermostat control", score: 3 },
            { text: "Daily, convenience prioritized", score: 4 },
            { text: "Constantly, no energy management", score: 5 },
            { text: "Use smart thermostats to optimize energy", score: 2 }
        ]
    },
    {
        question: "What powers most of your home energy?",
        options: [
            { text: "100% renewable sources", score: 1 },
            { text: "Mostly renewable, partially grid electricity", score: 2 },
            { text: "Mix of renewable and fossil fuels", score: 3 },
            { text: "Mostly fossil fuels", score: 4 },
            { text: "Only non-renewable energy", score: 5 },
            { text: "Offset my consumption via carbon credits", score: 2 }
        ]
    },
    {
        question: "How do you manage appliance energy use?",
        options: [
            { text: "Always unplug unused devices", score: 1 },
            { text: "Use smart power strips", score: 2 },
            { text: "Occasionally unplug", score: 3 },
            { text: "Rarely unplug", score: 4 },
            { text: "Never unplug", score: 5 },
            { text: "Monitor via energy apps", score: 2 }
        ]
    },
    {
        question: "How often do you use natural light instead of artificial lighting?",
        options: [
            { text: "Always plan activities around daylight", score: 1 },
            { text: "Mostly use natural light", score: 2 },
            { text: "Sometimes consider it", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Smart lighting systems adjust automatically", score: 2 }
        ]
    },
    {
        question: "How often do you select energy-efficient appliances?",
        options: [
            { text: "Always ENERGY STAR certified", score: 1 },
            { text: "Mostly, if affordable", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Maintain appliances for maximum efficiency", score: 2 }
        ]
    },
    {
        question: "How often do you check your home energy consumption?",
        options: [
            { text: "Real-time monitoring apps", score: 1 },
            { text: "Monthly bills carefully analyzed", score: 2 },
            { text: "Occasionally", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Don't monitor", score: 5 },
            { text: "Use smart home optimization systems", score: 1 }
        ]
    },
    // Section B: Plastic & Waste Management (Q7-Q12)
    {
        question: "How often do you use single-use plastics?",
        options: [
            { text: "Never", score: 1 },
            { text: "Rarely", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Often", score: 4 },
            { text: "Always", score: 5 },
            { text: "Only biodegradable alternatives", score: 1 }
        ]
    },
    {
        question: "How do you dispose of plastic waste?",
        options: [
            { text: "Fully recycle/upcycle", score: 1 },
            { text: "Separate for recycling", score: 2 },
            { text: "Throw in general waste", score: 4 },
            { text: "Burn/incinerate", score: 5 },
            { text: "Store without disposal", score: 5 },
            { text: "Participate in community recycling", score: 1 }
        ]
    },
    {
        question: "How often do you bring reusable bags?",
        options: [
            { text: "Always multiple bags", score: 1 },
            { text: "Most of the time", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Use collapsible/multi-purpose bags", score: 1 }
        ]
    },
    {
        question: "How do you manage organic waste?",
        options: [
            { text: "Home compost", score: 1 },
            { text: "Community compost", score: 2 },
            { text: "Dispose in general waste", score: 4 },
            { text: "Burn outdoors", score: 5 },
            { text: "Store without disposal", score: 5 },
            { text: "Use worm composting/bio-digester", score: 1 }
        ]
    },
    {
        question: "How often do you creatively reuse plastic containers?",
        options: [
            { text: "Always", score: 1 },
            { text: "Often", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Share for reuse", score: 1 }
        ]
    },
    {
        question: "How do you manage e-waste?",
        options: [
            { text: "Donate/recycle responsibly", score: 1 },
            { text: "Sell/give away old devices", score: 2 },
            { text: "Throw in general trash", score: 5 },
            { text: "Store without disposal", score: 4 },
            { text: "Dispose improperly", score: 5 },
            { text: "Participate in e-waste drives", score: 1 }
        ]
    },
    // Section C: Water Usage (Q13-Q18)
    {
        question: "How do you conserve water?",
        options: [
            { text: "Always monitor usage", score: 1 },
            { text: "Mostly, use devices", score: 2 },
            { text: "Occasionally", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Reuse greywater", score: 1 }
        ]
    },
    {
        question: "Daily shower duration?",
        options: [
            { text: "<5 min", score: 1 },
            { text: "5–10 min", score: 2 },
            { text: "10–15 min", score: 3 },
            { text: "15–20 min", score: 4 },
            { text: ">20 min", score: 5 },
            { text: "Use low-flow showerheads", score: 2 }
        ]
    },
    {
        question: "How often check for water leaks?",
        options: [
            { text: "Regularly, fix immediately", score: 1 },
            { text: "Occasionally", score: 2 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Only visible damage", score: 4 },
            { text: "Smart leak detection", score: 1 }
        ]
    },
    {
        question: "How do you manage rainwater?",
        options: [
            { text: "Fully harvest", score: 1 },
            { text: "Partially harvest", score: 2 },
            { text: "Let it drain", score: 4 },
            { text: "Divert to sewage", score: 4 },
            { text: "Ignore", score: 5 },
            { text: "Use storage tanks for multiple purposes", score: 1 }
        ]
    },
    {
        question: "How often do you water plants?",
        options: [
            { text: "Minimal, drip irrigation", score: 1 },
            { text: "Mostly efficient methods", score: 2 },
            { text: "Moderate", score: 3 },
            { text: "Frequently, excessive", score: 4 },
            { text: "Always manual watering", score: 4 },
            { text: "Use recycled water", score: 1 }
        ]
    },
    {
        question: "How often do you use water-saving fixtures?",
        options: [
            { text: "All taps fitted", score: 1 },
            { text: "Most taps", score: 2 },
            { text: "Some taps", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Use automatic sensor faucets", score: 1 }
        ]
    },
    // Section D: Food & Consumption Habits (Q19-Q24)
    {
        question: "How often do you eat meat?",
        options: [
            { text: "Never (vegan)", score: 1 },
            { text: "Rarely", score: 2 },
            { text: "1–2 times/week", score: 3 },
            { text: "3–4 times/week", score: 4 },
            { text: "Daily", score: 5 },
            { text: "Locally sourced, small portions", score: 2 }
        ]
    },
    {
        question: "How do you handle food waste?",
        options: [
            { text: "Compost", score: 1 },
            { text: "Feed animals", score: 2 },
            { text: "Donate leftovers", score: 1 },
            { text: "Throw in trash", score: 4 },
            { text: "Burn", score: 5 },
            { text: "Upcycle creatively", score: 1 }
        ]
    },
    {
        question: "How often buy packaged foods?",
        options: [
            { text: "Never", score: 1 },
            { text: "Rarely", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Often", score: 4 },
            { text: "Always", score: 5 },
            { text: "Choose eco-friendly packaging", score: 2 }
        ]
    },
    {
        question: "How do you store food?",
        options: [
            { text: "Efficiently to minimize spoilage", score: 1 },
            { text: "Mostly organized", score: 2 },
            { text: "Occasionally waste", score: 3 },
            { text: "Often spoil food", score: 4 },
            { text: "Random storage", score: 5 },
            { text: "Use airtight and reusable containers", score: 1 }
        ]
    },
    {
        question: "How often do you support local farmers?",
        options: [
            { text: "Always", score: 1 },
            { text: "Often", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Buy seasonal produce", score: 1 }
        ]
    },
    {
        question: "How do you reduce packaging waste from food?",
        options: [
            { text: "Bring own containers", score: 1 },
            { text: "Buy bulk", score: 2 },
            { text: "Use store-provided reusable", score: 2 },
            { text: "Occasionally", score: 3 },
            { text: "Never", score: 5 },
            { text: "Share leftovers with neighbors", score: 1 }
        ]
    },
    // Section E: Travel & Mobility (Q25-Q30)
    {
        question: "How often do you use public transport?",
        options: [
            { text: "Always", score: 1 },
            { text: "Mostly", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Use shared rides", score: 2 }
        ]
    },
    {
        question: "How often do you cycle/walk for short trips?",
        options: [
            { text: "Always", score: 1 },
            { text: "Mostly", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Use e-bikes or scooters", score: 2 }
        ]
    },
    {
        question: "How often do you take flights?",
        options: [
            { text: "Never", score: 1 },
            { text: "Rarely", score: 2 },
            { text: "Occasionally", score: 3 },
            { text: "Frequently", score: 4 },
            { text: "Always", score: 5 },
            { text: "Offset carbon via green projects", score: 2 }
        ]
    },
    {
        question: "How do you maintain your vehicle?",
        options: [
            { text: "Optimize fuel efficiency", score: 2 },
            { text: "Maintain partially", score: 3 },
            { text: "Minimal maintenance", score: 4 },
            { text: "Rarely check", score: 5 },
            { text: "Never", score: 5 },
            { text: "Use electric/hybrid vehicles", score: 1 }
        ]
    },
    {
        question: "How do you combine trips?",
        options: [
            { text: "Always plan efficiently", score: 1 },
            { text: "Often", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Carpool whenever possible", score: 1 }
        ]
    },
    {
        question: "How do you reduce emissions from deliveries?",
        options: [
            { text: "Consolidate orders", score: 1 },
            { text: "Choose eco-friendly delivery", score: 2 },
            { text: "Occasionally consider", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Pick-up from stores instead", score: 1 }
        ]
    },
    // Section F: Lifestyle & Miscellaneous (Q31-Q40)
    {
        question: "How often do you buy new clothes?",
        options: [
            { text: "Never, only thrift/second-hand", score: 1 },
            { text: "Rarely", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Frequently", score: 4 },
            { text: "Always", score: 5 },
            { text: "Prioritize sustainable brands", score: 2 }
        ]
    },
    {
        question: "How do you dispose of old clothes?",
        options: [
            { text: "Donate", score: 1 },
            { text: "Recycle", score: 1 },
            { text: "Upcycle", score: 1 },
            { text: "Throw away", score: 4 },
            { text: "Burn", score: 5 },
            { text: "Sell for reuse", score: 1 }
        ]
    },
    {
        question: "How often do you participate in environmental events?",
        options: [
            { text: "Always", score: 1 },
            { text: "Often", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Host your own events", score: 1 }
        ]
    },
    {
        question: "How do you minimize paper usage?",
        options: [
            { text: "Digital documents only", score: 1 },
            { text: "Mostly digital", score: 2 },
            { text: "Occasionally paper", score: 3 },
            { text: "Frequently use paper", score: 4 },
            { text: "Always print everything", score: 5 },
            { text: "Reuse scrap paper", score: 2 }
        ]
    },
    {
        question: "How often do you educate others about sustainability?",
        options: [
            { text: "Always", score: 1 },
            { text: "Often", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Online & offline campaigns", score: 1 }
        ]
    },
    {
        question: "How do you handle chemicals/cleaning products?",
        options: [
            { text: "Eco-friendly only", score: 1 },
            { text: "Mostly eco-friendly", score: 2 },
            { text: "Mix of products", score: 3 },
            { text: "Standard chemicals", score: 4 },
            { text: "Always chemical-heavy", score: 5 },
            { text: "DIY natural cleaners", score: 1 }
        ]
    },
    {
        question: "How often do you plant trees or greenery?",
        options: [
            { text: "Frequently", score: 1 },
            { text: "Often", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Participate in community greening", score: 1 }
        ]
    },
    {
        question: "How do you monitor environmental impact at home?",
        options: [
            { text: "Use apps & devices", score: 1 },
            { text: "Track manually", score: 2 },
            { text: "Occasionally check", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Share data with smart platforms", score: 1 }
        ]
    },
    {
        question: "How do you reduce noise & light pollution?",
        options: [
            { text: "Always mindful", score: 1 },
            { text: "Mostly", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Smart devices for automation", score: 1 }
        ]
    },
    {
        question: "How often do you innovate eco-friendly solutions personally?",
        options: [
            { text: "Always", score: 1 },
            { text: "Often", score: 2 },
            { text: "Sometimes", score: 3 },
            { text: "Rarely", score: 4 },
            { text: "Never", score: 5 },
            { text: "Participate in hackathons or projects", score: 1 }
        ]
    }
];

let currentQuestionIndex = 0;
let answers = [];
let totalScore = 0;

function initQuiz() {
    showQuestion(currentQuestionIndex);
    updateProgress();
}

function showQuestion(index) {
    const question = questions[index];
    const questionContainer = document.getElementById('currentQuestion');
    const questionCounter = document.getElementById('questionCounter');
    
    questionCounter.textContent = `Question ${index + 1} of ${questions.length}`;
    
    // Clear container safely
    questionContainer.innerHTML = '';
    
    // Create elements safely
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    
    const h3 = document.createElement('h3');
    h3.textContent = question.question;
    questionDiv.appendChild(h3);
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    
    question.options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.setAttribute('data-option', optionIndex);
        optionDiv.textContent = `${String.fromCharCode(65 + optionIndex)}) ${option.text}`;
        optionDiv.addEventListener('click', () => selectOption(optionIndex));
        optionsDiv.appendChild(optionDiv);
    });
    
    questionDiv.appendChild(optionsDiv);
    questionContainer.appendChild(questionDiv);
    
    // Restore previous selection if exists
    if (answers[index] !== undefined) {
        const selectedOption = document.querySelector(`[data-option="${answers[index]}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }
    
    updateNavigationButtons();
}

function selectOption(optionIndex) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    // Add selection to clicked option with null check
    const selectedElement = document.querySelector(`[data-option="${optionIndex}"]`);
    if (selectedElement) {
        selectedElement.classList.add('selected');
    }
    
    // Store answer
    answers[currentQuestionIndex] = optionIndex;
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = answers[currentQuestionIndex] !== undefined ? 'inline-block' : 'none';
    } else {
        nextBtn.style.display = answers[currentQuestionIndex] !== undefined ? 'inline-block' : 'none';
        submitBtn.style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

function calculateScore() {
    totalScore = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] !== undefined && questions[i] && questions[i].options && questions[i].options[answers[i]]) {
            totalScore += questions[i].options[answers[i]].score;
        }
    }
    return totalScore;
}

function getImpactLevel(score) {
    // Based on realistic score ranges (40-200)
    if (score <= 80) {
        return { level: 'Low Impact', class: 'low-impact', message: 'Excellent! You have a very low carbon footprint (4-7 tons/year).' };
    } else if (score <= 140) {
        return { level: 'Medium Impact', class: 'medium-impact', message: 'Good effort! You\'re near the global average (7-12 tons/year).' };
    } else {
        return { level: 'High Impact', class: 'high-impact', message: 'Consider making significant lifestyle changes (12-16+ tons/year).' };
    }
}

function generateRecommendations(score) {
    let recommendations = [];
    
    if (score <= 80) {
        // Low impact - maintain good habits
        recommendations = [
            "🌟 Keep up your excellent eco-friendly habits!",
            "📢 Share your knowledge with friends and family",
            "🌱 Consider carbon offsetting for remaining emissions",
            "🔬 Explore cutting-edge green technologies",
            "🏆 Become a sustainability advocate in your community"
        ];
    } else if (score <= 140) {
        // Medium impact - targeted improvements
        recommendations = [
            "🚲 Use public transport or bike more often",
            "🥗 Reduce meat consumption to 2-3 times per week",
            "🏠 Improve home insulation and use smart thermostats",
            "♻️ Eliminate single-use plastics completely",
            "💡 Switch to LED bulbs and energy-efficient appliances"
        ];
    } else {
        // High impact - major lifestyle changes needed
        recommendations = [
            "🌱 Switch to 100% renewable energy sources",
            "✈️ Reduce or eliminate air travel, choose local vacations",
            "🚗 Consider electric/hybrid vehicle or car-sharing",
            "🥬 Adopt plant-based diet or significantly reduce meat",
            "🏠 Major home efficiency upgrades (insulation, windows, HVAC)"
        ];
    }
    
    return recommendations;
}

async function submitQuiz() {
    const score = calculateScore();
    
    // Realistic calculation based on EPA data:
    // Best case (score 40): 4 tons CO₂/year (very eco-conscious)
    // Average case (score 120): 10 tons CO₂/year (typical American)
    // Worst case (score 200): 16 tons CO₂/year (high consumption)
    const minFootprint = 4;   // tons CO₂/year
    const maxFootprint = 16;  // tons CO₂/year
    const minScore = 40;      // best possible score
    const maxScore = 200;     // worst possible score
    
    const carbonFootprint = (minFootprint + (score - minScore) / (maxScore - minScore) * (maxFootprint - minFootprint)).toFixed(1);
    const impact = getImpactLevel(score);
    const recommendations = generateRecommendations(score);
    
    // Store results for global impact calculator
    localStorage.setItem('carbonFootprint', carbonFootprint);
    
    // Save to backend if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
        try {
            await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    score: score, 
                    carbonFootprint: parseFloat(carbonFootprint), 
                    answers: answers 
                })
            });
        } catch (error) {
            console.log('Failed to save quiz result');
        }
    }
    
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    // Update score display safely
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = '';
    
    const scoreDiv = document.createElement('div');
    scoreDiv.className = `impact-score ${impact.class}`;
    scoreDiv.textContent = `${carbonFootprint} tons CO₂/year`;
    scoreDisplay.appendChild(scoreDiv);
    
    if (token) {
        const pointsP = document.createElement('p');
        pointsP.style.color = '#28a745';
        pointsP.style.fontWeight = 'bold';
        pointsP.textContent = '🎉 +10 points earned!';
        scoreDisplay.appendChild(pointsP);
    }
    
    // Update impact level safely
    const impactLevel = document.getElementById('impactLevel');
    impactLevel.innerHTML = '';
    
    const h3 = document.createElement('h3');
    h3.className = impact.class;
    h3.textContent = impact.level;
    impactLevel.appendChild(h3);
    
    const p = document.createElement('p');
    p.textContent = impact.message;
    impactLevel.appendChild(p);
    
    document.getElementById('recommendations').innerHTML = `
        <h4>Personalized Recommendations:</h4>
        <ul>
            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        ${!token ? '<p><a href="login.html" class="btn">Login to earn points and track progress!</a></p>' : ''}
    `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
});
