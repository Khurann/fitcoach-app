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
    try {
        localStorage.setItem('fitCoachData', JSON.stringify(AppData));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function loadData() {
    try {
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
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        loadData();
        initializeNavigation();
        initializeProgram();
        updateDashboard();
        
        // Try to update progress with error handling
        try {
            updateProgress();
        } catch (e) {
            console.error('Error updating progress:', e);
        }
        
        try {
            updateJournal();
        } catch (e) {
            console.error('Error updating journal:', e);
        }
        
        try {
            updateNutrition();
        } catch (e) {
            console.error('Error updating nutrition:', e);
        }
        
        try {
            initializeWaterTracker();
        } catch (e) {
            console.error('Error initializing water tracker:', e);
        }
        
        initializeModals();
        showDailyTip();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetSection = this.dataset.section;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Update specific sections when shown
            try {
                if (targetSection === 'progress') {
                    updateProgress();
                } else if (targetSection === 'journal') {
                    updateJournal();
                } else if (targetSection === 'nutrition') {
                    updateNutrition();
                } else if (targetSection === 'dashboard') {
                    updateDashboard();
                }
            } catch (error) {
                console.error('Error updating section:', error);
                // Section will still display even if update fails
            }
        });
    });
}

function goToProgram() {
    const programBtn = document.querySelector('[data-section="program"]');
    if (programBtn) {
        programBtn.click();
    }
}

