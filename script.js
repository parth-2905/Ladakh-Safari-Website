// Navigation scroll effects and fixed burger menu
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.logo');
const fixedBurgerMenu = document.querySelector('.fixed-burger-menu');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = pageHeight > 0 ? window.scrollY / pageHeight : 0;
    
    // Show/hide navbar based on scroll
    if (scrollPercent > 0.05) {
        navbar.classList.add('navbar-hidden');
        // Show fixed burger menu when navbar is hidden
        fixedBurgerMenu.classList.add('visible');
    } else {
        navbar.classList.remove('navbar-hidden');
        // Hide fixed burger menu when navbar is visible
        fixedBurgerMenu.classList.remove('visible');
    }

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('menu-expanded');
        navbar.classList.add('menu-collapsed');
        document.body.classList.remove('no-scroll');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('menu-collapsed');
    }
});

// Burger menu functionality
const burger = document.querySelector('.burger-menu');
if (burger) {
    burger.addEventListener('click', () => {
        if (navbar.classList.contains('menu-expanded')) {
            navbar.classList.remove('menu-expanded');
            navbar.classList.add('menu-collapsed');
            document.body.classList.remove('no-scroll');
        } else {
            navbar.classList.add('menu-expanded');
            navbar.classList.remove('menu-collapsed');
            document.body.classList.add('no-scroll');
        }
    });
}

// Fixed burger menu and slide-out menu functionality
const slideMenu = document.querySelector('.slide-menu');
const burgerMenuFixed = document.querySelector('.burger-menu-fixed');
const closeMenu = document.querySelector('.close-menu');

// Open slide menu when fixed burger is clicked
if (burgerMenuFixed) {
    burgerMenuFixed.addEventListener('click', () => {
        slideMenu.classList.add('open');
        document.body.classList.add('menu-open');
    });
}

// Close slide menu when close button is clicked
if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        slideMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    });
}

// Close slide menu when clicking outside
document.addEventListener('click', (e) => {
    if (slideMenu && slideMenu.classList.contains('open') && 
        !slideMenu.contains(e.target) && 
        burgerMenuFixed && !burgerMenuFixed.contains(e.target)) {
        slideMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    }
});

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.navbar-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('menu-expanded')) {
            navbar.classList.remove('menu-expanded');
            navbar.classList.add('menu-collapsed');
            document.body.classList.remove('no-scroll');
        }
    });
});


// Scroll reveal animation
const scrollRevealElements = document.querySelectorAll('.pop-in, .reveal-on-scroll, .fade-in-left, .fade-in-right, .draw-in');

function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('revealed');
        } else {
            // Uncomment below if you want elements to hide again when scrolled away
            // element.classList.remove('revealed');
        }
    });
}

// Initial check on page load
window.addEventListener('load', () => {
    checkScrollReveal();
});

// Check on scroll
window.addEventListener('scroll', () => {
    checkScrollReveal();
});



// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "-100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add animation classes for slide-in effects
                if (entry.target.classList.contains('card-content')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
                if (entry.target.classList.contains('card-image')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
                
                // Stop observing once animation is complete
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.card-content, .card-image').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = el.classList.contains('card-content') ? 'translateX(-100px)' : 'translateX(100px)';
        observer.observe(el);
    });

    // Observe journey title and meta header
    const journeyTitle = document.querySelector('.journey-title');
    if (journeyTitle) {
        journeyTitle.style.opacity = '0';
        journeyTitle.style.transform = 'translateY(20px)';
        observer.observe(journeyTitle);
    }

    const metaHeader = document.querySelector('.journey-meta-header');
    if (metaHeader) {
        metaHeader.style.opacity = '0';
        metaHeader.style.transform = 'translateY(20px)';
        observer.observe(metaHeader);
    }
};

// Smooth scroll for navigation
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Dynamic day counter
const dayCounters = document.querySelectorAll('.day-indicator');
let currentDay = 1;

dayCounters.forEach(counter => {
    counter.addEventListener('mouseenter', () => {
        const daySpan = counter.querySelector('span');
        const originalDay = daySpan.textContent;
        
        const interval = setInterval(() => {
            daySpan.textContent = currentDay;
            currentDay++;
            if (currentDay > 10) {
                clearInterval(interval);
                daySpan.textContent = originalDay;
                currentDay = 1;
            }
        }, 100);
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate journey title on load
    const journeyTitle = document.querySelector('.journey-title');
    if (journeyTitle) {
        setTimeout(() => {
            journeyTitle.classList.add('visible');
        }, 500);
    }
});
