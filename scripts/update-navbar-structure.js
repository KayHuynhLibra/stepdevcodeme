/**
 * Update navbar structure for all pages
 * Thêm sidebar toggle và color scheme toggle
 */

const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', '_next', 'out', '.next', 'portfolio-multiverse', 'templates', 'multiverse', 'nodejs-app', 'admin'].includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            if (!filePath.includes('templates') && !filePath.includes('multiverse') && !filePath.includes('nodejs-app') && !filePath.includes('admin')) {
                fileList.push(filePath);
            }
        }
    });
    
    return fileList;
}

function updateNavbar(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // 1. Remove dropdown menu "More ▼"
        const dropdownPattern = /<li class="nav-dropdown">[\s\S]*?<\/li>/g;
        if (dropdownPattern.test(content)) {
            content = content.replace(dropdownPattern, '');
            modified = true;
        }
        
        // 2. Add sidebar toggle button before lang-switch
        const navActionsPattern = /<div class="nav-actions">/;
        if (navActionsPattern.test(content) && !content.includes('sidebar-toggle')) {
            content = content.replace(
                /<div class="nav-actions">/,
                `<div class="nav-actions">
                <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar" title="Menu">
                    <span class="menu-icon">☰</span>
                </button>`
            );
            modified = true;
        }
        
        // 3. Add color scheme toggle after theme toggle
        if (content.includes('theme-toggle') && !content.includes('color-scheme-toggle')) {
            content = content.replace(
                /<button class="theme-toggle[^>]*>[\s\S]*?<\/button>\s*<\/div>/,
                (match) => {
                    return match.replace('</div>', `\n                <button class="color-scheme-toggle" id="colorSchemeToggle" aria-label="Change color scheme" title="Change color">\n                    <span class="color-icon">🎨</span>\n                </button>\n            </div>`);
                }
            );
            modified = true;
        }
        
        // 4. Add sidebar HTML before main content (if not exists)
        if (!content.includes('id="sidebar"') && content.includes('</header>')) {
            const sidebarHTML = `
    <!-- Sidebar for Hidden Menu Items -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <h3>Menu</h3>
            <button class="sidebar-close" id="sidebarClose" aria-label="Close sidebar">×</button>
        </div>
        <nav class="sidebar-nav">
            <ul class="sidebar-menu">
                <li><a href="../roadmaps.html" class="sidebar-link">Roadmaps</a></li>
                <li><a href="../multiverse/" class="sidebar-link">Multiverse</a></li>
                <li><a href="../schedule.html" class="sidebar-link">Schedule</a></li>
                <li><a href="../research.html" class="sidebar-link">Research</a></li>
                <li><a href="../pages/development-process.html" class="sidebar-link">Process</a></li>
                <li><a href="../admin/login.html" class="sidebar-link">Admin</a></li>
            </ul>
        </nav>
    </aside>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

`;
            
            // Determine depth for relative paths
            const depth = filePath.split(path.sep).length - filePath.split(path.sep).indexOf('stepdevcode') - 2;
            const basePath = depth > 0 ? '../'.repeat(depth) : '';
            
            // Adjust paths based on depth
            let adjustedSidebar = sidebarHTML;
            if (depth === 0) {
                adjustedSidebar = adjustedSidebar.replace(/\.\.\//g, '');
            } else if (depth === 1) {
                // Already correct
            } else {
                adjustedSidebar = adjustedSidebar.replace(/\.\.\//g, basePath);
            }
            
            content = content.replace('</header>', `</header>${adjustedSidebar}`);
            modified = true;
        }
        
        // 5. Ensure main.js is loaded (for sidebar functionality)
        if (!content.includes('assets/js/main.js') && content.includes('</body>')) {
            content = content.replace('</body>', '    <script src="../assets/js/main.js"></script>\n</body>');
            // Fix path based on depth
            const depth = filePath.split(path.sep).length - filePath.split(path.sep).indexOf('stepdevcode') - 2;
            if (depth === 0) {
                content = content.replace('../assets/js/main.js', 'assets/js/main.js');
            }
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return true;
        }
        return false;
    } catch (error) {
        console.error(`❌ Error: ${filePath}`, error.message);
        return false;
    }
}

function main() {
    const rootDir = path.join(__dirname, '..');
    const htmlFiles = getAllHtmlFiles(rootDir);
    
    console.log('🔄 Updating navbar structure for all pages...\n');
    
    let updated = 0;
    
    for (const filePath of htmlFiles) {
        if (updateNavbar(filePath)) {
            const relative = path.relative(rootDir, filePath);
            console.log(`✅ Updated: ${relative}`);
            updated++;
        }
    }
    
    console.log(`\n📊 Summary: ${updated} files updated`);
}

if (require.main === module) {
    main();
}

module.exports = { updateNavbar };

