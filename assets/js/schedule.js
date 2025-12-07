// Learning Schedule JavaScript

// Set today's date
document.addEventListener('DOMContentLoaded', () => {
    const todayDate = document.getElementById('todayDate');
    if (todayDate) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        todayDate.textContent = today.toLocaleDateString('en-US', options);
    }

    // Load today's stats
    loadTodayStats();
    
    // Load tasks
    loadTasks();
    
    // Load logs
    loadLogs();
    
    // Setup form handler
    setupFormHandler();
    
    // Setup task handlers
    setupTaskHandlers();
});

// Load today's statistics
function loadTodayStats() {
    const todayData = getTodayData();
    
    // Update time spent
    const todayTimeEl = document.getElementById('todayTime');
    if (todayTimeEl) {
        todayTimeEl.textContent = todayData.totalTime || 0;
    }
    
    // Update completed tasks
    const todayCompletedEl = document.getElementById('todayCompleted');
    if (todayCompletedEl) {
        const completedCount = todayData.tasks.filter(t => t.completed).length;
        todayCompletedEl.textContent = completedCount;
    }
    
    // Update streak
    const streakDaysEl = document.getElementById('streakDays');
    if (streakDaysEl) {
        streakDaysEl.textContent = calculateStreak();
    }
}

// Get today's data from localStorage
function getTodayData() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(`schedule_${today}`);
    
    if (stored) {
        return JSON.parse(stored);
    }
    
    return {
        date: today,
        tasks: [],
        logs: [],
        totalTime: 0
    };
}

// Save today's data to localStorage
function saveTodayData(data) {
    const today = new Date().toDateString();
    localStorage.setItem(`schedule_${today}`, JSON.stringify(data));
}

// Load tasks
function loadTasks() {
    const todayData = getTodayData();
    const tasksList = document.getElementById('tasksList');
    
    if (!tasksList) return;
    
    if (todayData.tasks.length === 0) {
        // Show default tasks if none exist
        return;
    }
    
    // Render tasks from data
    tasksList.innerHTML = todayData.tasks.map((task, index) => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
            <label for="task${index}" class="task-label">
                <span class="task-title">${task.title}</span>
                <span class="task-course">${task.course}</span>
            </label>
            <div class="task-time">
                <span>${task.time} min</span>
            </div>
        </div>
    `).join('');
}

// Load logs
function loadLogs() {
    const todayData = getTodayData();
    const logsList = document.getElementById('logsList');
    
    if (!logsList) return;
    
    if (todayData.logs.length === 0) {
        logsList.innerHTML = '<p class="no-logs">No logs for today yet. Start learning and log your progress!</p>';
        return;
    }
    
    logsList.innerHTML = todayData.logs.map(log => `
        <div class="log-item">
            <div class="log-header">
                <span class="log-course">${log.course}</span>
                <span class="log-time">${log.time} min</span>
            </div>
            <div class="log-content">
                <p>${log.notes || 'No notes'}</p>
            </div>
            <div class="log-time-display">${log.timestamp || ''}</div>
        </div>
    `).join('');
}

// Setup form handler
function setupFormHandler() {
    const form = document.getElementById('learningLogForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const course = document.getElementById('logCourse').value;
        const time = parseInt(document.getElementById('logTime').value);
        const notes = document.getElementById('logNotes').value;
        
        if (!course || !time) {
            alert('Please fill in all required fields');
            return;
        }
        
        const todayData = getTodayData();
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        const newLog = {
            course: course,
            time: time,
            notes: notes,
            timestamp: timeString,
            date: now.toISOString()
        };
        
        todayData.logs.push(newLog);
        todayData.totalTime += time;
        
        saveTodayData(todayData);
        
        // Reload logs and stats
        loadLogs();
        loadTodayStats();
        
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Learning log saved successfully!');
    });
}

// Setup task handlers
function setupTaskHandlers() {
    const tasksList = document.getElementById('tasksList');
    if (!tasksList) return;
    
    tasksList.addEventListener('change', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            const taskItem = e.target.closest('.task-item');
            const isCompleted = e.target.checked;
            
            if (isCompleted) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
            
            // Update in localStorage
            updateTaskStatus(e.target.id, isCompleted);
        }
    });
}

// Update task status
function updateTaskStatus(taskId, completed) {
    const todayData = getTodayData();
    // This would need to match task IDs with stored tasks
    // For now, just update the UI
    loadTodayStats();
}

// Calculate streak
function calculateStreak() {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateString = checkDate.toDateString();
        const stored = localStorage.getItem(`schedule_${dateString}`);
        
        if (stored) {
            const data = JSON.parse(stored);
            if (data.totalTime > 0 || data.tasks.some(t => t.completed)) {
                streak++;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    
    return streak;
}

// Show notification
function showNotification(message) {
    // Simple notification - can be enhanced
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


