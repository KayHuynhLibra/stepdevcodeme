/**
 * Page Configuration - Centralized management for all pages
 * This file contains all meta tags, navigation, and page-specific settings
 */

const PAGE_CONFIG = {
    // Base site configuration
    site: {
        name: 'StepDevCode.me',
        url: 'https://stepdevcode.me',
        author: 'StepDevCode',
        themeColor: '#667eea',
        twitterCreator: '@stepdevcode',
        locale: 'en_US',
        geoRegion: 'VN',
        geoPlaceName: 'Vietnam'
    },

    // Common meta tags for all pages
    common: {
        robots: 'index, follow',
        language: 'English',
        revisitAfter: '7 days',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black-translucent',
        appleMobileWebAppTitle: 'StepDevCode',
        csp: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self';",
        securityHeaders: {
            xContentTypeOptions: 'nosniff',
            xFrameOptions: 'SAMEORIGIN',
            xXSSProtection: '1; mode=block'
        }
    },

    // Page-specific configurations
    pages: {
        // Home page
        'index.html': {
            title: 'StepDevCode.me - Personal Portfolio | Web Developer & Learner',
            description: 'Personal portfolio showcasing my learning journey, projects, and growth as a developer. Explore courses, roadmaps, and development resources.',
            keywords: 'portfolio, web developer, programming, DSA, projects, learning journey, courses, roadmaps, full stack developer, frontend, backend',
            canonical: '/',
            ogImage: '/assets/images/og-image.jpg',
            ogImageWidth: '1200',
            ogImageHeight: '630',
            activeNav: 'home'
        },

        // About page
        'pages/about.html': {
            title: 'About Me - StepDevCode.me | Web Developer & Learner Journey',
            description: 'Learn more about my journey as a self-taught developer, my skills, passion for programming, and continuous learning in web development.',
            keywords: 'about, web developer, programmer, self-taught, skills, journey, portfolio, developer bio',
            canonical: '/pages/about.html',
            ogImage: '/assets/images/about-og.jpg',
            activeNav: 'about'
        },

        // Projects page
        'pages/projects.html': {
            title: 'My Projects - StepDevCode.me | Portfolio & Web Development Projects',
            description: 'Explore my personal projects, web applications, and portfolio. See my work in web development, full-stack projects, and coding challenges.',
            keywords: 'projects, portfolio, web development, web applications, coding projects, full stack, frontend, backend, github projects',
            canonical: '/pages/projects.html',
            ogImage: '/assets/images/projects-og.jpg',
            activeNav: 'projects'
        },

        // Contact page
        'pages/contact.html': {
            title: 'Contact - StepDevCode.me | Get In Touch',
            description: 'Get in touch with me. I\'m always open to discussing new projects, creative ideas, or opportunities to collaborate.',
            keywords: 'contact, get in touch, collaboration, hire developer, web developer contact',
            canonical: '/pages/contact.html',
            activeNav: 'contact'
        },

        // Courses index
        'courses/index.html': {
            title: 'All Courses - StepDevCode.me | Web Development, Programming, Data Science & DevOps',
            description: 'Browse courses by category: Web Development, Programming Languages, Data Science, and DevOps. Track your learning progress and master new skills.',
            keywords: 'courses, web development, programming, data science, devops, learning, tutorials, online courses, coding courses',
            canonical: '/courses/',
            ogImage: '/assets/images/courses-og.jpg',
            activeNav: 'courses'
        },

        // Web Development courses
        'courses/web-development/index.html': {
            title: 'Web Development Courses - StepDevCode.me',
            description: 'Learn modern web development technologies including HTML, CSS, JavaScript, React, Node.js, and full-stack development.',
            keywords: 'web development, html, css, javascript, react, nodejs, full stack, frontend, backend',
            canonical: '/courses/web-development/',
            activeNav: 'courses'
        },

        // Programming Languages courses
        'courses/programming-languages/index.html': {
            title: 'Programming Languages Courses - StepDevCode.me',
            description: 'Master programming languages: Python, JavaScript, Java, Go, Rust, and more. From basics to advanced concepts.',
            keywords: 'programming languages, python, javascript, java, go, rust, coding languages',
            canonical: '/courses/programming-languages/',
            activeNav: 'courses'
        },

        // Data Science courses
        'courses/data-science/index.html': {
            title: 'Data Science Courses - StepDevCode.me',
            description: 'Data analysis, machine learning, pandas, numpy, visualization, and data engineering fundamentals.',
            keywords: 'data science, machine learning, data analysis, pandas, numpy, data visualization',
            canonical: '/courses/data-science/',
            activeNav: 'courses'
        },

        // DevOps courses
        'courses/devops/index.html': {
            title: 'DevOps Courses - StepDevCode.me',
            description: 'Docker, Kubernetes, CI/CD, cloud deployment, infrastructure as code, and DevOps best practices.',
            keywords: 'devops, docker, kubernetes, cicd, cloud deployment, infrastructure as code',
            canonical: '/courses/devops/',
            activeNav: 'courses'
        },

        // Roadmaps index
        'roadmaps/index.html': {
            title: 'Learning Roadmaps - StepDevCode.me | ML Data Engineer, DevOps, and more',
            description: 'Structured paths to become ML Data Engineer, DevOps Engineer, Full Stack Developer, and more. Follow step-by-step learning roadmaps.',
            keywords: 'roadmaps, learning path, ml data engineer, devops engineer, full stack developer, career path',
            canonical: '/roadmaps/',
            activeNav: 'roadmaps'
        },

        // Learning Schedule
        'learning-schedule/index.html': {
            title: 'Learning Schedule - StepDevCode.me | Track Your Daily Learning Progress',
            description: 'Track your daily learning progress, set goals, and manage your learning schedule effectively.',
            keywords: 'learning schedule, daily learning, progress tracking, learning goals',
            canonical: '/learning-schedule/',
            activeNav: 'schedule'
        },

        // Research
        'research/index.html': {
            title: 'Research - StepDevCode.me | Development Research & Notes',
            description: 'Research notes, development insights, and technical documentation.',
            keywords: 'research, development notes, technical documentation, insights',
            canonical: '/research/',
            activeNav: 'research'
        },

        // Resources
        'resources/index.html': {
            title: 'Learning Resources - StepDevCode.me | Articles, Tutorials, and Cheatsheets',
            description: 'Articles, tutorials, and quick reference guides for web development and programming.',
            keywords: 'resources, articles, tutorials, cheatsheets, learning materials',
            canonical: '/resources/',
            activeNav: 'resources'
        }
    },

    // Navigation configuration
    navigation: {
        main: [
            { href: 'index.html', label: 'Home', key: 'home' },
            { href: 'pages/about.html', label: 'About', key: 'about' },
            { href: 'pages/projects.html', label: 'Projects', key: 'projects' },
            { href: 'courses/index.html', label: 'Courses', key: 'courses' },
            { href: 'pages/contact.html', label: 'Contact', key: 'contact' }
        ],
        dropdown: [
            { href: 'roadmaps/index.html', label: 'Roadmaps', key: 'roadmaps' },
            { href: 'multiverse/', label: 'Multiverse', key: 'multiverse' },
            { href: 'learning-schedule/index.html', label: 'Schedule', key: 'schedule' },
            { href: 'research/index.html', label: 'Research', key: 'research' }
        ]
    },

    // CSS files to load (common)
    css: {
        common: [
            'assets/css/style.css',
            'assets/css/themes/nude-theme.css',
            'assets/css/themes/nude-variations.css',
            'assets/css/animations-2025.css'
        ],
        pageSpecific: {
            'index.html': [
                'assets/css/pages/learning-journey-fix.css',
                'assets/css/pages/homepage-enhancements.css'
            ]
        }
    },

    // JavaScript files to load
    js: {
        common: [
            'assets/js/main.js',
            'assets/js/animations.js'
        ],
        pageSpecific: {
            'index.html': ['assets/js/i18n.js'],
            'pages/projects.html': ['assets/js/projects.js'],
            'courses/index.html': ['assets/js/courses.js'],
            'learning-schedule/index.html': ['assets/js/schedule.js'],
            'research/index.html': ['assets/js/research.js']
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PAGE_CONFIG;
}

