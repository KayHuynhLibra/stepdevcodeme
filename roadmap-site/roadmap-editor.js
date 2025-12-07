// Roadmap Editor JavaScript

let levelCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Check admin authentication
    const isAdmin = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isAdmin) {
        window.location.href = '../admin/login.html';
        return;
    }

    const addLevelBtn = document.getElementById('addLevelBtn');
    const levelsContainer = document.getElementById('levelsContainer');
    const form = document.getElementById('createRoadmapForm');

    // Add level
    addLevelBtn.addEventListener('click', () => {
        addLevel();
    });

    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveRoadmap();
    });

    // Add initial level
    addLevel();
});

function addLevel() {
    levelCount++;
    const levelId = `level-${levelCount}`;
    
    const levelHTML = `
        <div class="level-editor" data-level-id="${levelId}">
            <div class="level-header-editor">
                <h4>Level ${levelCount}</h4>
                <button type="button" class="remove-level-btn" onclick="removeLevel('${levelId}')">×</button>
            </div>
            <div class="form-group">
                <label>Level Name</label>
                <input type="text" name="level-name-${levelCount}" placeholder="e.g., Foundation" required>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="level-duration-${levelCount}" placeholder="e.g., 3-4 months">
            </div>
            <div class="form-group">
                <label>Topics (one per line)</label>
                <textarea name="level-topics-${levelCount}" rows="4" placeholder="Topic 1&#10;Topic 2&#10;Topic 3"></textarea>
            </div>
        </div>
    `;
    
    document.getElementById('levelsContainer').insertAdjacentHTML('beforeend', levelHTML);
}

function removeLevel(levelId) {
    const levelElement = document.querySelector(`[data-level-id="${levelId}"]`);
    if (levelElement) {
        levelElement.remove();
    }
}

function saveRoadmap() {
    const formData = new FormData(document.getElementById('createRoadmapForm'));
    const roadmap = {
        title: formData.get('title'),
        description: formData.get('description'),
        duration: formData.get('duration'),
        icon: formData.get('icon') || '🎯',
        levels: []
    };

    // Collect levels
    const levelElements = document.querySelectorAll('.level-editor');
    levelElements.forEach((levelEl, index) => {
        const level = {
            name: formData.get(`level-name-${index + 1}`),
            duration: formData.get(`level-duration-${index + 1}`),
            topics: formData.get(`level-topics-${index + 1}`).split('\n').filter(t => t.trim())
        };
        roadmap.levels.push(level);
    });

    // Save to localStorage (in production, save to backend)
    const roadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]');
    roadmap.id = 'roadmap-' + Date.now();
    roadmap.created = new Date().toISOString();
    roadmaps.push(roadmap);
    localStorage.setItem('roadmaps', JSON.stringify(roadmaps));

    // Show success message
    if (window.utils) {
        window.utils.showNotification('Roadmap created successfully!', 'success');
    }

    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}


