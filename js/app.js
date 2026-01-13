// ===== APPLICATION STATE & DATA =====
const AppData = {
    // User Profile
    profile: {
        name: "Damien",
        age: 33,
        height: 190,
        startWeight: 114,
        currentWeight: 114,
        targetWeight: 94,
        startDate: "2026-01-07",
        raceDate: "2026-04-05"
    },
    
    // Weight History
    weights: [],
    
    // Measurements History
    measurements: [],
    
    // Sessions Completed
    sessions: [],
    
    // Journal Entries
    journal: [],
    
    // Badges
    badges: [
        { id: 'first-session', name: 'Première Séance', icon: 'fa-star', unlocked: false, date: null },
        { id: 'week-complete', name: '1 Semaine Complète', icon: 'fa-calendar-check', unlocked: false, date: null },
        { id: 'month-complete', name: '1 Mois Sans Interruption', icon: 'fa-medal', unlocked: false, date: null },
        { id: 'weight-5kg', name: '5kg Perdus', icon: 'fa-weight-scale', unlocked: false, date: null },
        { id: 'weight-10kg', name: '10kg Perdus', icon: 'fa-trophy', unlocked: false, date: null },
        { id: 'weight-15kg', name: '15kg Perdus', icon: 'fa-crown', unlocked: false, date: null },
        { id: 'weight-goal', name: 'Objectif Atteint', icon: 'fa-flag-checkered', unlocked: false, date: null },
        { id: 'race-complete', name: 'Course 10km Réussie', icon: 'fa-running', unlocked: false, date: null },
        { id: 'sessions-25', name: '25 Séances', icon: 'fa-fire', unlocked: false, date: null },
        { id: 'sessions-50', name: '50 Séances', icon: 'fa-fire-flame-curved', unlocked: false, date: null }
    ],
    
    // Nutrition Tracking
    nutrition: {
        proteinToday: 0,
        waterToday: 0,
        lastResetDate: null
    },
    
    // Coach Tips
    coachTips: [
        "L'échauffement n'est pas optionnel ! 5 minutes d'échauffement peuvent prévenir des semaines de blessure. Prends soin de ton corps, il est ton meilleur allié.",
        "La progression vient de la constance, pas de l'intensité. Mieux vaut 3 séances modérées par semaine que 1 séance intense suivie d'une semaine d'arrêt.",
        "Ton corps construit du muscle pendant le repos, pas pendant l'entraînement. 7-9h de sommeil = muscle + récupération + perte de poids optimale.",
        "L'hydratation commence AVANT la séance. Bois 500ml d'eau 2h avant ton entraînement pour une performance optimale.",
        "Les protéines ne sont pas que pour les bodybuilders ! Elles sont essentielles pour maintenir ta masse musculaire pendant la perte de poids.",
        "Ton genoux droit mérite une attention particulière. Si tu ressens une douleur, arrête immédiatement et adapte l'exercice.",
        "La balance peut stagner alors que tu perds du gras et gagnes du muscle. Prends des photos mensuelles, elles ne mentent jamais.",
        "Un coureur fort est un coureur rapide. Chaque exercice de musculation améliore ta performance en course.",
        "Respire ! La respiration correcte pendant les exercices améliore ta performance et réduit le risque de blessure.",
        "La douleur musculaire (courbatures) est normale. La douleur articulaire ne l'est PAS. Apprends à les différencier."
    ]
};

// ===== TIMER STATE =====
let timerInterval = null;
let timerSeconds = 0;
let timerPaused = false;

// ===== LOCAL STORAGE =====
function saveData() {
    localStorage.setItem('fitCoachData', JSON.stringify(AppData));
}

function loadData() {
    const saved = localStorage.getItem('fitCoachData');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(AppData, parsed);
    }
    
    // Add initial weight entry if none exists
    if (AppData.weights.length === 0) {
        AppData.weights.push({
            date: AppData.profile.startDate,
            weight: AppData.profile.startWeight
        });
        saveData();
    }
    
    // Check if we need to reset nutrition for new day
    const today = new Date().toDateString();
    if (AppData.nutrition.lastResetDate !== today) {
        AppData.nutrition.proteinToday = 0;
        AppData.nutrition.waterToday = 0;
        AppData.nutrition.lastResetDate = today;
        saveData();
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeNavigation();
    initializeProgram();
    updateDashboard();
    updateProgress();
    updateJournal();
    updateNutrition();
    initializeWaterTracker();
    initializeModals();
    showDailyTip();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.dataset.section;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            
            // Update specific sections when shown
            if (targetSection === 'progress') {
                updateProgress();
            } else if (targetSection === 'journal') {
                updateJournal();
            } else if (targetSection === 'nutrition') {
                updateNutrition();
            } else if (targetSection === 'dashboard') {
                updateDashboard();
            }
        });
    });
}

