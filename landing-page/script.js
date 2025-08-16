// ===== GLOBAL VARIABLES =====
let countdownInterval;
let finalCountdownInterval;
let activityInterval;
let peopleCountInterval;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdowns();
    initializeActivityFeed();
    initializePeopleCounter();
    initializeScrollAnimations();
    initializePricingToggle();
    initializeDemoSteps();
    
    // Start intervals
    startActivityFeed();
    startPeopleCounter();
});

// ===== FOMO BANNER =====
function closeFomoBanner() {
    const banner = document.getElementById('fomo-banner');
    banner.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 300);
}

// ===== COUNTDOWN TIMERS =====
function initializeCountdowns() {
    // Initialize countdown timers
    const now = new Date().getTime();
    const tomorrow = new Date(now + 24 * 60 * 60 * 1000);
    tomorrow.setHours(0, 0, 0, 0);
    
    // Set countdown to end of day
    let endTime = new Date();
    endTime.setHours(23, 59, 59, 999);
    
    startCountdown('countdown', endTime);
    startCountdown('final-countdown', endTime);
}

function startCountdown(elementId, endTime) {
    const countdownElement = document.getElementById(elementId);
    if (!countdownElement) return;
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime.getTime() - now;
        
        if (timeLeft <= 0) {
            countdownElement.textContent = '00:00:00';
            clearInterval(interval);
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
    
    if (elementId === 'countdown') {
        countdownInterval = interval;
    } else {
        finalCountdownInterval = interval;
    }
}

// ===== PEOPLE COUNTER =====
function initializePeopleCounter() {
    const counter = document.getElementById('people-count');
    if (!counter) return;
    
    let currentCount = parseInt(counter.textContent);
    counter.dataset.baseCount = currentCount;
}

function startPeopleCounter() {
    peopleCountInterval = setInterval(() => {
        const counter = document.getElementById('people-count');
        if (!counter) return;
        
        const baseCount = parseInt(counter.dataset.baseCount);
        const variation = Math.floor(Math.random() * 20) - 10; // ±10
        const newCount = baseCount + variation;
        
        animateCounter(counter, parseInt(counter.textContent), newCount);
    }, 30000); // Update every 30 seconds
}

function animateCounter(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// ===== ACTIVITY FEED =====
const activities = [
    { user: 'Sarah M.', action: 'just generated 23 blog posts', time: () => Math.floor(Math.random() * 5) + 2 },
    { user: 'Mike J.', action: 'reached #1 ranking for "best laptops"', time: () => Math.floor(Math.random() * 10) + 5 },
    { user: 'Lisa K.', action: 'upgraded to Professional plan', time: () => Math.floor(Math.random() * 15) + 8 },
    { user: 'David R.', action: 'published 47 SEO articles', time: () => Math.floor(Math.random() * 8) + 3 },
    { user: 'Emma S.', action: 'hit page 1 with "yoga equipment guide"', time: () => Math.floor(Math.random() * 12) + 6 },
    { user: 'Chris L.', action: 'generated $2.3K in affiliate revenue', time: () => Math.floor(Math.random() * 20) + 10 },
    { user: 'Ana G.', action: 'created content in 3 languages', time: () => Math.floor(Math.random() * 6) + 4 },
    { user: 'Tom W.', action: 'started free trial', time: () => Math.floor(Math.random() * 3) + 1 },
    { user: 'Nina P.', action: 'exported 156 WordPress posts', time: () => Math.floor(Math.random() * 7) + 5 },
    { user: 'Jake B.', action: 'ranked #1 for "fitness equipment"', time: () => Math.floor(Math.random() * 18) + 12 }
];

function initializeActivityFeed() {
    const activityItems = document.querySelector('.activity-items');
    if (!activityItems) return;
    
    // Initialize with 3 random activities
    for (let i = 0; i < 3; i++) {
        addRandomActivity();
    }
}

function startActivityFeed() {
    activityInterval = setInterval(() => {
        addRandomActivity();
    }, 8000); // Add new activity every 8 seconds
}

function addRandomActivity() {
    const activityItems = document.querySelector('.activity-items');
    if (!activityItems) return;
    
    const activity = activities[Math.floor(Math.random() * activities.length)];
    const activityElement = document.createElement('div');
    activityElement.className = 'activity-item';
    
    activityElement.innerHTML = `
        <span class="activity-user">${activity.user}</span>
        <span class="activity-text">${activity.action}</span>
        <span class="activity-time">${activity.time()} minutes ago</span>
    `;
    
    // Add to top
    activityItems.insertBefore(activityElement, activityItems.firstChild);
    
    // Remove if more than 3 items
    if (activityItems.children.length > 3) {
        activityItems.removeChild(activityItems.lastChild);
    }
    
    // Animate in
    activityElement.style.opacity = '0';
    activityElement.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        activityElement.style.opacity = '1';
        activityElement.style.transform = 'translateX(0)';
        activityElement.style.transition = 'all 0.5s ease';
    }, 100);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Prevent body scroll
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-menu-content a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// ===== DEMO MODAL =====
function openDemo() {
    const modal = document.getElementById('demo-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset demo steps
    resetDemoSteps();
    
    // Start demo sequence
    setTimeout(() => startDemoSequence(), 1000);
}

function closeDemo() {
    const modal = document.getElementById('demo-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop demo sequence
    clearTimeout(demoSequenceTimeout);
}

let demoSequenceTimeout;

function initializeDemoSteps() {
    // Set first step as active
    const firstStep = document.querySelector('.demo-step');
    if (firstStep) {
        firstStep.classList.add('active');
    }
}

function resetDemoSteps() {
    document.querySelectorAll('.demo-step').forEach((step, index) => {
        step.classList.toggle('active', index === 0);
    });
}

function startDemoSequence() {
    const steps = document.querySelectorAll('.demo-step');
    let currentStep = 0;
    
    function nextStep() {
        if (currentStep < steps.length - 1) {
            steps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');
            
            if (currentStep < steps.length - 1) {
                demoSequenceTimeout = setTimeout(nextStep, 3000);
            }
        }
    }
    
    demoSequenceTimeout = setTimeout(nextStep, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('demo-modal');
    if (e.target === modal) {
        closeDemo();
    }
});

// ===== PRICING TOGGLE =====
function initializePricingToggle() {
    const toggle = document.querySelector('.toggle-switch');
    const yearlyLabels = document.querySelectorAll('.toggle-label');
    
    if (!toggle) return;
    
    // Set initial state (monthly)
    toggle.dataset.yearly = 'false';
}

function togglePricing() {
    const toggle = document.querySelector('.toggle-switch');
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    const isYearly = toggle.dataset.yearly === 'true';
    const newState = !isYearly;
    
    toggle.dataset.yearly = newState.toString();
    toggle.classList.toggle('active', newState);
    
    // Animate price changes
    priceAmounts.forEach(amount => {
        const monthly = parseInt(amount.dataset.monthly);
        const yearly = parseInt(amount.dataset.yearly);
        const currentPrice = parseInt(amount.textContent);
        const targetPrice = newState ? yearly : monthly;
        
        animateCounter(amount, currentPrice, targetPrice);
    });
}

// ===== FAQ TOGGLE =====
function toggleFaq(questionElement) {
    const faqItem = questionElement.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .pricing-card, .result-card, .pain-point'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLazyLoading);
} else {
    initializeLazyLoading();
}

// ===== CONVERSION TRACKING =====
function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking here
    console.log('Event:', eventName, properties);
    
    // Example for Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example for Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            page_section: e.target.closest('section')?.className || 'unknown'
        });
    }
    
    if (e.target.matches('.plan-button')) {
        trackEvent('pricing_click', {
            plan: e.target.closest('.pricing-card').querySelector('.plan-name').textContent,
            price: e.target.closest('.pricing-card').querySelector('.price-amount').textContent
        });
    }
});

