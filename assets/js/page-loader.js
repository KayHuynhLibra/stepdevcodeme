/**
 * Page Loader - Dynamically injects meta tags, navigation, and assets
 * This script should be included in the <head> of each page
 */

(function() {
    'use strict';

    // Get current page path
    function getCurrentPagePath() {
        const path = window.location.pathname;
        const page = path.split('/').filter(Boolean);
        
        // Handle root index.html
        if (path === '/' || path.endsWith('/index.html') || page.length === 0) {
            return 'index.html';
        }
        
        // Build relative path from root
        const relativePath = page.join('/') + (path.endsWith('/') ? 'index.html' : '');
        return relativePath;
    }

    // Calculate relative path to assets
    function getAssetPath(currentPath) {
        const depth = currentPath.split('/').length - 1;
        if (depth === 0 || currentPath === 'index.html') {
            return '';
        }
        return '../'.repeat(depth);
    }

    // Get page configuration
    function getPageConfig() {
        const currentPath = getCurrentPagePath();
        const config = window.PAGE_CONFIG || {};
        
        // Try exact match first
        if (config.pages && config.pages[currentPath]) {
            return config.pages[currentPath];
        }
        
        // Try to find by filename
        const filename = currentPath.split('/').pop();
        if (config.pages && config.pages[filename]) {
            return config.pages[filename];
        }
        
        // Return default config
        return {
            title: `${config.site?.name || 'StepDevCode.me'} - ${filename || 'Page'}`,
            description: `Page on ${config.site?.name || 'StepDevCode.me'}`,
            keywords: '',
            canonical: currentPath,
            activeNav: ''
        };
    }

    // Inject meta tags
    function injectMetaTags() {
        const config = window.PAGE_CONFIG || {};
        const pageConfig = getPageConfig();
        const site = config.site || {};
        const common = config.common || {};
        const assetPath = getAssetPath(getCurrentPagePath());
        const baseUrl = site.url || 'https://stepdevcode.me';
        const canonical = pageConfig.canonical || getCurrentPagePath();
        const fullUrl = baseUrl + (canonical.startsWith('/') ? canonical : '/' + canonical);

        // Remove existing meta tags (if any)
        const existingMeta = document.querySelectorAll('meta[name^="title"], meta[name^="description"], meta[property^="og:"], meta[name^="twitter:"]');
        existingMeta.forEach(meta => {
            if (meta.getAttribute('data-dynamic') === 'true') {
                meta.remove();
            }
        });

        // Helper to create meta tag
        function createMeta(attr, value, content) {
            const meta = document.createElement('meta');
            meta.setAttribute(attr, value);
            meta.setAttribute('content', content);
            meta.setAttribute('data-dynamic', 'true');
            return meta;
        }

        // Primary meta tags
        if (pageConfig.title) {
            document.title = pageConfig.title;
            document.head.appendChild(createMeta('name', 'title', pageConfig.title));
        }
        
        if (pageConfig.description) {
            document.head.appendChild(createMeta('name', 'description', pageConfig.description));
        }
        
        if (pageConfig.keywords) {
            document.head.appendChild(createMeta('name', 'keywords', pageConfig.keywords));
        }

        // Author
        if (site.author) {
            document.head.appendChild(createMeta('name', 'author', site.author));
        }

        // Robots
        if (common.robots) {
            document.head.appendChild(createMeta('name', 'robots', common.robots));
        }

        // Theme color
        if (site.themeColor) {
            document.head.appendChild(createMeta('name', 'theme-color', site.themeColor));
        }

        // Canonical URL
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', fullUrl);
        } else {
            const link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', fullUrl);
            link.setAttribute('data-dynamic', 'true');
            document.head.appendChild(link);
        }

        // Open Graph tags
        document.head.appendChild(createMeta('property', 'og:type', 'website'));
        document.head.appendChild(createMeta('property', 'og:url', fullUrl));
        document.head.appendChild(createMeta('property', 'og:title', pageConfig.title || site.name));
        document.head.appendChild(createMeta('property', 'og:description', pageConfig.description || ''));
        document.head.appendChild(createMeta('property', 'og:site_name', site.name || 'StepDevCode.me'));
        document.head.appendChild(createMeta('property', 'og:locale', common.locale || 'en_US'));
        
        if (pageConfig.ogImage) {
            document.head.appendChild(createMeta('property', 'og:image', baseUrl + pageConfig.ogImage));
            if (pageConfig.ogImageWidth) {
                document.head.appendChild(createMeta('property', 'og:image:width', pageConfig.ogImageWidth));
            }
            if (pageConfig.ogImageHeight) {
                document.head.appendChild(createMeta('property', 'og:image:height', pageConfig.ogImageHeight));
            }
        }

        // Twitter Card tags
        document.head.appendChild(createMeta('name', 'twitter:card', 'summary_large_image'));
        document.head.appendChild(createMeta('name', 'twitter:url', fullUrl));
        document.head.appendChild(createMeta('name', 'twitter:title', pageConfig.title || site.name));
        document.head.appendChild(createMeta('name', 'twitter:description', pageConfig.description || ''));
        if (site.twitterCreator) {
            document.head.appendChild(createMeta('name', 'twitter:creator', site.twitterCreator));
        }
        if (pageConfig.ogImage) {
            document.head.appendChild(createMeta('name', 'twitter:image', baseUrl + pageConfig.ogImage));
        }

        // Security headers
        if (common.securityHeaders) {
            if (common.securityHeaders.xContentTypeOptions) {
                document.head.appendChild(createMeta('http-equiv', 'X-Content-Type-Options', common.securityHeaders.xContentTypeOptions));
            }
            if (common.securityHeaders.xFrameOptions) {
                document.head.appendChild(createMeta('http-equiv', 'X-Frame-Options', common.securityHeaders.xFrameOptions));
            }
            if (common.securityHeaders.xXSSProtection) {
                document.head.appendChild(createMeta('http-equiv', 'X-XSS-Protection', common.securityHeaders.xXSSProtection));
            }
        }
    }

    // Inject navigation
    function injectNavigation() {
        const config = window.PAGE_CONFIG || {};
        const nav = config.navigation || {};
        const pageConfig = getPageConfig();
        const activeNav = pageConfig.activeNav || '';
        const assetPath = getAssetPath(getCurrentPagePath());

        const navbar = document.querySelector('.navbar .nav-menu');
        if (!navbar || !nav.main) return;

        // Clear existing navigation (if dynamic)
        const existingNav = navbar.querySelectorAll('li[data-dynamic="true"]');
        existingNav.forEach(li => li.remove());

        // Build main navigation
        nav.main.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = assetPath + item.href;
            a.className = 'nav-link' + (activeNav === item.key ? ' active' : '');
            a.textContent = item.label;
            a.setAttribute('data-i18n', `nav.${item.key}`);
            li.appendChild(a);
            li.setAttribute('data-dynamic', 'true');
            navbar.appendChild(li);
        });

        // Build dropdown
        if (nav.dropdown && nav.dropdown.length > 0) {
            const dropdownLi = document.createElement('li');
            dropdownLi.className = 'nav-dropdown';
            dropdownLi.setAttribute('data-dynamic', 'true');
            
            const dropdownLink = document.createElement('a');
            dropdownLink.href = '#';
            dropdownLink.className = 'nav-link';
            dropdownLink.textContent = 'More ▼';
            dropdownLink.onclick = () => false;
            
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu';
            
            nav.dropdown.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = assetPath + item.href;
                a.className = 'dropdown-link';
                a.textContent = item.label;
                li.appendChild(a);
                dropdownMenu.appendChild(li);
            });
            
            dropdownLi.appendChild(dropdownLink);
            dropdownLi.appendChild(dropdownMenu);
            navbar.appendChild(dropdownLi);
        }
    }

    // Load CSS files
    function loadCSS() {
        const config = window.PAGE_CONFIG || {};
        const currentPath = getCurrentPagePath();
        const assetPath = getAssetPath(currentPath);
        const css = config.css || {};

        // Load common CSS
        if (css.common) {
            css.common.forEach(cssFile => {
                if (!document.querySelector(`link[href="${cssFile}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = assetPath + cssFile;
                    link.setAttribute('data-dynamic', 'true');
                    document.head.appendChild(link);
                }
            });
        }

        // Load page-specific CSS
        if (css.pageSpecific && css.pageSpecific[currentPath]) {
            css.pageSpecific[currentPath].forEach(cssFile => {
                if (!document.querySelector(`link[href="${cssFile}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = assetPath + cssFile;
                    link.setAttribute('data-dynamic', 'true');
                    document.head.appendChild(link);
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Make sure PAGE_CONFIG is loaded
        if (typeof PAGE_CONFIG === 'undefined') {
            console.warn('PAGE_CONFIG not found. Loading page-config.js...');
            const script = document.createElement('script');
            script.src = getAssetPath(getCurrentPagePath()) + 'assets/js/page-config.js';
            script.onload = () => {
                window.PAGE_CONFIG = PAGE_CONFIG;
                run();
            };
            document.head.appendChild(script);
        } else {
            window.PAGE_CONFIG = PAGE_CONFIG;
            run();
        }
    }

    function run() {
        injectMetaTags();
        loadCSS();
        
        // Inject navigation after body is ready
        if (document.body) {
            injectNavigation();
        } else {
            document.addEventListener('DOMContentLoaded', injectNavigation);
        }
    }

})();