function goToProgram() {
    document.querySelector('[data-section="program"]').click();
}

// ===== PROGRAM =====
function initializeProgram() {
    // Program tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const programContents = document.querySelectorAll('.program-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const day = btn.dataset.day;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            programContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${day}-program`).classList.add('active');
        });
    });
}

function toggleExercise(button) {
    const card = button.closest('.exercise-card');
    const details = card.querySelector('.exercise-details');
    const icon = button.querySelector('i');
    
    details.classList.toggle('expanded');
    
    if (details.classList.contains('expanded')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function completeSession(day) {
    const dayNames = {
        tuesday: 'Mardi - Haut du Corps',
        wednesday: 'Mercredi - Bas du Corps',
        saturday: 'Samedi - Full Body'
    };
    
    const session = {
        date: new Date().toISOString(),
        type: day,
        name: dayNames[day]
    };
    
    AppData.sessions.push(session);
    saveData();
    
    // Check for badges
    checkBadges();
    
    // Update dashboard
    updateDashboard();
    
    // Show success toast
    showToast('Séance complétée ! Bravo 💪');
    
    // Switch to journal to encourage logging
    setTimeout(() => {
        document.querySelector('[data-section="journal"]').click();
        showAddJournalModal();
    }, 1500);
}

// ===== TIMER =====
function startTimer(seconds) {
    timerSeconds = seconds;
    timerPaused = false;
    
    const modal = document.getElementById('timerModal');
    modal.classList.add('active');
    
    updateTimerDisplay();
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        if (!timerPaused && timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
            
            if (timerSeconds === 0) {
                clearInterval(timerInterval);
                playTimerSound();
                showToast('Temps de repos terminé ! 🔔');
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const display = document.getElementById('timerCountdown');
    display.textContent = timerSeconds;
    
    // Change color based on time
    if (timerSeconds <= 10) {
        display.style.color = 'var(--danger-red)';
    } else if (timerSeconds <= 30) {
        display.style.color = 'var(--warning-orange)';
    } else {
        display.style.color = 'var(--primary-blue)';
    }
}

function pauseTimer() {
    timerPaused = !timerPaused;
    const pauseIcon = document.getElementById('pauseIcon');
    const pauseText = document.getElementById('pauseText');
    
    if (timerPaused) {
        pauseIcon.classList.remove('fa-pause');
        pauseIcon.classList.add('fa-play');
        pauseText.textContent = 'Reprendre';
    } else {
        pauseIcon.classList.remove('fa-play');
        pauseIcon.classList.add('fa-pause');
        pauseText.textContent = 'Pause';
    }
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    closeTimer();
}

function closeTimer() {
    const modal = document.getElementById('timerModal');
    modal.classList.remove('active');
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

function playTimerSound() {
    // Create audio context for beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ===== DASHBOARD =====
function updateDashboard() {
    // Race countdown
    updateRaceCountdown();
    
    // Current weight
    const currentWeight = AppData.weights.length > 0 
        ? AppData.weights[AppData.weights.length - 1].weight 
        : AppData.profile.startWeight;
    
    AppData.profile.currentWeight = currentWeight;
    document.getElementById('currentWeight').textContent = `${currentWeight} kg`;
    
    // Progress
    const weightLost = AppData.profile.startWeight - currentWeight;
    const totalToLose = AppData.profile.startWeight - AppData.profile.targetWeight;
    const progressPercent = Math.round((weightLost / totalToLose) * 100);
    
    document.getElementById('kgLost').textContent = weightLost.toFixed(1);
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    
    // Sessions
    const totalSessions = AppData.sessions.length;
    const weekSessions = getSessionsThisWeek();
    
    document.getElementById('completedSessions').textContent = totalSessions;
    document.getElementById('weekSessions').textContent = weekSessions;
    
    // Badges
    const unlockedBadges = AppData.badges.filter(b => b.unlocked).length;
    document.getElementById('badgeCount').textContent = unlockedBadges;
    
    // Weight change indicator
    if (weightLost > 0) {
        document.getElementById('weightChange').innerHTML = `Objectif: 94 kg <span style="color: var(--success-green)">(-${weightLost.toFixed(1)} kg)</span>`;
    }
}

function updateRaceCountdown() {
    const raceDate = new Date(AppData.profile.raceDate);
    const now = new Date();
    const diff = raceDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    document.getElementById('daysLeft').textContent = days;
    document.getElementById('hoursLeft').textContent = hours;
}

function getSessionsThisWeek() {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
    weekStart.setHours(0, 0, 0, 0);
    
    return AppData.sessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= weekStart;
    }).length;
}

function showDailyTip() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const tipIndex = dayOfYear % AppData.coachTips.length;
    document.getElementById('dailyTip').textContent = AppData.coachTips[tipIndex];
}

// ===== PROGRESS =====
function updateProgress() {
    updateWeightChart();
    updateSessionsChart();
    updateMeasurements();
    updateBadges();
    
    // Update weight stats
    const currentWeight = AppData.profile.currentWeight;
    const remaining = currentWeight - AppData.profile.targetWeight;
    
    document.getElementById('progressCurrentWeight').textContent = `${currentWeight} kg`;
    document.getElementById('remainingWeight').textContent = `${remaining.toFixed(1)} kg`;
}

function updateWeightChart() {
    const ctx = document.getElementById('weightChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.weightChartInstance) {
        window.weightChartInstance.destroy();
    }
    
    const labels = AppData.weights.map(w => {
        const date = new Date(w.date);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    });
    
    const data = AppData.weights.map(w => w.weight);
    
    // Generate goal line
    const goalData = new Array(labels.length).fill(AppData.profile.targetWeight);
    
    window.weightChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Poids (kg)',
                    data: data,
                    borderColor: 'rgb(37, 99, 235)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgb(37, 99, 235)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Objectif',
                    data: goalData,
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' kg';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: AppData.profile.targetWeight - 5,
                    max: AppData.profile.startWeight + 2,
                    ticks: {
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                }
            }
        }
    });
}

