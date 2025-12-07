/**
 * Script to apply minimal design to all pages
 * Thêm CSS files tối giản vào tất cả các trang HTML
 */

const fs = require('fs');
const path = require('path');

// CSS files cần thêm (theo thứ tự)
const MINIMAL_CSS_FILES = [
    'assets/css/pages/homepage-clean-minimal.css',
    'assets/css/pages/sidebar-nav.css',
    'assets/css/pages/navbar-optimized.css'
];

// Pages cần bỏ qua (templates, admin, multiverse có thể giữ nguyên)
const SKIP_PATTERNS = [
    'templates',
    'multiverse',
    'nodejs-app',
    'admin'
];

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip certain directories
            if (!SKIP_PATTERNS.some(pattern => filePath.includes(pattern))) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            // Skip templates and admin
            if (!SKIP_PATTERNS.some(pattern => filePath.includes(pattern))) {
                fileList.push(filePath);
            }
        }
    });
    
    return fileList;
}

function getRelativePath(filePath, cssFile) {
    const fileDir = path.dirname(filePath);
    const cssPath = path.join('stepdevcode', cssFile);
    const relative = path.relative(fileDir, cssPath);
    return relative.replace(/\\/g, '/');
}

function addMinimalCSS(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if already has minimal CSS
        if (content.includes('navbar-optimized.css') || content.includes('homepage-clean-minimal.css')) {
            return false; // Already has it
        }
        
        // Find the last stylesheet link before closing </head>
        const headEndMatch = content.match(/<\/head>/i);
        if (!headEndMatch) {
            console.log(`⚠️  No </head> found in ${filePath}`);
            return false;
        }
        
        const headEndIndex = headEndMatch.index;
        
        // Find last stylesheet link
        const stylesheetPattern = /<link[^>]*rel=["']stylesheet["'][^>]*>/gi;
        const stylesheets = [];
        let match;
        
        while ((match = stylesheetPattern.exec(content)) !== null) {
            stylesheets.push({
                index: match.index,
                content: match[0]
            });
        }
        
        // Determine base path (../ for pages/, ../../ for deeper, etc.)
        const depth = filePath.split(path.sep).length - filePath.split(path.sep).indexOf('stepdevcode') - 2;
        const basePath = depth > 0 ? '../'.repeat(depth) : '';
        
        // Build CSS links
        let cssLinks = '\n    <!-- Minimal Design CSS -->\n';
        MINIMAL_CSS_FILES.forEach(cssFile => {
            // Keep assets/ in path
            const relativePath = basePath + cssFile;
            cssLinks += `    <link rel="stylesheet" href="${relativePath}">\n`;
        });
        
        // Insert after last stylesheet or before </head>
        let insertIndex;
        if (stylesheets.length > 0) {
            const lastSheet = stylesheets[stylesheets.length - 1];
            insertIndex = lastSheet.index + lastSheet.content.length;
        } else {
            insertIndex = headEndIndex;
        }
        
        // Insert CSS links
        content = content.slice(0, insertIndex) + cssLinks + content.slice(insertIndex);
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

function main() {
    const rootDir = path.join(__dirname, '..');
    const htmlFiles = getAllHtmlFiles(rootDir);
    
    console.log('🎨 Applying minimal design to all pages...\n');
    console.log(`Found ${htmlFiles.length} HTML files\n`);
    
    let updated = 0;
    let skipped = 0;
    
    for (const filePath of htmlFiles) {
        const relative = path.relative(rootDir, filePath);
        
        if (addMinimalCSS(filePath)) {
            console.log(`✅ Updated: ${relative}`);
            updated++;
        } else {
            console.log(`⏭️  Skipped: ${relative} (already has or error)`);
            skipped++;
        }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Updated: ${updated} files`);
    console.log(`   ⏭️  Skipped: ${skipped} files`);
    console.log(`   📄 Total: ${htmlFiles.length} files`);
}

if (require.main === module) {
    main();
}

module.exports = { addMinimalCSS, getAllHtmlFiles };

