document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Hamburger Animation
            hamburger.classList.toggle('is-active');
            // Basic animation logic for hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once element has animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // 4. Modal Logic
    const modal = document.getElementById('booking-modal');
    const openBtn = document.getElementById('open-booking');
    const closeBtn = document.getElementById('close-modal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // 5. Appointment Form Handler
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // Create WhatsApp message payload
            const phoneNumber = "18297944272";
            const currentHost = window.location.hostname;
            
            let message = `Hola Clínica Dr. Familia, quiero agendar una cita.%0A%0A`;
            message += `👤 *Nombre:* ${encodeURIComponent(name)}%0A`;
            message += `📞 *Teléfono:* ${encodeURIComponent(phone)}%0A`;
            message += `🦷 *Servicio:* ${encodeURIComponent(service)}%0A`;
            message += `📅 *Fecha:* ${encodeURIComponent(date)}%0A`;
            message += `⏰ *Hora:* ${encodeURIComponent(time)}%0A%0A`;
            message += `Por favor, confírmenme la disponibilidad.`;
            
            const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Open window
            window.open(waUrl, '_blank');
            
            // Optional: reset form and close modal
            appointmentForm.reset();
            if (modal) {
                modal.classList.remove('active');
            }
        });
    }

});