// ===== PROGRAM =====
function initializeProgram() {
    // Program tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const programContents = document.querySelectorAll('.program-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const day = this.dataset.day;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            programContents.forEach(content => content.classList.remove('active'));
            const targetContent = document.getElementById(`${day}-program`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function toggleExercise(element) {
    try {
        // Find the card
        let card = element;
        while (card && !card.classList.contains('exercise-card')) {
            card = card.parentElement;
        }
        
        if (!card) return;
        
        const details = card.querySelector('.exercise-details');
        const icon = card.querySelector('.btn-expand i');
        
        if (!details) return;
        
        details.classList.toggle('expanded');
        
        if (icon) {
            if (details.classList.contains('expanded')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    } catch (error) {
        console.error('Error toggling exercise:', error);
    }
}

function completeSession(day) {
    try {
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
            const journalBtn = document.querySelector('[data-section="journal"]');
            if (journalBtn) {
                journalBtn.click();
                setTimeout(() => {
                    showAddJournalModal();
                }, 300);
            }
        }, 1500);
    } catch (error) {
        console.error('Error completing session:', error);
        showToast('Erreur lors de l\'enregistrement de la séance');
    }
}

// ===== TIMER =====
function startTimer(seconds) {
    try {
        timerSeconds = seconds;
        timerPaused = false;
        
        const modal = document.getElementById('timerModal');
        if (modal) {
            modal.classList.add('active');
        }
        
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
    } catch (error) {
        console.error('Error starting timer:', error);
    }
}

function updateTimerDisplay() {
    const display = document.getElementById('timerCountdown');
    if (!display) return;
    
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
    
    if (pauseIcon && pauseText) {
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
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    closeTimer();
}

function closeTimer() {
    const modal = document.getElementById('timerModal');
    if (modal) {
        modal.classList.remove('active');
    }
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

function playTimerSound() {
    try {
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
    } catch (error) {
        console.error('Error playing timer sound:', error);
    }
}

// ===== DASHBOARD =====
function updateDashboard() {
    try {
        // Race countdown
        updateRaceCountdown();
        
        // Current weight
        const currentWeight = AppData.weights.length > 0 
            ? AppData.weights[AppData.weights.length - 1].weight 
            : AppData.profile.startWeight;
        
        AppData.profile.currentWeight = currentWeight;
        const currentWeightEl = document.getElementById('currentWeight');
        if (currentWeightEl) {
            currentWeightEl.textContent = `${currentWeight} kg`;
        }
        
        // Progress
        const weightLost = AppData.profile.startWeight - currentWeight;
        const totalToLose = AppData.profile.startWeight - AppData.profile.targetWeight;
        const progressPercent = Math.round((weightLost / totalToLose) * 100);
        
        const kgLostEl = document.getElementById('kgLost');
        const progressPercentEl = document.getElementById('progressPercent');
        
        if (kgLostEl) kgLostEl.textContent = weightLost.toFixed(1);
        if (progressPercentEl) progressPercentEl.textContent = `${progressPercent}%`;
        
        // Sessions
        const totalSessions = AppData.sessions.length;
        const weekSessions = getSessionsThisWeek();
        
        const completedSessionsEl = document.getElementById('completedSessions');
        const weekSessionsEl = document.getElementById('weekSessions');
        
        if (completedSessionsEl) completedSessionsEl.textContent = totalSessions;
        if (weekSessionsEl) weekSessionsEl.textContent = weekSessions;
        
        // Badges
        const unlockedBadges = AppData.badges.filter(b => b.unlocked).length;
        const badgeCountEl = document.getElementById('badgeCount');
        if (badgeCountEl) badgeCountEl.textContent = unlockedBadges;
        
        // Weight change indicator
        const weightChangeEl = document.getElementById('weightChange');
        if (weightChangeEl && weightLost > 0) {
            weightChangeEl.innerHTML = `Objectif: 94 kg <span style="color: var(--success-green)">(-${weightLost.toFixed(1)} kg)</span>`;
        }
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

function updateRaceCountdown() {
    try {
        const raceDate = new Date(AppData.profile.raceDate);
        const now = new Date();
        const diff = raceDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        const daysLeftEl = document.getElementById('daysLeft');
        const hoursLeftEl = document.getElementById('hoursLeft');
        
        if (daysLeftEl) daysLeftEl.textContent = days > 0 ? days : 0;
        if (hoursLeftEl) hoursLeftEl.textContent = hours > 0 ? hours : 0;
    } catch (error) {
        console.error('Error updating race countdown:', error);
    }
}

function getSessionsThisWeek() {
    try {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
        weekStart.setHours(0, 0, 0, 0);
        
        return AppData.sessions.filter(session => {
            const sessionDate = new Date(session.date);
            return sessionDate >= weekStart;
        }).length;
    } catch (error) {
        console.error('Error getting sessions this week:', error);
        return 0;
    }
}

function showDailyTip() {
    try {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const tipIndex = dayOfYear % AppData.coachTips.length;
        const dailyTipEl = document.getElementById('dailyTip');
        if (dailyTipEl) {
            dailyTipEl.textContent = AppData.coachTips[tipIndex];
        }
    } catch (error) {
        console.error('Error showing daily tip:', error);
    }
}

// ===== PROGRESS =====
function updateProgress() {
    try {
        updateWeightChart();
        updateSessionsChart();
        updateMeasurements();
        updateBadges();
        
        // Update weight stats
        const currentWeight = AppData.profile.currentWeight;
        const remaining = currentWeight - AppData.profile.targetWeight;
        
        const progressCurrentWeightEl = document.getElementById('progressCurrentWeight');
        const remainingWeightEl = document.getElementById('remainingWeight');
        
        if (progressCurrentWeightEl) progressCurrentWeightEl.textContent = `${currentWeight} kg`;
        if (remainingWeightEl) remainingWeightEl.textContent = `${remaining.toFixed(1)} kg`;
    } catch (error) {
        console.error('Error updating progress:', error);
    }
}

function updateWeightChart() {
    try {
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
    } catch (error) {
        console.error('Error updating weight chart:', error);
    }
}

function updateSessionsChart() {
    try {
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
    } catch (error) {
        console.error('Error updating sessions chart:', error);
    }
}

function updateMeasurements() {
    try {
        if (AppData.measurements.length === 0) {
            return;
        }
        
        const latest = AppData.measurements[AppData.measurements.length - 1];
        const grid = document.getElementById('measurementsGrid');
        
        if (!grid) return;
        
        const measurementValues = grid.querySelectorAll('.measurement-value');
        
        if (latest.waist && measurementValues[0]) {
            measurementValues[0].textContent = `${latest.waist} cm`;
        }
        if (latest.chest && measurementValues[1]) {
            measurementValues[1].textContent = `${latest.chest} cm`;
        }
        if (latest.thigh && measurementValues[2]) {
            measurementValues[2].textContent = `${latest.thigh} cm`;
        }
        if (latest.arm && measurementValues[3]) {
            measurementValues[3].textContent = `${latest.arm} cm`;
        }
    } catch (error) {
        console.error('Error updating measurements:', error);
    }
}

function updateBadges() {
    try {
        const grid = document.getElementById('badgesGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        AppData.badges.forEach(badge => {
            const badgeDiv = document.createElement('div');
            badgeDiv.className = `badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`;
            
            const dateStr = badge.unlocked && badge.date 
                ? new Date(badge.date).toLocaleDateString('fr-FR')
                : '';
            
            badgeDiv.innerHTML = `
                <div class="badge-icon">
                    <i class="fas ${badge.icon}"></i>
                </div>
                <div class="badge-name">${badge.name}</div>
                ${badge.unlocked ? `<div class="badge-date">${dateStr}</div>` : ''}
            `;
            
            grid.appendChild(badgeDiv);
        });
    } catch (error) {
        console.error('Error updating badges:', error);
    }
}

function checkBadges() {
    try {
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
    } catch (error) {
        console.error('Error checking badges:', error);
    }
}

function unlockBadge(badgeId) {
    try {
        const badge = AppData.badges.find(b => b.id === badgeId);
        if (badge && !badge.unlocked) {
            badge.unlocked = true;
            badge.date = new Date().toISOString();
            saveData();
            showToast(`🏆 Nouveau Badge: ${badge.name} !`);
        }
    } catch (error) {
        console.error('Error unlocking badge:', error);
    }
}

// ===== JOURNAL =====
function updateJournal() {
    try {
        const container = document.getElementById('journalEntries');
        if (!container) return;
        
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
    } catch (error) {
        console.error('Error updating journal:', error);
    }
}

// ===== NUTRITION =====
function updateNutrition() {
    try {
        // Update protein progress
        const proteinCurrent = AppData.nutrition.proteinToday;
        const proteinTarget = 150;
        const proteinPercent = Math.min((proteinCurrent / proteinTarget) * 100, 100);
        
        const proteinCurrentEl = document.getElementById('proteinCurrent');
        const proteinProgressEl = document.getElementById('proteinProgress');
        
        if (proteinCurrentEl) proteinCurrentEl.textContent = proteinCurrent;
        if (proteinProgressEl) proteinProgressEl.style.width = `${proteinPercent}%`;
        
        // Update water tracker
        const waterCount = AppData.nutrition.waterToday;
        const waterCountEl = document.getElementById('waterCount');
        const waterLitersEl = document.getElementById('waterLiters');
        
        if (waterCountEl) waterCountEl.textContent = waterCount;
        if (waterLitersEl) waterLitersEl.textContent = (waterCount * 0.25).toFixed(2);
        
        // Update water glasses visual
        updateWaterGlasses();
    } catch (error) {
        console.error('Error updating nutrition:', error);
    }
}

function initializeWaterTracker() {
    try {
        const container = document.getElementById('waterGlasses');
        if (!container) return;
        
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
    } catch (error) {
        console.error('Error initializing water tracker:', error);
    }
}

function updateWaterGlasses() {
    try {
        const glasses = document.querySelectorAll('.water-glass');
        glasses.forEach((glass, index) => {
            if (index < AppData.nutrition.waterToday) {
                glass.classList.add('filled');
            } else {
                glass.classList.remove('filled');
            }
        });
    } catch (error) {
        console.error('Error updating water glasses:', error);
    }
}

function addProtein() {
    try {
        const input = document.getElementById('proteinInput');
        if (!input) return;
        
        const amount = parseInt(input.value);
        
        if (amount && amount > 0) {
            AppData.nutrition.proteinToday += amount;
            saveData();
            updateNutrition();
            input.value = '';
            showToast(`+${amount}g de protéines ajoutées`);
        }
    } catch (error) {
        console.error('Error adding protein:', error);
    }
}

function resetWater() {
    try {
        if (confirm('Réinitialiser le compteur d\'eau pour aujourd\'hui ?')) {
            AppData.nutrition.waterToday = 0;
            saveData();
            updateNutrition();
            showToast('Compteur d\'eau réinitialisé');
        }
    } catch (error) {
        console.error('Error resetting water:', error);
    }
}

// ===== MODALS =====
function initializeModals() {
    try {
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
    } catch (error) {
        console.error('Error initializing modals:', error);
    }
}

function showAddWeightModal() {
    const modal = document.getElementById('addWeightModal');
    if (modal) {
        modal.classList.add('active');
        
        // Set date to today
        const dateInput = document.getElementById('weightDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
        const valueInput = document.getElementById('weightValue');
        if (valueInput) {
            valueInput.value = '';
        }
    }
}

function showAddMeasurementsModal() {
    const modal = document.getElementById('addMeasurementsModal');
    if (modal) {
        modal.classList.add('active');
        
        // Set date to today
        const dateInput = document.getElementById('measurementDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }
}

function showAddJournalModal() {
    const modal = document.getElementById('addJournalModal');
    if (modal) {
        modal.classList.add('active');
        
        // Set date to today
        const dateInput = document.getElementById('journalDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
        
        const energySlider = document.getElementById('journalEnergy');
        const energyValue = document.getElementById('energyValue');
        if (energySlider) energySlider.value = 5;
        if (energyValue) energyValue.textContent = 5;
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function saveWeight() {
    try {
        const dateInput = document.getElementById('weightDate');
        const valueInput = document.getElementById('weightValue');
        
        if (!dateInput || !valueInput) return;
        
        const date = dateInput.value;
        const weight = parseFloat(valueInput.value);
        
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
    } catch (error) {
        console.error('Error saving weight:', error);
        alert('Erreur lors de l\'enregistrement du poids');
    }
}

function saveMeasurements() {
    try {
        const dateInput = document.getElementById('measurementDate');
        const waistInput = document.getElementById('waistMeasurement');
        const chestInput = document.getElementById('chestMeasurement');
        const thighInput = document.getElementById('thighMeasurement');
        const armInput = document.getElementById('armMeasurement');
        
        if (!dateInput) return;
        
        const date = dateInput.value;
        const waist = waistInput ? parseFloat(waistInput.value) || null : null;
        const chest = chestInput ? parseFloat(chestInput.value) || null : null;
        const thigh = thighInput ? parseFloat(thighInput.value) || null : null;
        const arm = armInput ? parseFloat(armInput.value) || null : null;
        
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
    } catch (error) {
        console.error('Error saving measurements:', error);
        alert('Erreur lors de l\'enregistrement des mensurations');
    }
}

function saveJournal() {
    try {
        const dateInput = document.getElementById('journalDate');
        const typeSelect = document.getElementById('journalType');
        const energyInput = document.getElementById('journalEnergy');
        const notesInput = document.getElementById('journalNotes');
        const painInput = document.getElementById('journalPain');
        
        if (!dateInput || !typeSelect || !energyInput) return;
        
        const date = dateInput.value;
        const type = typeSelect.options[typeSelect.selectedIndex].text;
        const energy = parseInt(energyInput.value);
        const notes = notesInput ? notesInput.value : '';
        const pain = painInput ? painInput.value : '';
        
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
    } catch (error) {
        console.error('Error saving journal:', error);
        alert('Erreur lors de l\'enregistrement du journal');
    }
}

// ===== PROFILE ACTIONS =====
function exportData() {
    try {
        const dataStr = JSON.stringify(AppData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `fitcoach-damien-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        showToast('Données exportées avec succès');
    } catch (error) {
        console.error('Error exporting data:', error);
        alert('Erreur lors de l\'export des données');
    }
}

function importData() {
    try {
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
                    console.error('Error parsing import:', error);
                    alert('Erreur lors de l\'import des données. Fichier invalide.');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    } catch (error) {
        console.error('Error importing data:', error);
        alert('Erreur lors de l\'import des données');
    }
}

function resetApp() {
    try {
        if (confirm('⚠️ ATTENTION: Cette action supprimera TOUTES tes données (poids, séances, journal, etc.). Cette action est IRRÉVERSIBLE. Es-tu sûr de vouloir continuer ?')) {
            if (confirm('Dernière confirmation: Supprimer toutes les données ?')) {
                localStorage.removeItem('fitCoachData');
                location.reload();
            }
        }
    } catch (error) {
        console.error('Error resetting app:', error);
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message) {
    try {
        const toast = document.getElementById('successToast');
        const messageEl = document.getElementById('toastMessage');
        
        if (!toast || !messageEl) return;
        
        messageEl.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    } catch (error) {
        console.error('Error showing toast:', error);
    }
}

// ===== UPDATE COUNTDOWN EVERY MINUTE =====
setInterval(updateRaceCountdown, 60000);
