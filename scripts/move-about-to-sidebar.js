/**
 * Move About to Sidebar - Di chuyển About khỏi navbar chính
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

function moveAboutToSidebar(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Xác định base path
        const depth = filePath.split(path.sep).length - filePath.split(path.sep).indexOf('stepdevcode') - 2;
        const basePath = depth > 0 ? '../'.repeat(depth) : '';
        
        // Xóa About khỏi navbar
        const aboutNavPattern = /<li><a href="[^"]*about\.html[^"]*" class="nav-link[^"]*">About<\/a><\/li>\s*/gi;
        if (aboutNavPattern.test(content)) {
            content = content.replace(aboutNavPattern, '');
            modified = true;
        }
        
        // Thêm About vào sidebar (sau Roadmaps, trước Multiverse)
        const sidebarMenuPattern = /(<ul class="sidebar-menu">)([\s\S]*?)(<\/ul>)/i;
        const sidebarMatch = content.match(sidebarMenuPattern);
        
        if (sidebarMatch) {
            let sidebarContent = sidebarMatch[2];
            
            // Kiểm tra xem About đã có trong sidebar chưa
            const hasAbout = /about\.html/i.test(sidebarContent);
            
            if (!hasAbout) {
                // Tìm vị trí sau Roadmaps
                const roadmapsIndex = sidebarContent.toLowerCase().indexOf('roadmaps');
                if (roadmapsIndex !== -1) {
                    // Tìm </li> sau roadmaps
                    const afterRoadmaps = sidebarContent.indexOf('</li>', roadmapsIndex);
                    if (afterRoadmaps !== -1) {
                        const insertPos = afterRoadmaps + 5; // Sau </li>
                        const aboutLink = `                <li><a href="${basePath}pages/about.html" class="sidebar-link">About</a></li>\n`;
                        sidebarContent = sidebarContent.slice(0, insertPos) + aboutLink + sidebarContent.slice(insertPos);
                        content = content.replace(sidebarMenuPattern, sidebarMatch[1] + sidebarContent + sidebarMatch[3]);
                        modified = true;
                    }
                } else {
                    // Nếu không có Roadmaps, thêm vào đầu
                    const insertPos = sidebarContent.indexOf('<li>');
                    if (insertPos !== -1) {
                        const aboutLink = `                <li><a href="${basePath}pages/about.html" class="sidebar-link">About</a></li>\n`;
                        sidebarContent = aboutLink + sidebarContent;
                        content = content.replace(sidebarMenuPattern, sidebarMatch[1] + sidebarContent + sidebarMatch[3]);
                        modified = true;
                    }
                }
            }
        }
        
        // Đặc biệt: Trang about.html không nên có link About trong navbar
        if (filePath.includes('about.html')) {
            // Xóa active class nếu có
            const activeAboutPattern = /<li><a href="about\.html" class="nav-link active">About<\/a><\/li>\s*/gi;
            if (activeAboutPattern.test(content)) {
                content = content.replace(activeAboutPattern, '');
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
    
    console.log('🔧 Moving About to sidebar...\n');
    console.log(`Found ${htmlFiles.length} HTML files\n`);
    
    let updated = 0;
    
    for (const filePath of htmlFiles) {
        if (moveAboutToSidebar(filePath)) {
            const relative = path.relative(rootDir, filePath);
            console.log(`✅ Updated: ${relative}`);
            updated++;
        }
    }
    
    console.log(`\n📊 Summary: ${updated} files updated`);
    console.log(`\n✨ About moved to sidebar, removed from navbar`);
}

if (require.main === module) {
    main();
}

module.exports = { moveAboutToSidebar };

