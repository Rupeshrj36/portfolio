// Dark mode toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// function alertmsg(){
//     alert("Hey Buddy -- Website Loaded Successfully..!!");
// }
// alertmsg();

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme);

// Enhanced Navbar Functionality
let lastScroll = 0;
const header = document.querySelector('header');
const navToggle = document.getElementById('navToggle');
const navs = document.querySelector('.navs');
let isMenuOpen = false;
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Handle scroll events
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScroll = currentScroll;

    // Update scroll progress
    const scrollPercent = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;

    // Update active nav link
    updateActiveNavLink();
});

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scroll = window.pageYOffset;

        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navs.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate menu items
    const menuItems = document.querySelectorAll('.navs ul li');
    menuItems.forEach((item, index) => {
        if (isMenuOpen) {
            item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        } else {
            item.style.animation = '';
        }
    });

    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navs.contains(e.target) && !navToggle.contains(e.target)) {
        isMenuOpen = false;
        navs.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Enhanced smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            if (isMenuOpen) {
                isMenuOpen = false;
                navs.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Enhanced Scroll Animation Configuration
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Create a single Intersection Observer instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove all animation classes first
            entry.target.classList.remove('hide', 'visible', 'slide-up', 'slide-left', 'slide-right', 'scale-in');
            
            // Force a reflow to ensure animations restart
            void entry.target.offsetWidth;
            
            // Add base classes
            entry.target.classList.add('visible');
            
            // Add specific animations based on element type
            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('scale-in');
            } else if (entry.target.classList.contains('left-content')) {
                entry.target.classList.add('slide-left');
            } else if (entry.target.classList.contains('right-content')) {
                entry.target.classList.add('slide-right');
            } else if (entry.target.classList.contains('qualification-card')) {
                entry.target.classList.add('slide-up');
            } else if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('slide-up');
            }
            
            // Add active class to navigation links
            const id = entry.target.getAttribute('id');
            if (id) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === id) {
                        link.classList.add('active');
                    }
                });
            }
        } else {
            // When element is out of view, add hide class
            entry.target.classList.add('hide');
            entry.target.classList.remove('visible', 'slide-up', 'slide-left', 'slide-right', 'scale-in');
        }
    });
}, observerOptions);

// Add CSS animation keyframes with animation-fill-mode: forwards
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideLeft {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideRight {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .slide-up {
        animation: slideUp 0.8s ease forwards;
    }

    .slide-left {
        animation: slideLeft 0.8s ease forwards;
    }

    .slide-right {
        animation: slideRight 0.8s ease forwards;
    }

    .scale-in {
        animation: scaleIn 0.8s ease forwards;
    }

    .hide {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }

    .visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Add animation classes for each element type */
    .section-title {
        animation: scaleIn 0.8s ease forwards;
    }

    .left-content {
        animation: slideLeft 0.8s ease forwards;
    }

    .right-content {
        animation: slideRight 0.8s ease forwards;
    }

    .qualification-card {
        animation: slideUp 0.8s ease forwards;
    }

    .project-card {
        animation: slideUp 0.8s ease forwards;
    }
`;
document.head.appendChild(style);

// Observe all sections with enhanced animations
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hide');
    observer.observe(section);
});

// Observe section titles with scale effect
document.querySelectorAll('.section-title').forEach(title => {
    title.classList.add('hide');
    observer.observe(title);
});

// Observe qualification cards with slide up effect
document.querySelectorAll('.qualification-card').forEach((card, index) => {
    card.classList.add('hide');
    card.style.setProperty('--animation-order', index);
    observer.observe(card);
});

// Observe project cards with slide up effect
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('hide');
    card.style.setProperty('--animation-order', index);
    observer.observe(card);
});

// Observe main info section with slide effects
const infoSection = document.querySelector('.info');
if (infoSection) {
    infoSection.classList.add('hide');
    observer.observe(infoSection);
}

// Observe left and right content with slide effects
const leftContent = document.querySelector('.left-content');
const rightContent = document.querySelector('.right-content');
if (leftContent) {
    leftContent.classList.add('hide');
    observer.observe(leftContent);
}
if (rightContent) {
    rightContent.classList.add('hide');
    observer.observe(rightContent);
}

// Add stagger animation to qualification cards
document.querySelectorAll('.qualification-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Add stagger animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Typed.js initialization
const typed = new Typed('#element', {
    strings: ['Web Developer', 'Problem Solver', 'Creative Thinker'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    loop: true
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    const image = document.querySelector('.image');
    const socialIcons = document.querySelectorAll('.social-icon');

    sections.forEach(section => {
        const speed = 0.5;
        section.style.setProperty('--scroll-offset', `${scrolled * speed}px`);
    });

    if (image) {
        const speed = 0.3;
        image.style.setProperty('--scroll-offset', `${scrolled * speed}px`);
    }

    socialIcons.forEach(icon => {
        const speed = 0.2;
        icon.style.setProperty('--scroll-offset', `${scrolled * speed}px`);
    });
}); 