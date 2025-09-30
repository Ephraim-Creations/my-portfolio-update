        // Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        });

        // WhatsApp Modal
        const whatsappButton = document.getElementById('whatsappButton');
        const leadModal = document.getElementById('leadModal');
        const closeModal = document.getElementById('closeModal');

        whatsappButton.addEventListener('click', () => {
            leadModal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            leadModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === leadModal) {
                leadModal.style.display = 'none';
            }
        });

        // Form Submission
        const leadForm = document.getElementById('leadForm');

        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Format the message for WhatsApp
            const serviceText = document.querySelector(`#service option[value="${service}"]`).textContent;
            const whatsappMessage = `New Project Inquiry%0A%0AName: ${name}%0AService: ${serviceText}%0AProject Details: ${message || 'No additional details provided'}`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/254112268873?text=${whatsappMessage}`, '_blank');
            
            // Close modal and reset form
            leadModal.style.display = 'none';
            leadForm.reset();
        });

        // Background Animation
        const bgAnimation = document.getElementById('bgAnimation');
        const codeLines = [
            "const innovation = new DigitalTransformation();",
            "function createExcellence() {",
            "  return strategicImplementation();",
            "}",
            "class EphraimWorks {",
            "  constructor() {",
            "    this.expertise = 'full-stack development';",
            "    this.passion = 'digital innovation';",
            "  }",
            "  deliverResults() {",
            "    return exceptionalOutcomes;",
            "  }",
            "}",
            "// Engineering digital excellence",
            "const solution = new ComprehensiveSolution();",
            "solution.architect();",
            "solution.implement();",
            "solution.optimize();"
        ];

        codeLines.forEach((line, index) => {
            const codeLine = document.createElement('div');
            codeLine.className = 'code-line';
            codeLine.textContent = line;
            codeLine.style.top = `${Math.random() * 100}%`;
            codeLine.style.animationDelay = `${index * 3}s`;
            codeLine.style.opacity = `${0.1 + Math.random() * 0.3}`;
            bgAnimation.appendChild(codeLine);
        });

        // Add scroll animations for elements
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-card, .portfolio-item, .blog-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });