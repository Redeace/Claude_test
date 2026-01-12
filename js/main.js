/**
 * Premium AI Companion Landing Page
 * Main JavaScript functionality
 */

// Timer Module
const Timer = {
    totalSeconds: 1 * 3600 + 40 * 60 + 56, // 1h 40m 56s
    intervalId: null,

    init() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 1000);
    },

    update() {
        const hours = Math.floor(this.totalSeconds / 3600);
        const minutes = Math.floor((this.totalSeconds % 3600) / 60);
        const seconds = this.totalSeconds % 60;

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');

        if (this.totalSeconds > 0) {
            this.totalSeconds--;
        } else {
            // Reset timer when it reaches 0
            this.totalSeconds = 1 * 3600 + 40 * 60 + 56;
        }
    },

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
};

// Token Toggle Module
const TokenToggle = {
    init() {
        const toggle = document.getElementById('tokenToggle');
        const toggleSwitch = document.getElementById('toggleSwitch');

        if (toggle && toggleSwitch) {
            toggle.addEventListener('click', () => {
                toggleSwitch.classList.toggle('active');
                this.onToggle(toggleSwitch.classList.contains('active'));
            });
        }
    },

    onToggle(isActive) {
        console.log('Token toggle:', isActive ? 'enabled' : 'disabled');
        // Add any additional logic here
    }
};

// Plan Selection Module
const PlanSelection = {
    selectedPlan: '12months',

    init() {
        const planCards = document.querySelectorAll('.plan-card');

        planCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectPlan(card, planCards);
            });
        });
    },

    selectPlan(card, allCards) {
        allCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedPlan = card.dataset.plan;
        console.log('Selected plan:', this.selectedPlan);
    },

    getSelectedPlan() {
        return this.selectedPlan;
    }
};

// FAQ Accordion Module
const FAQ = {
    init() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            if (question) {
                question.addEventListener('click', () => {
                    this.toggleItem(item, faqItems);
                });
            }
        });
    },

    toggleItem(item, allItems) {
        const isActive = item.classList.contains('active');

        // Close all other items
        allItems.forEach(i => i.classList.remove('active'));

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    }
};

// Reviews Slider Module
const ReviewsSlider = {
    currentSlide: 0,
    autoSlideInterval: null,

    init() {
        const slider = document.getElementById('reviewsSlider');
        const dots = document.querySelectorAll('.slider-dot');

        if (!slider || dots.length === 0) return;

        // Dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index, slider, dots);
            });
        });

        // Auto-scroll
        this.startAutoSlide(slider, dots);

        // Update dots on manual scroll
        slider.addEventListener('scroll', () => {
            this.onScroll(slider, dots);
        });

        // Pause auto-scroll on hover
        slider.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        slider.addEventListener('mouseleave', () => {
            this.startAutoSlide(slider, dots);
        });
    },

    goToSlide(index, slider, dots) {
        this.currentSlide = index;
        const card = slider.querySelector('.review-card');
        if (card) {
            const cardWidth = card.offsetWidth + 20; // card width + gap
            slider.scrollTo({
                left: this.currentSlide * cardWidth,
                behavior: 'smooth'
            });
        }
        this.updateDots(dots);
    },

    updateDots(dots) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    },

    onScroll(slider, dots) {
        const card = slider.querySelector('.review-card');
        if (card) {
            const cardWidth = card.offsetWidth + 20;
            const newSlide = Math.round(slider.scrollLeft / cardWidth);
            if (newSlide !== this.currentSlide) {
                this.currentSlide = newSlide;
                this.updateDots(dots);
            }
        }
    },

    startAutoSlide(slider, dots) {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % dots.length;
            this.goToSlide(this.currentSlide, slider, dots);
        }, 5000);
    },

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
};

// Continue Button Module
const ContinueButton = {
    init() {
        const continueBtn = document.getElementById('continueBtn');

        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.onClick(continueBtn);
            });
        }
    },

    onClick(btn) {
        const selectedPlan = PlanSelection.getSelectedPlan();

        // Add click animation
        btn.style.transform = 'scale(0.98)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);

        // Show confirmation (in production, redirect to payment)
        this.showPaymentModal(selectedPlan);
    },

    showPaymentModal(plan) {
        const planNames = {
            '1month': '1 Month',
            '3months': '3 Months',
            '12months': '12 Months'
        };

        const planPrices = {
            '1month': '$19.99',
            '3months': '$44.99',
            '12months': '$119.99'
        };

        alert(`You selected the ${planNames[plan]} plan (${planPrices[plan]}). Redirecting to payment...`);
    }
};

// Close Button Module
const CloseButton = {
    init() {
        const closeBtn = document.querySelector('.close-btn');
        const header = document.querySelector('.header');

        if (closeBtn && header) {
            closeBtn.addEventListener('click', () => {
                this.closeHeader(header);
            });
        }
    },

    closeHeader(header) {
        header.style.transform = 'translateY(-100%)';
        header.style.opacity = '0';
        setTimeout(() => {
            header.style.display = 'none';
        }, 300);
    }
};

// Smooth Scroll Module
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// Scroll Animations Module
const ScrollAnimations = {
    observer: null,

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll(
            '.review-card, .user-card, .faq-item, .benefit-item'
        );

        elements.forEach(el => {
            this.observer.observe(el);
        });
    },

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
};

// User Cards Hover Effect
const UserCards = {
    init() {
        const cards = document.querySelectorAll('.user-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.onHover(card);
            });

            card.addEventListener('mouseleave', () => {
                this.onLeave(card);
            });
        });
    },

    onHover(card) {
        // Add any additional hover effects
    },

    onLeave(card) {
        // Remove any additional hover effects
    }
};

// Premium Button Ripple Effect
const RippleEffect = {
    init() {
        const buttons = document.querySelectorAll('.premium-btn, .continue-btn, .safe-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
            });
        });
    },

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
};

// Add ripple animation to page
const addRippleStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    addRippleStyles();
    Timer.init();
    TokenToggle.init();
    PlanSelection.init();
    FAQ.init();
    ReviewsSlider.init();
    ContinueButton.init();
    CloseButton.init();
    SmoothScroll.init();
    ScrollAnimations.init();
    UserCards.init();
    RippleEffect.init();

    console.log('All modules initialized');
});

// Export modules for external use
window.AppModules = {
    Timer,
    TokenToggle,
    PlanSelection,
    FAQ,
    ReviewsSlider,
    ContinueButton,
    CloseButton,
    SmoothScroll,
    ScrollAnimations,
    UserCards,
    RippleEffect
};