// Track scroll depth
let maxScrollDepth = 0;
const scrollMilestones = [25, 50, 75, 90, 100];
let trackedMilestones = [];

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        scrollMilestones.forEach(milestone => {
            if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                trackedMilestones.push(milestone);
                trackEvent('scroll_depth', { depth: milestone });
            }
        });
    }
});

// ===== FLOATING ANIMATIONS =====
function initializeFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-badge');
    
    floatingElements.forEach((element, index) => {
        const duration = 3000 + (index * 500); // Stagger animations
        const delay = index * 1000;
        
        element.style.animationDuration = `${duration}ms`;
        element.style.animationDelay = `${delay}ms`;
    });
}

// Initialize floating animations
initializeFloatingAnimations();

// ===== TESTIMONIAL SLIDER (if needed) =====
function initializeTestimonialSlider() {
    // Add testimonial slider functionality if more testimonials are added
    const testimonialContainer = document.querySelector('.testimonials-grid');
    if (!testimonialContainer) return;
    
    // Auto-rotate testimonials every 8 seconds
    let currentTestimonial = 0;
    const testimonials = testimonialContainer.querySelectorAll('.testimonial-card');
    
    if (testimonials.length <= 3) return; // Don't rotate if 3 or fewer testimonials
    
    setInterval(() => {
        testimonials[currentTestimonial].style.opacity = '0.7';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.opacity = '1';
    }, 8000);
}

