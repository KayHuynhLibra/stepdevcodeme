/**
 * Script để rename các file index.html thành tên cụ thể
 * Chạy: node scripts/rename-pages.js
 */

const fs = require('fs');
const path = require('path');

// Mapping table: old path -> new path
const MAPPING = {
    // Courses
    'courses/index.html': 'courses.html',
    'courses/web-development/index.html': 'courses-web-development.html',
    'courses/programming-languages/index.html': 'courses-programming-languages.html',
    'courses/data-science/index.html': 'courses-data-science.html',
    'courses/devops/index.html': 'courses-devops.html',
    
    // Roadmaps
    'roadmaps/index.html': 'roadmaps.html',
    'roadmaps/fullstack-developer/index.html': 'roadmap-fullstack-developer.html',
    'roadmaps/ml-data-engineer/index.html': 'roadmap-ml-data-engineer.html',
    'roadmaps/devops-engineer/index.html': 'roadmap-devops-engineer.html',
    
    // Resources
    'resources/index.html': 'resources.html',
    'resources/articles/index.html': 'resources-articles.html',
    'resources/tutorials/index.html': 'resources-tutorials.html',
    'resources/cheatsheets/index.html': 'resources-cheatsheets.html',
    
    // Community
    'community/index.html': 'community.html',
    'community/blog/index.html': 'community-blog.html',
    'community/forum/index.html': 'community-forum.html',
    'community/events/index.html': 'community-events.html',
    
    // Other
    'learning-schedule/index.html': 'schedule.html',
    'research/index.html': 'research.html',
    'roadmap-site/index.html': 'roadmap-editor.html'
};

// URL mapping for redirects
const URL_MAPPING = {
    '/courses/': '/courses.html',
    '/courses/web-development/': '/courses-web-development.html',
    '/courses/programming-languages/': '/courses-programming-languages.html',
    '/courses/data-science/': '/courses-data-science.html',
    '/courses/devops/': '/courses-devops.html',
    '/roadmaps/': '/roadmaps.html',
    '/roadmaps/fullstack-developer/': '/roadmap-fullstack-developer.html',
    '/roadmaps/ml-data-engineer/': '/roadmap-ml-data-engineer.html',
    '/roadmaps/devops-engineer/': '/roadmap-devops-engineer.html',
    '/learning-schedule/': '/schedule.html',
    '/research/': '/research.html',
    '/resources/': '/resources.html',
    '/resources/articles/': '/resources-articles.html',
    '/resources/tutorials/': '/resources-tutorials.html',
    '/resources/cheatsheets/': '/resources-cheatsheets.html',
    '/community/': '/community.html',
    '/community/blog/': '/community-blog.html',
    '/community/forum/': '/community-forum.html',
    '/community/events/': '/community-events.html',
    '/roadmap-site/': '/roadmap-editor.html'
};

function renameFiles() {
    const rootDir = path.join(__dirname, '..');
    let renamed = 0;
    let errors = [];

    console.log('🔄 Starting file rename process...\n');

    for (const [oldPath, newPath] of Object.entries(MAPPING)) {
        const oldFullPath = path.join(rootDir, oldPath);
        const newFullPath = path.join(rootDir, newPath);

        try {
            if (fs.existsSync(oldFullPath)) {
                // Create directory if needed
                const newDir = path.dirname(newFullPath);
                if (!fs.existsSync(newDir)) {
                    fs.mkdirSync(newDir, { recursive: true });
                }

                // Read file content
                let content = fs.readFileSync(oldFullPath, 'utf8');
                
                // Update internal links in the file
                content = updateLinksInContent(content, oldPath, newPath);
                
                // Write to new location
                fs.writeFileSync(newFullPath, content, 'utf8');
                
                // Delete old file
                fs.unlinkSync(oldFullPath);
                
                console.log(`✅ ${oldPath} → ${newPath}`);
                renamed++;
            } else {
                console.log(`⚠️  File not found: ${oldPath}`);
            }
        } catch (error) {
            errors.push({ file: oldPath, error: error.message });
            console.error(`❌ Error renaming ${oldPath}:`, error.message);
        }
    }

    console.log(`\n📊 Summary: ${renamed} files renamed`);
    if (errors.length > 0) {
        console.log(`⚠️  ${errors.length} errors occurred`);
    }
}

function updateLinksInContent(content, oldPath, newPath) {
    // Update relative links
    const oldUrl = '/' + oldPath.replace(/\\/g, '/').replace('/index.html', '/');
    const newUrl = '/' + newPath.replace(/\\/g, '/');
    
    // Replace various link patterns
    content = content.replace(
        new RegExp(`href=["']${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi'),
        `href="${newUrl}"`
    );
    
    content = content.replace(
        new RegExp(`href=["']${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi'),
        `href="${newPath}"`
    );
    
    return content;
}

function updateAllLinks() {
    const rootDir = path.join(__dirname, '..');
    const htmlFiles = getAllHtmlFiles(rootDir);
    let updated = 0;

    console.log('\n🔗 Updating links in all HTML files...\n');

    for (const filePath of htmlFiles) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Update all URL mappings
            for (const [oldUrl, newUrl] of Object.entries(URL_MAPPING)) {
                const patterns = [
                    new RegExp(`href=["']${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi'),
                    new RegExp(`href=["']\\.\\./${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi'),
                    new RegExp(`href=["']\\.\\./\\.\\./${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi'),
                ];

                patterns.forEach(pattern => {
                    if (pattern.test(content)) {
                        content = content.replace(pattern, (match) => {
                            return match.replace(oldUrl, newUrl);
                        });
                        modified = true;
                    }
                });
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Updated links in: ${path.relative(rootDir, filePath)}`);
                updated++;
            }
        } catch (error) {
            console.error(`❌ Error updating ${filePath}:`, error.message);
        }
    }

    console.log(`\n📊 Summary: ${updated} files updated`);
}

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Skip node_modules, .git, etc.
            if (!['node_modules', '.git', '_next', 'out', '.next'].includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Main execution
if (require.main === module) {
    console.log('🚀 Page Restructure Script\n');
    console.log('This script will:');
    console.log('1. Rename index.html files to specific names');
    console.log('2. Update links in all HTML files');
    console.log('\n⚠️  Starting automatic rename process...\n');
    
    // Run the rename process
    renameFiles();
    updateAllLinks();
    
    console.log('\n✅ Script execution completed!');
    console.log('📝 Please review the changes before committing.');
}

module.exports = { renameFiles, updateAllLinks, MAPPING, URL_MAPPING };

