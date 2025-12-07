/**
 * Fix Navbar Layout - Xóa Multiverse, Schedule, Research khỏi navbar
 * Chỉ giữ trong sidebar
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

function fixNavbarLayout(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Pattern để tìm và xóa dropdown links trong navbar
        const dropdownPattern = /(\s*)<li><a href="[^"]*multiverse[^"]*" class="dropdown-link">Multiverse<\/a><\/li>\s*<li><a href="[^"]*schedule[^"]*" class="dropdown-link">Schedule<\/a><\/li>\s*<li><a href="[^"]*research[^"]*" class="dropdown-link">Research<\/a><\/li>\s*<\/ul>\s*<\/li>/gi;
        
        if (dropdownPattern.test(content)) {
            content = content.replace(dropdownPattern, '$1</ul>');
            modified = true;
        }
        
        // Pattern khác - nếu có cấu trúc khác
        const altPattern = /(\s*)<li><a href="[^"]*multiverse[^"]*" class="dropdown-link">Multiverse<\/a><\/li>\s*<li><a href="[^"]*schedule[^"]*" class="dropdown-link">Schedule<\/a><\/li>\s*<li><a href="[^"]*research[^"]*" class="dropdown-link">Research<\/a><\/li>\s*/gi;
        
        if (altPattern.test(content)) {
            content = content.replace(altPattern, '');
            modified = true;
        }
        
        // Xóa các nav-link riêng lẻ nếu có
        const multiverseNavPattern = /<li><a href="[^"]*multiverse[^"]*" class="nav-link[^"]*">Multiverse<\/a><\/li>\s*/gi;
        const scheduleNavPattern = /<li><a href="[^"]*schedule[^"]*" class="nav-link[^"]*">Schedule<\/a><\/li>\s*/gi;
        const researchNavPattern = /<li><a href="[^"]*research[^"]*" class="nav-link[^"]*">Research<\/a><\/li>\s*/gi;
        
        if (multiverseNavPattern.test(content)) {
            content = content.replace(multiverseNavPattern, '');
            modified = true;
        }
        
        if (scheduleNavPattern.test(content)) {
            content = content.replace(scheduleNavPattern, '');
            modified = true;
        }
        
        if (researchNavPattern.test(content)) {
            content = content.replace(researchNavPattern, '');
            modified = true;
        }
        
        // Đảm bảo sidebar có đầy đủ các mục
        const sidebarCheck = /<ul class="sidebar-menu">[\s\S]*?<\/ul>/i;
        const sidebarMatch = content.match(sidebarCheck);
        
        if (sidebarMatch) {
            let sidebarContent = sidebarMatch[0];
            
            // Kiểm tra và thêm nếu thiếu
            const hasRoadmaps = /roadmaps\.html/i.test(sidebarContent);
            const hasMultiverse = /multiverse/i.test(sidebarContent);
            const hasSchedule = /schedule\.html/i.test(sidebarContent);
            const hasResearch = /research\.html/i.test(sidebarContent);
            const hasProcess = /development-process/i.test(sidebarContent);
            const hasAdmin = /admin/i.test(sidebarContent);
            
            // Xác định base path
            const depth = filePath.split(path.sep).length - filePath.split(path.sep).indexOf('stepdevcode') - 2;
            const basePath = depth > 0 ? '../'.repeat(depth) : '';
            
            if (!hasMultiverse || !hasSchedule || !hasResearch) {
                // Tìm vị trí để insert
                const insertBefore = sidebarContent.indexOf('</ul>');
                let newItems = '';
                
                if (!hasMultiverse) {
                    newItems += `                <li><a href="${basePath}multiverse/" class="sidebar-link">Multiverse</a></li>\n`;
                }
                if (!hasSchedule) {
                    newItems += `                <li><a href="${basePath}schedule.html" class="sidebar-link">Schedule</a></li>\n`;
                }
                if (!hasResearch) {
                    newItems += `                <li><a href="${basePath}research.html" class="sidebar-link">Research</a></li>\n`;
                }
                
                if (newItems) {
                    sidebarContent = sidebarContent.slice(0, insertBefore) + newItems + sidebarContent.slice(insertBefore);
                    content = content.replace(sidebarCheck, sidebarContent);
                    modified = true;
                }
            }
        }
        
        // Sắp xếp lại sidebar menu theo thứ tự logic
        const sidebarMenuPattern = /(<ul class="sidebar-menu">)([\s\S]*?)(<\/ul>)/i;
        const sidebarMenuMatch = content.match(sidebarMenuPattern);
        
        if (sidebarMenuMatch) {
            const menuItems = sidebarMenuMatch[2].match(/<li>[\s\S]*?<\/li>/gi) || [];
            
            // Sắp xếp theo thứ tự: Roadmaps, Multiverse, Schedule, Research, Process, Admin
            const order = ['roadmaps', 'multiverse', 'schedule', 'research', 'development-process', 'process', 'admin'];
            const sortedItems = [];
            const remainingItems = [...menuItems];
            
            order.forEach(keyword => {
                const found = remainingItems.find(item => 
                    item.toLowerCase().includes(keyword.toLowerCase())
                );
                if (found) {
                    sortedItems.push(found);
                    const index = remainingItems.indexOf(found);
                    remainingItems.splice(index, 1);
                }
            });
            
            // Thêm các items còn lại
            sortedItems.push(...remainingItems);
            
            if (sortedItems.length > 0) {
                const newMenuContent = sortedItems.join('\n');
                const newSidebarMenu = sidebarMenuMatch[1] + '\n' + newMenuContent + '\n            ' + sidebarMenuMatch[3];
                content = content.replace(sidebarMenuPattern, newSidebarMenu);
                modified = true;
            }
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
    
    console.log('🔧 Fixing navbar layout...\n');
    console.log(`Found ${htmlFiles.length} HTML files\n`);
    
    let updated = 0;
    
    for (const filePath of htmlFiles) {
        if (fixNavbarLayout(filePath)) {
            const relative = path.relative(rootDir, filePath);
            console.log(`✅ Updated: ${relative}`);
            updated++;
        }
    }
    
    console.log(`\n📊 Summary: ${updated} files updated`);
    console.log(`\n✨ Navbar cleaned: Multiverse, Schedule, Research moved to sidebar only`);
}

if (require.main === module) {
    main();
}

module.exports = { fixNavbarLayout };

