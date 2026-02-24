// Initialize EmailJS
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
// Get your key from: https://dashboard.emailjs.com/admin/account
if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY');
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        // Toggle mobile menu — use both click and touchend for reliable mobile support
        function toggleMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchend', toggleMenu);

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when tapping outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize hero slider (only on pages that have slider elements)
    if (document.querySelector('.hero-slide')) {
        initHeroSlider();
    }
    
    // Tour Search Bar Functionality
    const customizeBtn = document.querySelector('.customize-btn');
    if (customizeBtn) {
        customizeBtn.addEventListener('click', handleCustomizeTours);
    }
});

// Handle Tour Search Button
function searchTours() {
    // Get selected values from the search bar
    const searchSelects = document.querySelectorAll('.tour-search-bar .search-select');
    const destination = searchSelects[0] ? searchSelects[0].value : '';
    const experience = searchSelects[1] ? searchSelects[1].value : '';
    const guests = searchSelects[2] ? searchSelects[2].value : '';
    const tourClass = searchSelects[3] ? searchSelects[3].value : '';
    
    // Build query string
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (experience) params.append('experience', experience);
    if (guests) params.append('guests', guests);
    if (tourClass) params.append('class', tourClass);
    
    // Redirect to packages page with filters
    const queryString = params.toString();
    if (queryString) {
        window.location.href = `packages.html?${queryString}`;
    } else {
        window.location.href = 'packages.html';
    }
}

