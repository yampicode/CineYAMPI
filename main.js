(function() {
        // --- DETECCIÓN DE SCROLL PARA ANIMACIONES ---
        const elementosAnimables = document.querySelectorAll('section, .card, .coming-soon, .contact-box, .logo, .tagline, footer');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('elemento-visible');
                    // Opcional: dejar de observar una vez que ya se mostró
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }); // Se activa cuando el 15% es visible

        elementosAnimables.forEach(el => observer.observe(el));

        // --- FORMULARIO DE CONTACTO (Simulación) ---
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const nombre = document.getElementById('nombre').value.trim();
                const feedback = document.getElementById('formFeedback');
                if (nombre) {
                    feedback.textContent = '✓ ¡Gracias, ' + nombre + '! Hemos recibido tu mensaje. Te contactaremos pronto.';
                    feedback.style.color = '#2ecc71';
                    form.reset();
                } else {
                    feedback.textContent = 'Por favor, completa los campos obligatorios.';
                    feedback.style.color = '#e74c3c';
                }
                feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }

        // --- BOTÓN "AVÍSAME" ---
        const notifyBtn = document.getElementById('notifyBtn');
if (notifyBtn) {
    notifyBtn.addEventListener('click', function() {
        const email = prompt('📧 Déjanos tu correo para avisarte del lanzamiento:');
        if (email && email.includes('@')) {
            // Enviar a Formspree
            fetch('https://formspree.io/f/xzdyepdg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email, 
                    tipo: 'Suscripción a lanzamiento CineYampi',
                    _subject: 'Nuevo suscriptor para aviso de lanzamiento'
                })
            }).then(() => {
                alert('¡Gracias! Te avisaremos a ' + email + ' cuando CineYampi esté en el aire.');
            }).catch(() => {
                alert('Hubo un error. Por favor escríbenos directamente a contacto.cineyampi@gmail.com');
            });
        } else if (email) {
            alert('Por favor, introduce un correo válido.');
        }
    });
}
        
        console.log('CineYampi — sitio informativo con scroll animations 🇻🇪');
    })();