// ===== URGENCY INDICATORS =====
function updateUrgencyIndicators() {
    const urgencyElements = document.querySelectorAll('[data-urgency]');
    
    urgencyElements.forEach(element => {
        const baseValue = parseInt(element.dataset.baseValue || element.textContent);
        const urgencyType = element.dataset.urgency;
        
        let newValue;
        switch (urgencyType) {
            case 'decreasing':
                newValue = baseValue - Math.floor(Math.random() * 5);
                break;
            case 'increasing':
                newValue = baseValue + Math.floor(Math.random() * 3);
                break;
            default:
                newValue = baseValue + Math.floor(Math.random() * 10) - 5;
        }
        
        if (element.textContent !== newValue.toString()) {
            animateCounter(element, parseInt(element.textContent), newValue);
        }
    });
}

// Update urgency indicators every 2 minutes
setInterval(updateUrgencyIndicators, 120000);

// ===== EXIT INTENT POPUP =====
let exitIntentShown = false;

function showExitIntent() {
    if (exitIntentShown) return;
    
    exitIntentShown = true;
    
    // Create exit intent popup
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
        <div class="exit-popup-content">
            <button class="exit-popup-close" onclick="closeExitPopup()">&times;</button>
            <h3>Wait! Don't Leave Empty-Handed</h3>
            <p>Get our <strong>Free SEO Keyword Research Template</strong> before you go!</p>
            <input type="email" placeholder="Enter your email" class="exit-email-input">
            <button class="btn btn-primary" onclick="claimFreeTemplate()">Get Free Template</button>
            <p class="exit-disclaimer">No spam, unsubscribe anytime</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('active');
    }, 100);
}

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        showExitIntent();
    }
});

function closeExitPopup() {
    const popup = document.querySelector('.exit-intent-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

function claimFreeTemplate() {
    const email = document.querySelector('.exit-email-input').value;
    if (email && email.includes('@')) {
        trackEvent('email_signup', { source: 'exit_intent', email: email });
        alert('Thank you! Check your email for the free template.');
        closeExitPopup();
    } else {
        alert('Please enter a valid email address.');
    }
}

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    // Clean up intervals
    if (countdownInterval) clearInterval(countdownInterval);
    if (finalCountdownInterval) clearInterval(finalCountdownInterval);
    if (activityInterval) clearInterval(activityInterval);
    if (peopleCountInterval) clearInterval(peopleCountInterval);
    if (demoSequenceTimeout) clearTimeout(demoSequenceTimeout);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Log error to analytics service
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// ===== ACCESSIBILITY =====
// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeDemo();
        }
        
        const mobileMenu = document.querySelector('.mobile-menu.active');
        if (mobileMenu) {
            toggleMobileMenu();
        }
    }
});

// Focus management
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
    
    firstFocusable?.focus();
}

// Apply focus trapping to modals
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show', () => trapFocus(modal));
    });
});

// ===== ROTATING DEMO FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const demoContainer = document.getElementById('rotating-demo');
    if (!demoContainer) return;
    
    const slides = demoContainer.querySelectorAll('.demo-slide');
    let currentSlide = 0;
    const rotationInterval = 4000; // 4 seconds per slide
    const transitionDuration = 300; // Must match CSS transition duration
    
    if (slides.length <= 1) return;
    
    function showSlide(index) {
        // Ensure the index is within bounds
        index = index % slides.length;
        
        // Remove active class from all slides
        slides.forEach((slide, i) => {
            if (i === index) {
                // Make the target slide visible
                slide.classList.add('active');
                slide.style.zIndex = '2';
            } else {
                // Hide other slides
                slide.classList.remove('active');
                slide.style.zIndex = '1';
            }
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Initialize - ensure first slide is visible
    showSlide(0);
    
    // Start the rotation
    setInterval(nextSlide, rotationInterval);
    
    console.log('Demo rotation initialized with', slides.length, 'slides');
});
