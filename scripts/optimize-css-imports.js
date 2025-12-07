/**
 * Optimize CSS Imports - Thay thế nhiều CSS files bằng 1 file gộp
 * Gọn gàng, không rối
 */

const fs = require('fs');
const path = require('path');

// CSS files cần thay thế (old)
const OLD_CSS_FILES = [
    'assets/css/pages/learning-journey-fix.css',
    'assets/css/pages/homepage-enhancements.css',
    'assets/css/modern-design-2025.css',
    'assets/css/pages/homepage-clean-minimal.css',
    'assets/css/pages/sidebar-nav.css',
    'assets/css/pages/navbar-optimized.css',
    'assets/css/pages/homepage-perfect-layout.css',
    'assets/css/pages/homepage-optimal-layout.css',
    'assets/css/pages/homepage-layout-2025.css'
];

// CSS file mới (replacement)
const NEW_CSS_FILE = 'assets/css/main-optimized.css';

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

function optimizeCSSImports(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Tìm và thay thế các CSS links cũ
        OLD_CSS_FILES.forEach(oldFile => {
            // Determine base path
            const depth = filePath.split(path.sep).length - filePath.split(path.sep).indexOf('stepdevcode') - 2;
            const basePath = depth > 0 ? '../'.repeat(depth) : '';
            const oldPath = basePath + oldFile;
            
            // Pattern để tìm link tag
            const pattern = new RegExp(`<link[^>]*href=["']${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'gi');
            
            if (pattern.test(content)) {
                // Chỉ xóa nếu chưa có main-optimized.css
                if (!content.includes('main-optimized.css')) {
                    content = content.replace(pattern, '');
                    modified = true;
                } else {
                    // Nếu đã có main-optimized.css, chỉ xóa old file
                    content = content.replace(pattern, '');
                    modified = true;
                }
            }
        });
        
        // Thêm main-optimized.css nếu chưa có (sau các CSS files cơ bản)
        if (!content.includes('main-optimized.css')) {
            const depth = filePath.split(path.sep).length - filePath.split(path.sep).indexOf('stepdevcode') - 2;
            const basePath = depth > 0 ? '../'.repeat(depth) : '';
            const newPath = basePath + NEW_CSS_FILE;
            
            // Tìm vị trí sau animations-2025.css hoặc modern-design-2025.css
            const insertPattern = /(<link[^>]*animations-2025\.css[^>]*>|<link[^>]*modern-design-2025\.css[^>]*>)/i;
            const match = content.match(insertPattern);
            
            if (match) {
                const insertIndex = match.index + match[0].length;
                const cssLink = `\n    <link rel="stylesheet" href="${newPath}">`;
                content = content.slice(0, insertIndex) + cssLink + content.slice(insertIndex);
                modified = true;
            } else {
                // Nếu không tìm thấy, thêm trước </head>
                const headEndMatch = content.match(/<\/head>/i);
                if (headEndMatch) {
                    const cssLink = `    <link rel="stylesheet" href="${newPath}">\n`;
                    content = content.slice(0, headEndMatch.index) + cssLink + content.slice(headEndMatch.index);
                    modified = true;
                }
            }
        }
        
        // Xóa inline styles nếu có (trừ khi cần thiết)
        const inlineStylePattern = /<style>[\s\S]*?<\/style>/gi;
        const inlineMatches = content.match(inlineStylePattern);
        if (inlineMatches) {
            inlineMatches.forEach(match => {
                // Chỉ xóa nếu là learning journey styles (đã có trong main-optimized.css)
                if (match.includes('learning-journey-title') || match.includes('learning-journey-text')) {
                    content = content.replace(match, '');
                    modified = true;
                }
            });
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
    
    console.log('🔧 Optimizing CSS imports...\n');
    console.log(`Found ${htmlFiles.length} HTML files\n`);
    
    let updated = 0;
    
    for (const filePath of htmlFiles) {
        if (optimizeCSSImports(filePath)) {
            const relative = path.relative(rootDir, filePath);
            console.log(`✅ Updated: ${relative}`);
            updated++;
        }
    }
    
    console.log(`\n📊 Summary: ${updated} files updated`);
    console.log(`\n✨ All CSS files consolidated into: ${NEW_CSS_FILE}`);
}

if (require.main === module) {
    main();
}

module.exports = { optimizeCSSImports };