// Handle Customize Tours Button
function handleCustomizeTours() {
    // Get selected values from the search bar
    const searchSelects = document.querySelectorAll('.tour-search-bar .search-select');
    const destination = searchSelects[0] ? searchSelects[0].value : '';
    const experience = searchSelects[1] ? searchSelects[1].value : '';
    const guests = searchSelects[2] ? searchSelects[2].value : '';
    const tourClass = searchSelects[3] ? searchSelects[3].value : '';
    
    // Open the customize modal
    const modal = document.getElementById('customizeTourModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Pre-fill form if values were selected
        if (destination) document.getElementById('custDestination').value = destination;
        if (experience) document.getElementById('custExperience').value = experience;
        if (guests) document.getElementById('custGuests').value = guests;
        if (tourClass) document.getElementById('custClass').value = tourClass;
    }
}

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('customizeTourModal');
    const closeBtn = modal?.querySelector('.close-modal');
    const customizeForm = document.getElementById('customizeTourForm');
    
    // Guest counter functionality
    const counterBtns = document.querySelectorAll('.counter-btn');
    counterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.guest-input');
            const currentValue = parseInt(input.value) || 0;
            const min = parseInt(input.min) || 0;
            const max = parseInt(input.max) || 99;
            
            if (this.classList.contains('plus')) {
                if (currentValue < max) {
                    input.value = currentValue + 1;
                }
            } else if (this.classList.contains('minus')) {
                if (currentValue > min) {
                    input.value = currentValue - 1;
                }
            }
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close on outside click
    document.addEventListener('click', function(event) {
        if (modal && event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle form submission
    if (customizeForm) {
        customizeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(customizeForm);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = customizeForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                to_email: 'info@afrisitestoursandtravel.org',
                from_name: data.name,
                from_email: data.email,
                phone: data.phone,
                country: data.country || 'Not specified',
                destination: getDestinationName(data.destination),
                experience: getExperienceName(data.experience),
                guests: data.guests,
                tour_class: data.tourClass,
                dates: data.dates,
                duration: data.duration,
                budget: data.budget || 'Not specified',
                special_requests: data.specialRequests || 'None',
                adults: data.adults || '0',
                children: data.children || '0',
                infants: data.infants || '0',
                submission_date: new Date().toLocaleString()
            };
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showNotification('Thank you! Your tour customization request has been sent successfully. We\'ll contact you soon!', 'success', 5000);
                        
                        // Close modal and reset form
                        setTimeout(() => {
                            modal.style.display = 'none';
                            document.body.style.overflow = 'auto';
                            customizeForm.reset();
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 2000);
                    }, function(error) {
                        console.log('FAILED...', error);
                        showNotification('Sorry, there was an error sending your request. Please try again or contact us directly.', 'error', 5000);
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback to mailto if EmailJS is not configured
                const emailBody = `
New Tour Customization Request

CONTACT INFORMATION:
--------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country || 'Not specified'}

TOUR PREFERENCES:
-----------------
Destination: ${getDestinationName(data.destination)}
Experience Type: ${getExperienceName(data.experience)}
Number of Guests: ${data.guests}
Tour Class: ${data.tourClass}
Travel Dates: ${data.dates}
Duration: ${data.duration} Days
Budget: ${data.budget || 'Not specified'}

SPECIAL REQUESTS:
-----------------
${data.specialRequests || 'None'}

--------------------
Submitted: ${new Date().toLocaleString()}
                `.trim();
                
                const subject = encodeURIComponent(`Tour Customization Request - ${data.name}`);
                const body = encodeURIComponent(emailBody);
                const mailtoLink = `mailto:info@afrisitestoursandtravel.org?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;
                
                showNotification('Opening your email client... Please send the prepared email.', 'info', 5000);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    customizeForm.reset();
                }, 2000);
            }
        });
    }
});

// Helper functions for readable names
function getDestinationName(value) {
    const destinations = {
        'bwindi': 'Bwindi Impenetrable Forest',
        'murchison': 'Murchison Falls National Park',
        'queen-elizabeth': 'Queen Elizabeth National Park',
        'kidepo': 'Kidepo Valley National Park',
        'lake-mburo': 'Lake Mburo National Park',
        'serengeti': 'Serengeti National Park',
        'masai-mara': 'Masai Mara Reserve',
        'custom': 'Custom/Multiple Destinations'
    };
    return destinations[value] || value;
}

function getExperienceName(value) {
    const experiences = {
        'gorilla-trekking': 'Gorilla Trekking',
        'wildlife-safari': 'Wildlife Safari',
        'bird-watching': 'Bird Watching',
        'cultural-tours': 'Cultural Tours',
        'adventure-sports': 'Adventure Sports',
        'beach-relaxation': 'Beach & Relaxation',
        'photography': 'Photography Safari'
    };
    return experiences[value] || value;
}

// Hero Image Slider
let currentSlideIndex = 0;
let slideInterval;

function initHeroSlider() {
    showSlide(currentSlideIndex);
    // Auto-advance slides every 5 seconds
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(n) {
    clearInterval(slideInterval);
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
    // Restart auto-advance
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function currentSlide(n) {
    clearInterval(slideInterval);
    currentSlideIndex = n - 1;
    showSlide(currentSlideIndex);
    // Restart auto-advance
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handler (only bind if form exists on this page)
const _contactForm = document.getElementById('contactForm');
if (_contactForm) _contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !service || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare template parameters for EmailJS
    const templateParams = {
        to_email: 'info@afrisitestoursandtravel.org',
        from_name: name,
        from_email: email,
        phone: phone || 'Not provided',
        service: service,
        message: message,
        submission_date: new Date().toLocaleString()
    };
    
    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_CONTACT_TEMPLATE_ID' with your actual IDs
    if (typeof emailjs !== 'undefined') {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Reset form and button
                document.getElementById('contactForm').reset();
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            }, function(error) {
                console.log('FAILED...', error);
                
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            });
    } else {
        // Fallback to mailto if EmailJS is not configured
        const emailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interested In: ${service}

Message:
${message}

--------------------
Submitted: ${new Date().toLocaleString()}
        `.trim();
        
        const subject = encodeURIComponent(`Contact Form - ${name}`);
        const body = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:info@afrisitestoursandtravel.org?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        // Reset form
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            submitBtn.classList.remove('loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            showNotification('Opening your email client... Please send the prepared email.', 'info');
        }, 1000);
    }
}); // end if (_contactForm)

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add animation styles to head
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            .notification-close:hover {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Chat Widget Handler - WhatsApp link (no handler needed, using direct link)
// The chat button now links directly to WhatsApp via href attribute

// Scroll animations
function animateOnScroll() {
    // On the packages page, skip .package-card — packages.js handles its own filter/reveal logic
    const isPackagesPage = !!document.querySelector('.packages-hero');
    const selector = isPackagesPage
        ? '.service-card, .testimonial-card'
        : '.service-card, .package-card, .testimonial-card';

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Package detail modal handled by packages.js on the packages page

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loading');
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || counter.textContent);
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                // Add + suffix for the first three stats (Tours, Tourists, Destinations)
                if (target >= 80) {
                    counter.textContent = target + '+';
                }
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Add smooth reveal animation for sections
function addRevealAnimation() {
    const sections = document.querySelectorAll('section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px 300px 0px'
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Add CSS for section reveal animation
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);

// Initialize section reveal animation only on pages without their own card animations
// (packages.js, gallery.js handle their own reveal logic)
if (!document.querySelector('.packages-hero, .gallery-hero, .gallery-section')) {
    document.addEventListener('DOMContentLoaded', addRevealAnimation);
}

// Show notification function
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.custom-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'custom-notification';
        document.body.appendChild(notification);
        
        // Add styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            .custom-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: #27ae60;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 10000;
                opacity: 0;
                transform: translateX(400px);
                transition: all 0.3s ease;
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
            }
            
            .custom-notification.show {
                opacity: 1;
                transform: translateX(0);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
