/**
 * Modern Animations JavaScript 2025
 * Handles scroll animations, intersection observer, and interactive effects
 */

(function() {
    'use strict';

    // ============================================
    // Intersection Observer for Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.addEventListener('DOMContentLoaded', () => {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => observer.observe(el));

        // ============================================
        // Navbar scroll effect
        // ============================================
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
            });
        }

        // ============================================
        // Parallax effect for hero sections
        // ============================================
        const parallaxElements = document.querySelectorAll('.parallax');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const rate = scrolled * 0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });

        // ============================================
        // Magnetic effect for buttons and links
        // ============================================
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });

        // ============================================
        // Smooth scroll for anchor links
        // ============================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ============================================
        // Page transition effect
        // ============================================
        document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"]):not([target="_blank"])').forEach(link => {
            link.addEventListener('click', function(e) {
                // Only for internal links
                if (this.hostname === window.location.hostname || !this.hostname) {
                    const href = this.getAttribute('href');
                    if (href && !href.startsWith('#')) {
                        // Add fade out effect
                        document.body.style.opacity = '0';
                        document.body.style.transition = 'opacity 0.3s ease';
                        
                        setTimeout(() => {
                            window.location.href = href;
                        }, 300);
                    }
                }
            });
        });

        // ============================================
        // Card tilt effect (3D)
        // ============================================
        const cards = document.querySelectorAll('.project-card, .course-preview-card, .dashboard-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // ============================================
        // Loading animation
        // ============================================
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }
        });

        // ============================================
        // Form input animations
        // ============================================
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });

    // ============================================
    // Utility functions
    // ============================================
    window.animateOnScroll = function(element) {
        if (element) {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        }
    };

    window.fadeIn = function(element, delay = 0) {
        if (element) {
            setTimeout(() => {
                element.classList.add('fade-in-up');
            }, delay);
        }
    };

})();

