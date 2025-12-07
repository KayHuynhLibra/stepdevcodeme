/**
 * Fix CSS paths - Thêm assets/ vào đường dẫn CSS
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

function fixCSSPaths(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Fix paths: ../css/pages/ -> ../assets/css/pages/
        const wrongPattern = /href=["']\.\.\/css\/pages\//g;
        if (wrongPattern.test(content)) {
            content = content.replace(wrongPattern, 'href="../assets/css/pages/');
            modified = true;
        }
        
        // Fix paths: css/pages/ -> assets/css/pages/ (for root level)
        const wrongPattern2 = /href=["']css\/pages\//g;
        if (wrongPattern2.test(content)) {
            content = content.replace(wrongPattern2, 'href="assets/css/pages/');
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
    
    console.log('🔧 Fixing CSS paths...\n');
    
    let fixed = 0;
    
    for (const filePath of htmlFiles) {
        if (fixCSSPaths(filePath)) {
            const relative = path.relative(rootDir, filePath);
            console.log(`✅ Fixed: ${relative}`);
            fixed++;
        }
    }
    
    console.log(`\n📊 Summary: ${fixed} files fixed`);
}

if (require.main === module) {
    main();
}

module.exports = { fixCSSPaths };

