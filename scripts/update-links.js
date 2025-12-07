/**
 * Script to update all links after file rename
 */

const fs = require('fs');
const path = require('path');

const LINK_MAPPINGS = {
    // Old paths -> New paths
    'courses/index.html': 'courses.html',
    'courses/web-development/index.html': 'courses-web-development.html',
    'courses/programming-languages/index.html': 'courses-programming-languages.html',
    'courses/data-science/index.html': 'courses-data-science.html',
    'courses/devops/index.html': 'courses-devops.html',
    'roadmaps/index.html': 'roadmaps.html',
    'roadmaps/fullstack-developer/index.html': 'roadmap-fullstack-developer.html',
    'roadmaps/ml-data-engineer/index.html': 'roadmap-ml-data-engineer.html',
    'roadmaps/devops-engineer/index.html': 'roadmap-devops-engineer.html',
    'learning-schedule/index.html': 'schedule.html',
    'research/index.html': 'research.html',
    'resources/index.html': 'resources.html',
    'resources/articles/index.html': 'resources-articles.html',
    'resources/tutorials/index.html': 'resources-tutorials.html',
    'resources/cheatsheets/index.html': 'resources-cheatsheets.html',
    'community/index.html': 'community.html',
    'community/blog/index.html': 'community-blog.html',
    'community/forum/index.html': 'community-forum.html',
    'community/events/index.html': 'community-events.html',
    'roadmap-site/index.html': 'roadmap-editor.html',
    
    // URL patterns
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

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', '_next', 'out', '.next', 'portfolio-multiverse'].includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

function updateLinksInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    const depth = relativePath.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    for (const [oldPath, newPath] of Object.entries(LINK_MAPPINGS)) {
        // Pattern 1: Direct path
        const pattern1 = new RegExp(`href=["']${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
        if (pattern1.test(content)) {
            content = content.replace(pattern1, (match) => {
                return match.replace(oldPath, newPath);
            });
            modified = true;
        }
        
        // Pattern 2: Relative path from root
        const pattern2 = new RegExp(`href=["']\\.\\./${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
        if (pattern2.test(content)) {
            content = content.replace(pattern2, (match) => {
                return match.replace(`../${oldPath}`, `${prefix}${newPath}`);
            });
            modified = true;
        }
        
        // Pattern 3: Double relative
        const pattern3 = new RegExp(`href=["']\\.\\./\\.\\./${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
        if (pattern3.test(content)) {
            content = content.replace(pattern3, (match) => {
                return match.replace(`../../${oldPath}`, `${prefix}${newPath}`);
            });
            modified = true;
        }
        
        // Pattern 4: Triple relative
        const pattern4 = new RegExp(`href=["']\\.\\./\\.\\./\\.\\./${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
        if (pattern4.test(content)) {
            content = content.replace(pattern4, (match) => {
                return match.replace(`../../../${oldPath}`, `${prefix}${newPath}`);
            });
            modified = true;
        }
        
        // Pattern 5: URL pattern (absolute-like)
        if (oldPath.startsWith('/')) {
            const pattern5 = new RegExp(`href=["']${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
            if (pattern5.test(content)) {
                content = content.replace(pattern5, (match) => {
                    return match.replace(oldPath, newPath);
                });
                modified = true;
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

function main() {
    const rootDir = path.join(__dirname, '..');
    const htmlFiles = getAllHtmlFiles(rootDir);
    let updated = 0;
    
    console.log('🔗 Updating links in all HTML files...\n');
    
    for (const filePath of htmlFiles) {
        try {
            if (updateLinksInFile(filePath)) {
                const relative = path.relative(rootDir, filePath);
                console.log(`✅ Updated: ${relative}`);
                updated++;
            }
        } catch (error) {
            console.error(`❌ Error updating ${filePath}:`, error.message);
        }
    }
    
    console.log(`\n📊 Summary: ${updated} files updated`);
}

if (require.main === module) {
    main();
}

module.exports = { updateLinksInFile, LINK_MAPPINGS };

