/**
 * Update canonical URLs after file rename
 */

const fs = require('fs');
const path = require('path');

const CANONICAL_MAPPINGS = {
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

function updateCanonical(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    for (const [oldUrl, newUrl] of Object.entries(CANONICAL_MAPPINGS)) {
        const pattern = new RegExp(`(canonical.*href=["'])https://stepdevcode\\.me${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(["'])`, 'gi');
        if (pattern.test(content)) {
            content = content.replace(pattern, `$1https://stepdevcode.me${newUrl}$2`);
            modified = true;
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
    
    console.log('🔗 Updating canonical URLs...\n');
    
    for (const filePath of htmlFiles) {
        try {
            if (updateCanonical(filePath)) {
                const relative = path.relative(rootDir, filePath);
                console.log(`✅ Updated canonical: ${relative}`);
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

module.exports = { updateCanonical };

