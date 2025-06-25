// Professional Portfolio JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeScrollEffects();
    initializePerformanceOptimizations();
    initializeModalFunctionality();
    initializeSkillsAnimation();
});

// Navigation Functionality
function initializeNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            toggleMobileMenu();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = document.querySelector('button[onclick="toggleMobileMenu()"] i');
    
    if (mobileMenu) {
        const isHidden = mobileMenu.classList.contains('-translate-y-full');
        
        if (isHidden) {
            // Show menu
            mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
            mobileMenu.classList.add('translate-y-0', 'opacity-100');
        } else {
            // Hide menu
            mobileMenu.classList.remove('translate-y-0', 'opacity-100');
            mobileMenu.classList.add('-translate-y-full', 'opacity-0');
        }
        
        // Toggle icon
        if (menuButton) {
            if (isHidden) {
                menuButton.setAttribute('data-lucide', 'x');
            } else {
                menuButton.setAttribute('data-lucide', 'menu');
            }
            
            // Reinitialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }
}

// Animation Functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize elements for animation
    const animatedElements = document.querySelectorAll('#skills .grid > div, #projects .grid > div, section > div > div');
    
    animatedElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${(index % 6) * 0.1}s`; // Stagger animation
        
        observer.observe(el);
    });
    
    // Special handling for skills cards
    const skillCards = document.querySelectorAll('#skills .grid > div');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Skills Animation Functionality
function initializeSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // Different settings for mobile vs desktop
    const isMobile = window.innerWidth <= 768;
    const observerOptions = {
        threshold: isMobile ? 0.1 : 0.3, // Lower threshold for mobile
        rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px' // Less aggressive margin for mobile
    };
    
    let animatedItems = new Set(); // Track already animated items
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !animatedItems.has(entry.target)) {
                animatedItems.add(entry.target);
                
                // Animate skill item appearance
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                
                // Animate skill bar width
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar) {
                    const targetWidth = skillBar.getAttribute('data-width');
                    setTimeout(() => {
                        skillBar.style.width = targetWidth + '%';
                        skillBar.classList.add('animate');
                    }, index * 100 + 200);
                }
            }
        });
    }, observerOptions);
    
    // For mobile, also add a scroll-based fallback
    if (isMobile) {
        let scrollTimeout;
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                skillItems.forEach((item, index) => {
                    if (!animatedItems.has(item)) {
                        const rect = item.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        
                        if (isVisible) {
                            animatedItems.add(item);
                            item.classList.add('animate');
                            
                            const skillBar = item.querySelector('.skill-bar');
                            if (skillBar) {
                                const targetWidth = skillBar.getAttribute('data-width');
                                skillBar.style.width = targetWidth + '%';
                                skillBar.classList.add('animate');
                            }
                        }
                    }
                });
            }, 100);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    skillItems.forEach(item => {
        skillsObserver.observe(item);
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('opacity-75');
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission(formData);
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                this.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-75');
            }
        });
    }
}

// Simulate form submission
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success/failure
            if (Math.random() > 0.1) { // 90% success rate
                resolve();
            } else {
                reject(new Error('Simulation error'));
            }
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set color based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Initialize icons for notification
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Disabled parallax effect to prevent positioning issues
    // const hero = document.querySelector('section');
    
    // Progress indicator
    createScrollProgressIndicator();
    
    // Active section highlighting in navigation
    initializeActiveNavigation();
}

// Scroll progress indicator
function createScrollProgressIndicator() {
    const progressBar = document.getElementById('scroll-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
        }, { passive: true });
    }
}

// Active navigation highlighting
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('text-indigo-400');
                    link.classList.add('text-slate-300');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-slate-300');
                    activeLink.classList.add('text-indigo-400');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    preloadCriticalResources();
}

// Preload critical resources
function preloadCriticalResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Theme Management (if needed for future light/dark mode toggle)
function initializeThemeManager() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Analytics and Tracking (placeholder)
function initializeAnalytics() {
    // Add Google Analytics or other tracking here
    console.log('Analytics initialized');
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    // Could send error reports to monitoring service
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Add keyboard navigation support
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance Monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Projects Modal Functionality
let scrollPosition = 0;

function openProjectsModal() {
    const modal = document.getElementById('projectsModal');
    if (modal) {
        // Store current scroll position
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Prevent body scroll without changing position
        document.body.classList.add('modal-no-scroll');
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Show modal with animation
        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('modal-visible');
        
        // Focus trap - focus on the close button
        const closeButton = modal.querySelector('button[onclick="closeProjectsModal()"]');
        if (closeButton) {
            setTimeout(() => closeButton.focus(), 100);
        }
        
        // Reinitialize Lucide icons for modal content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

function closeProjectsModal() {
    const modal = document.getElementById('projectsModal');
    if (modal) {
        // Hide modal with animation
        modal.classList.remove('modal-visible');
        modal.classList.add('opacity-0', 'invisible');
        
        // Restore body scroll and position after animation completes
        setTimeout(() => {
            // Temporarily disable smooth scrolling
            const htmlElement = document.documentElement;
            const originalScrollBehavior = htmlElement.style.scrollBehavior;
            htmlElement.style.scrollBehavior = 'auto';
            
            document.body.classList.remove('modal-no-scroll');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            // Restore scroll position immediately
            window.scrollTo({
                top: scrollPosition,
                left: 0,
                behavior: 'auto'
            });
            
            // Alternative fallback for older browsers
            if (window.scrollY !== scrollPosition) {
                document.documentElement.scrollTop = scrollPosition;
                document.body.scrollTop = scrollPosition;
            }
            
            // Restore original scroll behavior after a short delay
            setTimeout(() => {
                htmlElement.style.scrollBehavior = originalScrollBehavior;
            }, 50);
            
        }, 300);
    }
}

// Make modal functions globally available
window.openProjectsModal = openProjectsModal;
window.closeProjectsModal = closeProjectsModal;

// Initialize modal functionality
function initializeModalFunctionality() {
    const modal = document.getElementById('projectsModal');
    
    if (modal) {
        // Close modal when clicking on backdrop
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectsModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('modal-visible')) {
                closeProjectsModal();
            }
        });
        
        // Prevent modal content clicks from closing modal
        const modalContainer = modal.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
}

// Initialize performance monitoring
monitorPerformance();