function updateSessionsChart() {
    const ctx = document.getElementById('sessionsChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.sessionsChartInstance) {
        window.sessionsChartInstance.destroy();
    }
    
    // Count sessions by week
    const weekLabels = [];
    const weekCounts = [];
    
    const startDate = new Date(AppData.profile.startDate);
    const now = new Date();
    const weeksCount = Math.ceil((now - startDate) / (7 * 24 * 60 * 60 * 1000)) || 1;
    
    for (let i = 0; i < Math.min(weeksCount, 12); i++) {
        weekLabels.push(`S${i + 1}`);
        
        const weekStart = new Date(startDate);
        weekStart.setDate(startDate.getDate() + (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        
        const count = AppData.sessions.filter(session => {
            const sessionDate = new Date(session.date);
            return sessionDate >= weekStart && sessionDate < weekEnd;
        }).length;
        
        weekCounts.push(count);
    }
    
    window.sessionsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weekLabels,
            datasets: [{
                label: 'Séances par Semaine',
                data: weekCounts,
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function updateMeasurements() {
    if (AppData.measurements.length === 0) {
        return;
    }
    
    const latest = AppData.measurements[AppData.measurements.length - 1];
    const grid = document.getElementById('measurementsGrid');
    
    if (latest.waist) {
        grid.children[0].querySelector('.measurement-value').textContent = `${latest.waist} cm`;
    }
    if (latest.chest) {
        grid.children[1].querySelector('.measurement-value').textContent = `${latest.chest} cm`;
    }
    if (latest.thigh) {
        grid.children[2].querySelector('.measurement-value').textContent = `${latest.thigh} cm`;
    }
    if (latest.arm) {
        grid.children[3].querySelector('.measurement-value').textContent = `${latest.arm} cm`;
    }
}

function updateBadges() {
    const grid = document.getElementById('badgesGrid');
    grid.innerHTML = '';
    
    AppData.badges.forEach(badge => {
        const badgeDiv = document.createElement('div');
        badgeDiv.className = `badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`;
        
        badgeDiv.innerHTML = `
            <div class="badge-icon">
                <i class="fas ${badge.icon}"></i>
            </div>
            <div class="badge-name">${badge.name}</div>
            ${badge.unlocked ? `<div class="badge-date">${new Date(badge.date).toLocaleDateString('fr-FR')}</div>` : ''}
        `;
        
        grid.appendChild(badgeDiv);
    });
}

function checkBadges() {
    const totalSessions = AppData.sessions.length;
    const weightLost = AppData.profile.startWeight - AppData.profile.currentWeight;
    
    // First session
    if (totalSessions >= 1 && !AppData.badges.find(b => b.id === 'first-session').unlocked) {
        unlockBadge('first-session');
    }
    
    // Weight milestones
    if (weightLost >= 5 && !AppData.badges.find(b => b.id === 'weight-5kg').unlocked) {
        unlockBadge('weight-5kg');
    }
    if (weightLost >= 10 && !AppData.badges.find(b => b.id === 'weight-10kg').unlocked) {
        unlockBadge('weight-10kg');
    }
    if (weightLost >= 15 && !AppData.badges.find(b => b.id === 'weight-15kg').unlocked) {
        unlockBadge('weight-15kg');
    }
    if (AppData.profile.currentWeight <= AppData.profile.targetWeight && !AppData.badges.find(b => b.id === 'weight-goal').unlocked) {
        unlockBadge('weight-goal');
    }
    
    // Session milestones
    if (totalSessions >= 25 && !AppData.badges.find(b => b.id === 'sessions-25').unlocked) {
        unlockBadge('sessions-25');
    }
    if (totalSessions >= 50 && !AppData.badges.find(b => b.id === 'sessions-50').unlocked) {
        unlockBadge('sessions-50');
    }
    
    // Check for week complete
    if (getSessionsThisWeek() >= 2 && !AppData.badges.find(b => b.id === 'week-complete').unlocked) {
        unlockBadge('week-complete');
    }
}

function unlockBadge(badgeId) {
    const badge = AppData.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
        badge.unlocked = true;
        badge.date = new Date().toISOString();
        saveData();
        showToast(`🏆 Nouveau Badge: ${badge.name} !`);
    }
}

// ===== JOURNAL =====
function updateJournal() {
    const container = document.getElementById('journalEntries');
    
    if (AppData.journal.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <p>Aucune entrée pour le moment</p>
                <p class="empty-subtitle">Commence ton journal en enregistrant ta première séance !</p>
            </div>
        `;
        return;
    }
    
    // Sort by date descending
    const sortedJournal = [...AppData.journal].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = sortedJournal.map(entry => {
        const date = new Date(entry.date);
        const energyPercent = (entry.energy / 10) * 100;
        
        return `
            <div class="journal-entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">${entry.title || 'Séance d\'entraînement'}</div>
                        <div class="entry-date">${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                </div>
                <div class="entry-type">${entry.type}</div>
                <div class="entry-energy">
                    <strong>Niveau d'énergie: ${entry.energy}/10</strong>
                    <div class="energy-bar">
                        <div class="energy-fill" style="width: ${energyPercent}%"></div>
                    </div>
                </div>
                <div class="entry-notes">${entry.notes || 'Aucune note'}</div>
                ${entry.pain ? `
                    <div class="entry-pain">
                        <strong>⚠️ Douleurs signalées:</strong>
                        <p>${entry.pain}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// ===== NUTRITION =====
function updateNutrition() {
    // Update protein progress
    const proteinCurrent = AppData.nutrition.proteinToday;
    const proteinTarget = 150;
    const proteinPercent = Math.min((proteinCurrent / proteinTarget) * 100, 100);
    
    document.getElementById('proteinCurrent').textContent = proteinCurrent;
    document.getElementById('proteinProgress').style.width = `${proteinPercent}%`;
    
    // Update water tracker
    const waterCount = AppData.nutrition.waterToday;
    document.getElementById('waterCount').textContent = waterCount;
    document.getElementById('waterLiters').textContent = (waterCount * 0.25).toFixed(2);
    
    // Update water glasses visual
    updateWaterGlasses();
}

function initializeWaterTracker() {
    const container = document.getElementById('waterGlasses');
    container.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const glass = document.createElement('div');
        glass.className = 'water-glass';
        glass.innerHTML = '<i class="fas fa-glass-water"></i>';
        glass.dataset.index = i;
        
        glass.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            
            // Toggle: if clicking on filled glass, unfill from that point
            if (index < AppData.nutrition.waterToday) {
                AppData.nutrition.waterToday = index;
            } else {
                AppData.nutrition.waterToday = index + 1;
            }
            
            saveData();
            updateNutrition();
        });
        
        container.appendChild(glass);
    }
    
    updateWaterGlasses();
}

function updateWaterGlasses() {
    const glasses = document.querySelectorAll('.water-glass');
    glasses.forEach((glass, index) => {
        if (index < AppData.nutrition.waterToday) {
            glass.classList.add('filled');
        } else {
            glass.classList.remove('filled');
        }
    });
}

function addProtein() {
    const input = document.getElementById('proteinInput');
    const amount = parseInt(input.value);
    
    if (amount && amount > 0) {
        AppData.nutrition.proteinToday += amount;
        saveData();
        updateNutrition();
        input.value = '';
        showToast(`+${amount}g de protéines ajoutées`);
    }
}

function resetWater() {
    if (confirm('Réinitialiser le compteur d\'eau pour aujourd\'hui ?')) {
        AppData.nutrition.waterToday = 0;
        saveData();
        updateNutrition();
        showToast('Compteur d\'eau réinitialisé');
    }
}

// ===== MODALS =====
function initializeModals() {
    // Close modals on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Initialize date inputs to today
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
    
    // Energy range slider
    const energySlider = document.getElementById('journalEnergy');
    const energyValue = document.getElementById('energyValue');
    
    if (energySlider && energyValue) {
        energySlider.addEventListener('input', function() {
            energyValue.textContent = this.value;
        });
    }
}

function showAddWeightModal() {
    const modal = document.getElementById('addWeightModal');
    modal.classList.add('active');
    
    // Set date to today
    document.getElementById('weightDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('weightValue').value = '';
}

function showAddMeasurementsModal() {
    const modal = document.getElementById('addMeasurementsModal');
    modal.classList.add('active');
    
    // Set date to today
    document.getElementById('measurementDate').value = new Date().toISOString().split('T')[0];
}

function showAddJournalModal() {
    const modal = document.getElementById('addJournalModal');
    modal.classList.add('active');
    
    // Set date to today
    document.getElementById('journalDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('journalEnergy').value = 5;
    document.getElementById('energyValue').textContent = 5;
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function saveWeight() {
    const date = document.getElementById('weightDate').value;
    const weight = parseFloat(document.getElementById('weightValue').value);
    
    if (!date || !weight) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    AppData.weights.push({ date, weight });
    AppData.profile.currentWeight = weight;
    
    // Sort by date
    AppData.weights.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    saveData();
    checkBadges();
    updateDashboard();
    updateProgress();
    
    closeModal('addWeightModal');
    showToast('Poids enregistré avec succès');
}

function saveMeasurements() {
    const date = document.getElementById('measurementDate').value;
    const waist = parseFloat(document.getElementById('waistMeasurement').value) || null;
    const chest = parseFloat(document.getElementById('chestMeasurement').value) || null;
    const thigh = parseFloat(document.getElementById('thighMeasurement').value) || null;
    const arm = parseFloat(document.getElementById('armMeasurement').value) || null;
    
    if (!date) {
        alert('Veuillez sélectionner une date');
        return;
    }
    
    AppData.measurements.push({ date, waist, chest, thigh, arm });
    
    // Sort by date
    AppData.measurements.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    saveData();
    updateProgress();
    
    closeModal('addMeasurementsModal');
    showToast('Mensurations enregistrées avec succès');
}

function saveJournal() {
    const date = document.getElementById('journalDate').value;
    const type = document.getElementById('journalType').options[document.getElementById('journalType').selectedIndex].text;
    const energy = parseInt(document.getElementById('journalEnergy').value);
    const notes = document.getElementById('journalNotes').value;
    const pain = document.getElementById('journalPain').value;
    
    if (!date) {
        alert('Veuillez sélectionner une date');
        return;
    }
    
    AppData.journal.push({
        date,
        type,
        energy,
        notes,
        pain
    });
    
    saveData();
    updateJournal();
    
    closeModal('addJournalModal');
    showToast('Entrée journal enregistrée');
}

// ===== PROFILE ACTIONS =====
function exportData() {
    const dataStr = JSON.stringify(AppData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitcoach-damien-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('Données exportées avec succès');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                Object.assign(AppData, imported);
                saveData();
                
                // Refresh all sections
                updateDashboard();
                updateProgress();
                updateJournal();
                updateNutrition();
                
                showToast('Données importées avec succès');
            } catch (error) {
                alert('Erreur lors de l\'import des données. Fichier invalide.');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function resetApp() {
    if (confirm('⚠️ ATTENTION: Cette action supprimera TOUTES tes données (poids, séances, journal, etc.). Cette action est IRRÉVERSIBLE. Es-tu sûr de vouloir continuer ?')) {
        if (confirm('Dernière confirmation: Supprimer toutes les données ?')) {
            localStorage.removeItem('fitCoachData');
            location.reload();
        }
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message) {
    const toast = document.getElementById('successToast');
    const messageEl = document.getElementById('toastMessage');
    
    messageEl.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== UPDATE COUNTDOWN EVERY MINUTE =====
setInterval(updateRaceCountdown, 60000);